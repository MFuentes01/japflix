document.addEventListener('DOMContentLoaded', function () {
    const url = "https://japceibal.github.io/japflix_api/movies-data.json";
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const lista = document.getElementById("lista");
    const divInfo = document.getElementById("divInfo");

    let movieData = []; // Almacenar los datos de las películas

    function stars(starNbr) {
        // Función para generar las estrellas según el puntaje
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

    function mostrarInfoPelicula(movie) {
        // Limpiar el contenido previo de divInfo
        divInfo.innerHTML = "";

        // Crear el contenido HTML para mostrar la información de la película
        const infoHTML = `
            <h5>${movie.title}</h5>
            <p><strong>Resumen:</strong> ${movie.overview}</p>
            <p><strong>Género:</strong> ${movie.genres[0].name}</p>
            <button class="btn btn-primary btn-sm btn-info" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">Más Info</button>
        `;

        // Establecer el contenido HTML en divInfo
        divInfo.innerHTML = infoHTML;

        // Mostrar el contenedor de información de película
        divInfo.style.display = "block";
        masInfo(movie);
    }

    function masInfo(movie) {
        // Crear el contenido HTML para la información adicional
        const infoAdicionalHTML = `
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <p><strong>Año de lanzamiento:</strong> ${new Date(movie.release_date).getFullYear()}</p>
                    <p><strong>Duración:</strong> ${movie.runtime} minutos</p>
                    <p><strong>Presupuesto:</strong> $${movie.budget}</p>
                    <p><strong>Ganancias:</strong> $${movie.revenue}</p>
                </div>
            </div>
        `;

        // Agregar el contenido HTML al divInfo
        divInfo.innerHTML += infoAdicionalHTML;
    }

    btnBuscar.addEventListener("click", function () {
        if (inputBuscar.value != "") {
            const busqueda = inputBuscar.value.toLowerCase().trim();
            lista.innerHTML = "";
            divInfo.innerHTML="";

            movieData.forEach(movie => {
                const movieTitle = movie.title.toLowerCase();
                const movieGenres = movie.genres.join(', ').toLowerCase();
                const movieTagline = movie.tagline.toLowerCase();
                const movieOverview = movie.overview.toLowerCase();

                if (movieTitle.includes(busqueda) || movieGenres.includes(busqueda) || movieTagline.includes(busqueda) || movieOverview.includes(busqueda)) {
                    const div = document.createElement("div");
                    div.classList.add("infoMovie");
                    div.innerHTML = `<li><h5>${movie.title}</h5>
                    <p>${movie.tagline}</p>
                    ${stars(movie.vote_average)}
                    
                    </li>`;

                    div.addEventListener("click", function () {
                        mostrarInfoPelicula(movie);
                    });

                    lista.appendChild(div);
                }
            });
        }
    });

    // Cargar los datos de las películas una vez al inicio
    fetch(url)
        .then(response => response.json())
        .then(data => {
            movieData = data; // Almacenar los datos de las películas
        })
        .catch(error => {
            console.error("Error en la carga del fetch:", error);
        });
});
