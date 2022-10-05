const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '17d25ea0bbmshead1c612606fe38p138505jsn6b83cb2ee369',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
	.then(response => response.json())
	.then(response => {
		console.log(response.d)
		response.d.map(movie => {
			const imgSrc = movie.i? movie.i.imageUrl : 'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs'
			const { l, s } = movie

			const container = document.querySelector('.news_container')
			const card = document.createElement('div')
			const cardHead = document.createElement('div')
			const cardBody = document.createElement('div')
			const img = document.createElement('img')
			const titulo = document.createElement('h2')
			const descripcion = document.createElement('p')

			container.classList.add('news_container')
			card.classList.add('news_card')
			cardHead.classList.add('news_card_head')
			cardBody.classList.add('news_card_body')
			img.classList.add('news_card_head_img')
			img.src = imgSrc
			titulo.classList.add('news_card_body_nombre')
			descripcion.classList.add('news_card_body_descripcion')


			cardHead.appendChild(img)
			
			titulo.innerHTML = l
			descripcion.innerHTML = s
			cardBody.appendChild(titulo)
			cardBody.appendChild(descripcion)

			card.appendChild(cardHead)
			card.appendChild(cardBody)
			container.appendChild(card)

		})
	})
	.catch(err => console.error(err));