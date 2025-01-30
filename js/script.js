document.addEventListener("DOMContentLoaded", () => {
    // EVENEMENTS DU SCROLL
    document.addEventListener("scroll", () => {
        // TEST du scrollY 
        // console.log(scrollY);

        // BOUTON SCROLL VERS LE HAUT/BAS
        const scrollTop = document.querySelector("a.scroll-top");
        const scrollBottom = document.querySelector("a.scroll-bottom");

        if(scrollY > 3050) {
            scrollBottom.style.display = "none";
        } else if (scrollY < 3000) {
            scrollBottom.style.display = "block";
            scrollTop.style.display = "none";
        }

        var body = document.querySelector("body");
        var lastAlbumMusicDiv = document.querySelector("div.AlbumMusic:last-child");

        if(scrollY > (body.scrollHeight - lastAlbumMusicDiv.scrollHeight)) {
            scrollTop.style.display = "block";
        } 
        
        // MOUVEMENT DU VINYL 
        const vinyl = document.querySelector("div.vinyl");
        const maxScroll = document.body.scrollHeight - window.innerHeight; 
        const scrollRatio = window.scrollY / maxScroll; 
        const vinylMovement = scrollRatio * 550; 

        vinyl.style.right = `${-50 + vinylMovement}%`; 
        
        // MOUVEMENT DU H1 & H2 DANS LE HEADER
        const headerH1 = document.querySelector("header h1.title-page");
        const headerH2 = document.querySelector("header h2");

        // Déplacement des éléments h1 et h2
        const h1Movement = scrollY * 1; 
        const h2Movement = (scrollY + 250) * 1; 

        // Changement de positions
        headerH1.style.top = `${h1Movement}px`;  
        headerH2.style.top = `${h2Movement}px`;  

            // RESPONSIVE POCHETTE EN MOUVEMENT & VINYL (Sur téléphone + Ordinateur)
        const pochette = document.querySelector("div.pochette-vinyl");
        const pochetteMovement = scrollRatio * 100;

        if(body.clientWidth > 1024){
            if (scrollY > 1000) {
                pochette.style.left = `-${pochetteMovement}%`;
            } else {
                pochette.style.left = '-40%';
            }
        }

        if(body.clientWidth <= 1024){
            const pochetteMovement = scrollRatio * 200;
            pochette.style.left = `-40%`;

            if (scrollY > 800) {
                pochette.style.left = `-${pochetteMovement}%`;
            } else {
                pochette.style.left = '-60%';
            }
        }

        if(body.clientWidth <= 800){
            const pochetteMovement = scrollRatio * 400;
            if (scrollY >1000) {
                pochette.style.left = `-${pochetteMovement}%`;
            } else {
                pochette.style.left = '-100%';
            }
        }

        if(body.clientWidth <= 580){
            const pochetteMovement = scrollRatio * 400;

            const vinylMovement = scrollRatio * 700; 
            vinyl.style.right = `${-90 + vinylMovement}%`; 

            if (scrollY > 1000) {
                pochette.style.left = `-${pochetteMovement}%`;
            } else {
                pochette.style.left = '-130%';
            }
        }
        if(body.clientWidth <= 430){
            const pochetteMovement = scrollRatio * 400;

            const vinylMovement = scrollRatio * 550; 
            vinyl.style.right = `${-90 + vinylMovement}%`; 

            if (scrollY > 1000) {
                pochette.style.left = `-${pochetteMovement}%`;
            } else {
                pochette.style.left = '-120%';
            }
        }
    })

    // JSON DATA
        // Conteneur qui contiendra tous les blocs de code des albumOrMusic
    var listAlbumsMusics = document.querySelector("div.listAlbumsMusics");
        // compteur pour les images via le style background (pair = left, impair = right)
    var count = 0;
    fetch("./json/musiques.json").then(function(response){
        response.json().then(function(data){
            console.log(data);
            data.forEach(function(musique){
                // Ajout du bloc de code dans le conteneur listAlbumsMusics
                var blocCode = `
                    <div class="AlbumMusic">
                        <section class="presentation-artiste"> 
                            <h1>${musique.artiste}</h1>
                        </section>
                        <section class="${musique.albumOrMusic}">
                            <div class="${musique.DivNameBG}"></div>                
                            <div class="infos">
                                <div class="title-button">
                                    <h1>${musique.nomMusique} - ${musique.artiste}</h1>
                                        <div class="buttons">
                                            <button class="button-play" onclick='audioPlay("${musique.albumOrMusic}")'>&#9205</button>
                                            <button class="button-pause" onclick='audioPause("${musique.albumOrMusic}")'>&#9208</button>
                                        </div>
                                    </div>
                                <div class="audio">
                                    <audio controls onended="audioPause('${musique.albumOrMusic}')">
                                        <source src="${musique.audioURL}">
                                    </audio>
                                </div>
                                <div class="lecteur">
                                    <img src="images/vinyl.png" class="mini-vinyl" alt="vinyl">    
                                    <h2>${musique.nomMusique}</h2>
                                    <h3>${musique.artiste}</h3>
                                    <h4>${musique.droitsReserves}</h4>
                                </div>
                                <p class="explication">
                                    ${musique.explication}
                                </p>
                                <div class="plateforms">
                                    <!-- Ajout de la plateforme selon le lien renseigné (YouTube, SoundCloud, Spotify seulement acceptée) -->
                                </div>
                            </div>
                        </section>
                    </div>
                `;
                listAlbumsMusics.innerHTML += blocCode

                // Gère les plateformes (affiche seulement soit Spotify, SoundCloud ou YouTube)
                insertPlateform(musique);

                // Affichage des images de chaque AlbumOrMusic via le style background (pair = left, impair = right)
                var divBgImg = document.querySelector(`div.${musique.DivNameBG}`);

                if(count % 2 === 0){
                    console.log("paire");
                    divBgImg.style.backgroundImage = `url("${musique.ImageURL}")`;
                    divBgImg.style.backgroundPosition = 'left';
                    divBgImg.style.backgroundRepeat = 'no-repeat';
                    divBgImg.style.backgroundSize = 'contain';
                    divBgImg.style.backgroundAttachment = 'fixed';  
                    divBgImg.style.width = "100%";
                } else {
                    console.log("impaire");
                    divBgImg.style.backgroundImage = `url("${musique.ImageURL}")`;
                    divBgImg.style.backgroundPosition = 'right';
                    divBgImg.style.backgroundRepeat = 'no-repeat';
                    divBgImg.style.backgroundSize = 'contain';
                    divBgImg.style.backgroundAttachment = 'fixed';
                    divBgImg.style.width = "100%";
                }

                console.log("------------count-------------");
                console.log(count);

                count++;
            });
        })
    })   

    // FORMULAIRE
        // Inspiration pour l'implémentation en directe de l'image
        // https://www.developpez.net/forums/d2148119/javascript/general-javascript/lier-input-type-file-balise-image/

    // Variables pour les compteurs
    let countDivNameBGVisiteur = 0;
    let countAlbumOrMusic = 6;

    // Ajout des événements sur les champs texte, textarea et images/audios
    document.querySelector("#titre").addEventListener("keyup", updateLivePreview);
    document.querySelector("#artiste").addEventListener("keyup", updateLivePreview);
    document.querySelector("#explication").addEventListener("keyup", updateLivePreview);
    document.querySelector("#link").addEventListener("keyup", updateLivePreview);
    document.querySelector("#image").addEventListener("change", updateImagePreview);

    var buttonSubmit = document.querySelector("input[type='button'].button-submit");
    buttonSubmit.addEventListener("click", function () {
        // Implémentations des compteurs
        var DivNameBGVisiteur = `image-albumOrMusic-visiteur${countDivNameBGVisiteur}`;
        var AlbumOrMusicVisiteur = `albumOrMusic-${countAlbumOrMusic}`;
        countDivNameBGVisiteur++;
        countAlbumOrMusic++;
    
        // Vérification des champs obligatoires
        var imageInput = document.querySelector("input[type='file']#image");

        // Ajout du bloc dans le DOM
        insertBlocCode(AlbumOrMusicVisiteur, DivNameBGVisiteur, imageInput, countDivNameBGVisiteur);
    });
});