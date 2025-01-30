// FUNCTIONS
    // Gère l'affichage et le retirage du Popup
function PopUp() {
    var popUpDisplay = document.querySelector("div.pop-up");
    var scrollBottom = document.querySelector("a.scroll-bottom");
    var scrollTop = document.querySelector("a.scroll-top");
    
    if(popUpDisplay.classList.contains("active")){
        popUpDisplay.classList.remove("active");
        document.body.classList.remove("no-scroll");

        // Enlever le bouton scrollBottom/scrollTop lorsque l'on ouvre le Popup et ne voir que le formulaire
        scrollBottom.classList.remove("no-scroll-button");
        scrollTop.classList.remove("no-scroll-button");

    } else {
        popUpDisplay.classList.add("active");
        document.body.classList.add("no-scroll");

        // Réafficher le bouton scrollBottom/scrollTop 
        scrollBottom.classList.add("no-scroll-button");
        scrollTop.classList.add("no-scroll-button");

        console.log("active");
    }
}
    // Met toutes les musiques/audios en play
function audioPlay(albumOrMusic) {    
    console.log("audio play");
    // Mettre toutes les audios en off
    var AllAudioSetPause = document.querySelectorAll("audio");
    AllAudioSetPause.forEach(function(audio){
        audio.pause();
    });

    // Suppression des boutons Pause sur toutes les musiques/albums
    var AllButtonPause = document.querySelectorAll(`button[class="button-pause"]`);
    AllButtonPause.forEach(function(buttonPause) {
        buttonPause.style.display = "none";
    });

    // Ne faire apparaître que les boutons Play sur toutes les musiques/albums
    var AllButtonPlay = document.querySelectorAll(`button[class="button-play"]`);
    AllButtonPlay.forEach(function(buttonPlay) {
        buttonPlay.style.display = "block";
    })

    // Arrêter l'animation de tous les vinyls
    var vinyls = document.querySelectorAll(`div.lecteur img`);
    vinyls.forEach(function(vinyl) {
        vinyl.style.animation = "none";
    })

    // Boutons associés au sélecteur ciblé
        // AOM = AlbumOrMusic
    var buttonPlayAOM = document.querySelector(`.${albumOrMusic} div.buttons button.button-play`);    
    var buttonPauseAOM = document.querySelector(`.${albumOrMusic} div.buttons button.button-pause`);
    
    // Changement des display des boutons
    buttonPlayAOM.style.display = "none";
    buttonPauseAOM.style.display = "block";

    // Jouer la musique
    document.querySelector(`.${albumOrMusic} audio`).play();
    
    // Animation du vinyl du sélecteur ciblé
    var vinyl = document.querySelector(`.${albumOrMusic} div.lecteur img`);
    setTimeout(() => {
        vinyl.style.animation = "rotate 1s linear infinite"; // Réapplique l'animation
    }, 0);

}
    // Met toutes les musiques/audios en pause
function audioPause(albumOrMusic) {
    // Mettre en pause l'audio
    document.querySelector(`.${albumOrMusic} audio`).pause();

    // Boutons associés au sélecteur ciblé
        // AOM = AlbumOrMusic
    var buttonPlayAOM = document.querySelector(`.${albumOrMusic} div.buttons button.button-play`);    
    var buttonPauseAOM = document.querySelector(`.${albumOrMusic} div.buttons button.button-pause`);

    // Affiche seulement le bouton Play et disparition du bouton Pause du sélecteur ciblé
    if (buttonPlayAOM && buttonPauseAOM) {
        buttonPlayAOM.style.display = "block";
        buttonPauseAOM.style.display = "none";
    }

    // Arrêter l'animation du vinyl
    var vinyl = document.querySelector(`.${albumOrMusic} div.lecteur img`);
    vinyl.style.animation = "none"; 
}
    // Met à jour l'image de fond
function updateBackgroundImage(imageSrc, DivNameBGVisiteur, countDivNameBGVisiteur) {
    var divBgImg = document.querySelector(`div.${DivNameBGVisiteur}`);
    if (!divBgImg) {
        console.error("DivNameBGVisiteur introuvable :", DivNameBGVisiteur);
        return;
    }

    if (countDivNameBGVisiteur % 2 === 0) {
        divBgImg.style.backgroundImage = `url("${imageSrc}")`;
        divBgImg.style.backgroundPosition = "left";
    } else {
        divBgImg.style.backgroundImage = `url("${imageSrc}")`;
        divBgImg.style.backgroundPosition = "right";
    }
    divBgImg.style.backgroundRepeat = "no-repeat";
    divBgImg.style.backgroundSize = "contain";
    divBgImg.style.backgroundAttachment = "fixed";
    divBgImg.style.width = "100%";
}
    // Ajout de la plateforme (soit Spotify, YouTube ou SoundCloud)
function insertPlateform(musique) {
    var linkPlateform = musique.link;
    var divPlateforms = document.querySelector(`.${musique.albumOrMusic} div.plateforms`);

    if(linkPlateform.includes("spotify")){
        var insertLink = `
            <a href="${musique.link}" target="_blank" id="logo-spotify"><i class='bx bxl-spotify'></i></a> 
        `;
        divPlateforms.innerHTML += insertLink;
    } else if(linkPlateform.includes("soundcloud")){
        var insertLink = `
            <a href="${musique.link}" target="_blank" id="logo-soundcloud"><i class='bx bxl-soundcloud'></i></a> 
        `;
        divPlateforms.innerHTML += insertLink;
    } else {
        var insertLink = `
            <a href="${musique.link}" target="_blank" id="logo-youtube"><i class='bx bxl-youtube'></i></a>
        `;
        divPlateforms.innerHTML += insertLink;
    }
}
    // Ajout du lien du visiteur
function insertPlateformVisiteur(link, AlbumOrMusicVisiteur) {
    var divPlateforms = document.querySelector(`.${AlbumOrMusicVisiteur} div.plateforms`);

    if(link.includes("spotify")){
        var insertLink = `
            <a href="${link}" target="_blank" id="logo-spotify"><i class='bx bxl-spotify'></i></a> 
        `;
        divPlateforms.innerHTML += insertLink;
    } else if(link.includes("soundcloud")){
        var insertLink = `
            <a href="${link}" target="_blank" id="logo-soundcloud"><i class='bx bxl-soundcloud'></i></a> 
        `;
        divPlateforms.innerHTML += insertLink;
    } else {
        var insertLink = `
            <a href="${link}" target="_blank" id="logo-youtube"><i class='bx bxl-youtube'></i></a>
        `;
        divPlateforms.innerHTML += insertLink;
    }
}
    // Ajout du bloc de code/ de la section du visiteur
function insertBlocCode(AlbumOrMusicVisiteur, DivNameBGVisiteur, image, countDivNameBGVisiteur) {
    var title = document.querySelector("input[type='text']#titre").value;
    var artiste = document.querySelector("input[type='text']#artiste").value;
    var explication = document.querySelector("textarea#explication").value;
    var audio = document.querySelector("input[type='url']#audio").value;
    var link = document.querySelector("input[type='url']#link").value;
    var mail = document.querySelector("input[type='email']#mail").value;
    
    var blocCodeVisiteur = `
        <div class="AlbumMusic">
            <section class="presentation-artiste"> 
                <h1>${artiste}</h1>
            </section>
            <section class="${AlbumOrMusicVisiteur}">
                <div class="${DivNameBGVisiteur}"></div>                
                <div class="infos">
                    <div class="title-button">
                        <h1>${title} - ${artiste}</h1>
                        <div class="buttons">
                            <button class="button-play" onclick='audioPlay("${AlbumOrMusicVisiteur}")'>&#9205</button>
                            <button class="button-pause" onclick='audioPause("${AlbumOrMusicVisiteur}")'>&#9208</button>
                        </div>
                    </div>
                    <div class="audio">
                        <audio controls>
                            <source src="${audio}" type="audio/mp3">
                            Votre navigateur ne supporte pas l'élément audio.
                        </audio>
                    </div>
                    <div class="lecteur">
                        <img src="images/vinyl.png" class="mini-vinyl">    
                        <h2>${title}</h2>
                        <h3>${artiste}</h3>
                    </div>
                    <p class="explication">
                        ${explication}
                    </p>
                    <div class="plateforms">
                        <!-- Lien vers les plateformes sera ajouté ici -->
                    </div>
                </div>
            </section>
        </div>
    `;

    var listAlbumsMusics = document.querySelector(".listAlbumsMusics");
    if (listAlbumsMusics) {
        // Gestion des erreurs du formulaire
        const errorSpanMail = document.querySelector("span.error-mail");
        const validateSpanMail = document.querySelector("span.validate-mail");

        const errorSpanTitle = document.querySelector("span.error-title");
        const validateSpanTitle = document.querySelector("span.validate-title");

        const errorSpanArtiste = document.querySelector("span.error-artist");
        const validateSpanArtiste = document.querySelector("span.validate-artist");

        const errorSpanExplication = document.querySelector("span.error-explication");
        const validateSpanExplication = document.querySelector("span.validate-explication");

        const errorSpanImg = document.querySelector("span.error-img");
        const validateSpanImg = document.querySelector("span.validate-img");

        const errorSpanAudio = document.querySelector("span.error-audio");
        const validateSpanAudio = document.querySelector("span.validate-audio");
        let canInsertAudio = null;

        const errorSpanLink = document.querySelector("span.error-link");
        const validateSpanLink = document.querySelector("span.validate-link");

        // Réinitialisation des messages de validation
        validateSpanMail.innerHTML = "";
        validateSpanTitle.innerHTML = "";
        validateSpanArtiste.innerHTML = "";
        validateSpanExplication.innerHTML = "";
        validateSpanImg.innerHTML = "";
        validateSpanAudio.innerHTML = "";
        validateSpanLink.innerHTML = "";

        // Vérification des champs obligatoires
        if (!mail) {
            errorSpanMail.innerHTML = "Erreur sur le mail. Veuillez entrer votre mail";
        } else {
            errorSpanMail.innerHTML = "";
            validateSpanMail.innerHTML = "Mail validé !";
        }

        if (!title) {
            errorSpanTitle.innerHTML = "Erreur sur le titre de la musique. Entrer un titre de musique";
        } else {
            errorSpanTitle.innerHTML = "";
            validateSpanTitle.innerHTML = "Champs validé !";
        }

        if (!artiste) {
            errorSpanArtiste.innerHTML = "Erreur sur le nom de l'artiste de la musique. Entrer le nom de l'artiste de la musique";
        } else {
            errorSpanArtiste.innerHTML = "";
            validateSpanArtiste.innerHTML = "Champs validé !";
        }

        if (!explication) {
            errorSpanExplication.innerHTML = "Erreur sur l'explication de la musique. Entrer une explication de la musique";
        } else {
            errorSpanExplication.innerHTML = "";
            validateSpanExplication.innerHTML = "Champs validé !";
        }
        if(!image) {
            errorSpanImg.innerHTML = "Erreur sur l'image. Veuillez insérer une image pour l'album/la musique";
        } else {
            // Gestion de l'image
            if (image.files.length > 0) {
                const imageFile = image.files[0];
                const imageReader = new FileReader();
                imageReader.onload = function (e) {
                    const imageURL = e.target.result;

                    // Mise à jour de l'image de fond
                    updateBackgroundImage(imageURL, DivNameBGVisiteur, countDivNameBGVisiteur);
                };
                imageReader.readAsDataURL(imageFile);
                errorSpanImg.innerHTML = "";
                validateSpanImg.innerHTML = "Image validé !";
                console.log(image.files.length);

            } else {
                errorSpanImg.innerHTML = "Erreur sur l'image. Veuillez insérer une image pour l'album/la musique";
                validateSpanImg.innerHTML = "";
            }
        }

        if (!audio) {
            errorSpanAudio.innerHTML = "Erreur sur le lien audio. Format attendu : https://{url}/{votremusique}.mp3 ou http://{url}/{votremusique}.mp3 (extension mp3, wav et ogg)";
        } else {
            // Vérification de la syntaxe de l'URL audio
            if ((audio.startsWith('https://') || audio.startsWith('http://')) &&
                (audio.endsWith('.mp3') || audio.endsWith('.wav') || audio.endsWith('.ogg'))) {
                validateSpanAudio.innerHTML = "Lien audio validé !";
                errorSpanAudio.innerHTML = "";
            } else {
                errorSpanAudio.innerHTML = "Erreur sur le lien audio. Format attendu : https://{url}/{votremusique}.mp3 ou http://{url}/{votremusique}.mp3 (extension mp3, wav et ogg)";
                validateSpanAudio.innerHTML = "";
            }
        }

        if (!link) {
            errorSpanLink.innerHTML = `Erreur sur le lien vers la plateforme. Format attendu : </br> 
                - https://open.spotify.com/{chemin vers la musique} </br>
                - https://soundcloud.com/{chemin vers la musique} </br>
                - https://www.youtube.com/{lien de la musique}`;
        } else {
            // Vérification de la syntaxe de l'URL du lien vers la plateforme
            if ((link.startsWith('https://') || link.startsWith('http://')) &&
                (link.includes('open.spotify.com') || link.includes('soundcloud.com') || link.includes('youtube.com'))) {
                validateSpanLink.innerHTML = "Lien vers la plateforme validé !";
                errorSpanLink.innerHTML = "";
                // Gère les plateformes (affiche seulement Spotify, SoundCloud ou YouTube)
                canInsertAudio = true;
            } else {
                errorSpanLink.innerHTML = `Erreur sur le lien vers la plateforme. Format attendu : </br> 
                - https://open.spotify.com/{chemin vers la musique} </br>
                - https://soundcloud.com/{chemin vers la musique} </br>
                - https://www.youtube.com/{lien de la musique}`;
                validateSpanLink.innerHTML = "";
            }
        }

        console.log(mail);

        // Si aucune erreur n'est présente, on ajoute le bloc de code
        if (!errorSpanTitle.innerHTML && !errorSpanArtiste.innerHTML && !errorSpanExplication.innerHTML && !errorSpanAudio.innerHTML && !errorSpanLink.innerHTML) {
            listAlbumsMusics.innerHTML += blocCodeVisiteur;
            if(canInsertAudio) {
                insertPlateformVisiteur(link, AlbumOrMusicVisiteur);
                
                // Utilisation de l'API, envoi des données vers la base de données.
                var link = `https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=te&courriel=${mail}&message=Titre : ${title}\n Description : ${explication}\n`;
                console.log(link);

                fetch(link).then(function(response) {
                    response.json().then(function(data){
                        console.log("Réponse reçue : ")
                        console.log(data);
                    });
                });

                alert("Votre avis a été pris en compte !");
                // Suppression du pop-up pour voir directement le résultat qui a été submit.
                PopUp();
            } else {
                return;
            }

        } else {
            console.log("Le formulaire contient des erreurs. Veuillez vérifier les champs.");
        }
        
    } else {
        console.error("Conteneur listAlbumsMusics introuvable !");
    }
}

//-----------------------------------------------------------------------------------------------------

// Fonction pour mettre à jour l'aperçu en direct
let savedImage = "";  // Variable globale pour stocker l'URL de l'image

// Fonction pour mettre à jour l'aperçu (utilise la variable savedImage)
function updateLivePreview() {
    const divApercu = document.querySelector("div.apercu");

    // Récupération des valeurs des champs
    const title = document.querySelector("#titre").value || "Titre non renseigné";
    const artiste = document.querySelector("#artiste").value || "Artiste non renseigné";
    const explication = document.querySelector("#explication").value || "Aucune explication fournie.";

    const link = document.querySelector("#link").value || "Aucun lien vers une plateforme renseigné.";

    divApercu.innerHTML = `
        <div class="AlbumMusic-apercu">
            <section class="presentation-artiste-apercu">
                <h1>${artiste}</h1>
            </section>
            <section class="albumOrMusic-apercu">
                <!-- Utiliser la variable savedImage pour l'image de fond -->
                <div class="image-preview" style="background-image: url(${savedImage}); background-size: contain; background-position: left; background-repeat: no-repeat;"></div>
                <div class="infos">
                    <div class="title-button">
                        <h1>${title} - ${artiste}</h1>
                        <div class="buttons">
                            <button class="button-play"><i class='bx bx-play'></i></button>
                        </div>
                    </div>
                    <div class="audio">
                        <audio controls>
                            <source src="#" type="audio/mpeg">
                            Votre navigateur ne supporte pas l'élément audio.
                        </audio>
                    </div>
                    <div class="lecteur">
                        <img src="images/vinyl.png" class="mini-vinyl" alt="vinyl">
                        <h3>${title}</h3>
                        <h4>${artiste}</h4>
                    </div>
                    <p class="explication">${explication}</p>
                    <div class="plateforms">
                        ${link ? `<a href="${link}" target="_blank">Écouter sur la plateforme</a>` : ""}
                    </div>
                </div>
            </section>
        </div>
    `;
}
// Fonction pour gérer l'image et la stocker dans savedImage
function updateImagePreview() {
    const imageInput = document.querySelector("#image").files[0];

    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Enregistrer l'image en base64 dans la variable globale
            savedImage = e.target.result;

            // Appliquer l'image de fond à l'élément existant dans l'aperçu
            const imagePreview = document.querySelector(".albumOrMusic-apercu div.image-preview");
            if (imagePreview) {
                imagePreview.style.backgroundImage = `url(${savedImage})`;
                imagePreview.style.backgroundSize = "contain";
                imagePreview.style.backgroundPosition = "left";
                imagePreview.style.backgroundRepeat = "no-repeat";
                imagePreview.style.width = "100%";
                imagePreview.style.height = "100%";
            }
        };
        reader.readAsDataURL(imageInput);
    } else {
        console.warn("Aucun fichier image sélectionné.");
    }
}