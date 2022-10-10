const APIKEY = '9772a809e83c417c835dc74456b510a4'

const SEARCHTYPE = {
	movie: 'search/movie',
	tv: 'search/tv',
}

function showList(movies){
	const container = document.querySelector('.news_container')

	movies.map(movie => {
		getVideo(movie.id)
		const card = `
		<div class="news_card">
			<div class="news_card_head">
				<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="foto cv" class="news_card_head_img">
				<span class="novedad_info"><i class="fa-solid fa-film"></i></i></span>
			</div>
			<div class="news_card_body">
				<h2 class="news_card_body_nombre">${movie.title || movie.name}</h2>
				<p class="news_card_body_descripcion">
				${movie.vote_average}
				<span>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
					<i class="fa-solid fa-star"></i>
				</span>
				</p>
			</div>
		</div>`
	
		container.innerHTML += card
	})
}

async function searchMovieOrShow(type, query) {
	if(query.length >= 3){
		const APIUrl = `https://api.themoviedb.org/3/${type}?api_key=${APIKEY}&language=es-MX&query=${query}&page=1`
		const result = await fetch(APIUrl)
		const resultParsed = await result.json()
		// console.log(resultParsed)	
		const movies = resultParsed.results
		showList(movies)
	}
}

async function getNews() {
	try {
		const APIUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=9772a809e83c417c835dc74456b510a4`
		const result = await fetch(APIUrl)
		const resultParsed = await result.json()
		// console.log(resultParsed)	
		const movies = resultParsed.results
		showList(movies)
	} catch (error) {
		console.error(error)
	}
}


const buscador = document.querySelector('#buscador')
buscador.addEventListener('search', function(){
	searchMovieOrShow(SEARCHTYPE.tv, this.value)
})

getNews()

async function getVideo(id){
	try{
		const videos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}`)
		const videosParsed = await videos.json()
		const filtrados = videosParsed.results.filter(video => video.type === 'Trailer')

		filtrados.forEach(video => {
			const key = video.key
			const sitio = video.site.toLowerCase()
			const videoUrl  = `https://${sitio}.com/embed/${key}`
			const iframe = `<iframe width="560" height="315" src=${videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
			const body = document.getElementsByTagName('body')[0]
			body.innerHTML+= iframe
		})	
	}
	catch(error){
		console.warn(`Error: ${error}: La pelicula no tiene trailer`)
	}
}