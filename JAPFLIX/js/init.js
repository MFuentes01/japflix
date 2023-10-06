document.addEventListener('DOMContentLoaded', function () {

    const url = "https://japceibal.github.io/japflix_api/movies-data.json";
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const lista = document.getElementById("lista");
    const divInfo = document.getElementById("divInfo");


    fetch(url)
    .then(response => response.json())
    .then(data => {

        function stars(starNbr) {
            if (starNbr > 0 && starNbr <= 2) {
                return `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`;
            } else if (starNbr > 2 && starNbr <= 4) {
                return `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`;
            } else if (starNbr > 4 && starNbr <= 6) {
                return `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>`;
            } else if (starNbr > 6 && starNbr <= 8) {
                return `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>`;
            } else if (starNbr > 8 && starNbr <= 10) {
                return `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>`;
            } else {
                console.log(`Error de puntaje`);
            }
        }

        function masInfo() {
            divInfo.innerHTML += `
                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        ...
                    </div>
                </div>
            `;
        }



        btnBuscar.addEventListener("click", function () {



            if (inputBuscar.value != "") {

                const busqueda = inputBuscar.value.toLowerCase().trim();

                lista.innerHTML = "";


            
            

            data.forEach(movie => {

                const movieTitle = movie.title.toLowerCase()
                const movieGenres = movie.genres
                const movieTagline = movie.tagline.toLowerCase()
                const movieOverview = movie.overview.toLowerCase()

                if (movieTitle.includes(busqueda) || movieGenres.includes(busqueda) || movieTagline.includes(busqueda) || movieOverview.includes(busqueda)) {

                console.log(movie.title)
                
                if (lista) {
                    lista.innerHTML += `<div class='infoMovie'><li><h5>${movie.title}</h5>
                    <p>${movie.tagline}</p>
                    ${stars(movie.vote_average)}
                    </li>
                    </div>
                    
                    `

                    const div = document.querySelector(".infoMovie");

                    div.addEventListener("click", function () {
                        masInfo();
                    });
                    
                    
                } else {
                    console.error("El elemento con id 'album' no fue encontrado.");
                }

                
                  
                





            }});
            }
            

            

        })



    })
    .catch(error => {
        console.error("Error en la carga del fetch:", error);
    });



})