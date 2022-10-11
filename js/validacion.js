const APIKEY = '9772a809e83c417c835dc74456b510a4'

const SEARCHTYPE = {
	movie: 'search/movie',
	tv: 'search/tv',
}

/**
 * 
 * @param {Number} id 
 * @author Luciano Salerno
 * @version 0.0.1
 */
async function getVideo(id) {
	try {
		const videos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}`)
		const videosParsed = await videos.json()
		const filtrados = videosParsed.results.filter(video => video.type === 'Trailer')

		filtrados.forEach(video => {
			const key = video.key
			const sitio = video.site.toLowerCase()
			const videoUrl = `https://${sitio}.com/embed/${key}`
			const iframe = `<iframe width="560" height="315" src=${videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
			const body = document.getElementsByTagName('body')[0]
			body.innerHTML += iframe
		})
	}
	catch (error) {
		console.error(`Error: ${error}: La pelicula no tiene trailer`)
	}
}

function agregarListener(){
	const cards = document.querySelectorAll('.news_card')
	cards.forEach((card)=> {
		card.addEventListener('click', function(){
			console.log(this)
			/* Agregar aca el modal cuando se clikee el news_card */
		})
	})
}

/**
 * Lista las peliculas/series encontradas en la seccion indicada como 3° parametro
 * @param {Object} movies
 * @param {Boolean} novedad
 * @param {HTMLObjectElement} section
 * @author Luciano Salerno
 * @version 0.2.1
 */
function showList(movies, novedad, section) {
	const container = section.querySelector('.news_container')
	container.innerHTML = ''

	movies.length = 5
	movies.map((movie) => {
		let stars = ''
		for(let i=0; i< Math.floor(movie.vote_average/2); i++) stars +='<i class="fa-solid fa-star"></i>'
		const card = `
		<div class="news_card">
			<div class="news_card_head">
				<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title || movie.name}" class="news_card_head_img">
				<span class="novedad_info"><i class="fa-solid ${movie.title? 'fa-film': 'fa-tv'}"></i></i></span>
				${novedad ? '<span class="novedad">NOVEDAD</span>':''}
			</div>
			<div class="news_card_body">
				<h2 class="news_card_body_nombre">${movie.title || movie.name}</h2>
				<p class="news_card_body_descripcion">
				${Math.floor(movie.vote_average)}
				<span>
					${stars}
				</span>
				</p>
			</div>
		</div>`

		container.innerHTML += card
	})
	agregarListener()
}

/**
 * Busca de manera asincrona la pelicula o serie segun su nombre
 * @param {String} type 
 * @param {String} query
 * @param {HTMLObjectElement} section
 * @author Luciano Salerno
 * @version 0.2.0
 */
async function searchMovieOrShow(type, query, section) {
	try {
		if (query.length >= 3) {
			const APIUrl = `https://api.themoviedb.org/3/${type}?api_key=${APIKEY}&language=es-MX&query=${query}&page=1`
			const result = await fetch(APIUrl)
			const resultParsed = await result.json()
			const movies = resultParsed.results
			showList(movies, false, section)
		}
	} catch (error) {
		console.error(`Hubo un problema al buscar la pelicula o serie: ${error}`)
	}
}

/**
 * Muestra la novedades semanales de peliculas, series y actores
 * @author Luciano Salerno
 * @version 0.0.1
 */
async function getNews() {
	try {
		const APIUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=9772a809e83c417c835dc74456b510a4`
		const result = await fetch(APIUrl)
		const resultParsed = await result.json()
		const movies = resultParsed.results
		showList(movies, true, document.getElementById('novedades'))
	} catch (error) {
		console.error(`Problemas al traer las novedades: ${error}`)
	}
}

/**
 * Busca la pelicula o serie ingresada
 * @author Luciano Salerno
 * @version 0.0.1
 */
function search(){
	const opt = document.getElementsByName('option')
	opt[0].checked ? searchMovieOrShow(SEARCHTYPE.movie, this.value, document.getElementById('peliculas')) : searchMovieOrShow(SEARCHTYPE.tv, this.value, document.getElementById('series'))
}

// Busco pelicula/serie ingresada en la barra de busqueda
const buscador = document.querySelector('#buscador')
buscador.addEventListener('search', search)

//Muestro en la seccion de novedades las 5 primeras novedades
getNews()