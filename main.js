const apiKey = 'b730699c3c94f8300615b9766ddf8dc6'
let imageCtn = document.querySelector('.image')
let languageCtn = document.querySelector('.language')
let genreFilter = document.querySelectorAll('.genre-filters > li')
let languageFilter = document.querySelectorAll('.language-filters > li')
let submitBtn = document.querySelector('.sub-btn')

let genres = []

genreFilter.forEach(element =>
    element.addEventListener('click', event => {
        if (event.target.classList.contains('selected')) {
            event.target.classList.remove('selected');
            const id = element.dataset.value
            const idx = genres.indexOf(id)
            genres.splice(idx,1)
        } else {
            event.target.classList.add('selected');
            genres.push(element.dataset.value)
        }
    })
)


submitBtn.addEventListener('click', () => {
    let ele = document.getElementsByName('gender');
    let language

    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked)
            language = ele[i].value
    }

    console.log(genres)
    imageCtn.innerHTML = ''
    languageCtn.innerHTML = ''

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genres}&with_original_language=${language}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(element => {
                if(element.backdrop_path) {
                    imageCtn.innerHTML += `<img style="width: 500px; height: auto" src="https://image.tmdb.org/t/p/original${element.backdrop_path}">`
                    languageCtn.innerHTML += `<p>${element.original_language}</p>`
                }}
            )
        })


})










