

/* ###################### Menu Mobile Slide ######################*/

function slideMenu() {
    var menu = document.getElementById('menu-slide');
    var bgMenuSlide = document.getElementById('bg-menu-slide');


    bgMenuSlide.classList.remove('hidden')
    menu.classList.remove('reverse-menu-slide')
    menu.classList.remove('-translate-x-[100%]')
    menu.classList.add('menu-slide')
}
function closeSlideMenu() {
    var menu = document.getElementById('menu-slide');
    var bgMenuSlide = document.getElementById('bg-menu-slide');

    menu.classList.remove('menu-slide')
    menu.classList.add('reverse-menu-slide')
    menu.classList.add('-translate-x-[100%]')
    setTimeout(function () {
        bgMenuSlide.classList.add('hidden');
    }, 200);





}


/*
audio
icon pause
icon play
son
download
track
*/

/* ###################### Faire jouer les Audio ########################## */


const iconPauses = document.querySelectorAll('.icon-pause');
const iconPlays = document.querySelectorAll('.icon-play');
const buttonPlays = document.querySelectorAll('.buttonplay');
const audios = document.querySelectorAll('audio');
/* Variables footer */
const track = document.getElementById('trackaudio');
const elapse = document.getElementById('elapse');
const trackTime = document.getElementById('track-time')
const audioFooter = document.getElementById('audioFooter')
const iconPauseFooter = document.getElementById('icon-pauseFooter')
const iconPlayFooter = document.getElementById('icon-playFooter')
const buttonplayFooter = document.getElementById('buttonplayFooter')



/* ########### Gestion du survole ################# */
buttonPlays.forEach((buttonPlay, index) => {
    const svgsInsideButton = buttonPlay.querySelectorAll('svg');
    buttonPlay.addEventListener('mouseover', () => {
        svgsInsideButton.forEach(svg => {
            svg.setAttribute('fill', '#031e35e');
        });
    });
    buttonPlay.addEventListener('mouseout', () => {
        svgsInsideButton.forEach(svg => {
            svg.setAttribute('fill', '#031e35');
        });
    });
});
/* ########### Faire Jouer la musique ################# */
buttonPlays.forEach((buttonPlay, index) => {
    const iconPause = iconPauses[index];
    const iconPlay = iconPlays[index];
    const audio = audios[index];
    let isPlaying = false;

    buttonPlay.addEventListener('click', () => {
        if (isPlaying == true) {
            iconPlay.style.display = "inline-block";
            iconPause.style.display = "none";
            audio.pause();
            iconPlayFooter.style.display = "inline-block";
            iconPauseFooter.style.display = "none";
            isPlaying = false;




        } else {
            iconPlay.style.display = "none";
            iconPause.style.display = "inline-block";
            iconPlayFooter.style.display = "none";
            iconPauseFooter.style.display = "inline-block";
            const sourceEnfant = audio.querySelector('source');
            audioFooter.src = sourceEnfant.src;
            audio.currentTime = 0;
            audio.play();
            isPlaying = true;
            /* audioFooter.play(); */
            trackAudioGlobal(audio)
            audio.addEventListener('timeupdate', () => {
                audioFooter.currentTime = audio.currentTime
            })




            buttonPlays.forEach((buttonPlayVerifiedPause, indexVerifiedPause) => {
                if (indexVerifiedPause != index) {

                    const audioVerified = audios[indexVerifiedPause];
                    const iconPauseVerified = iconPauses[indexVerifiedPause];
                    const iconPlayVerified = iconPlays[indexVerifiedPause];
                    if (!audioVerified.paused) {
                        audioVerified.pause();
                    }
                    iconPlayVerified.style.display = "inline-block"
                    iconPauseVerified.style.display = "none"


                }


            });


        }


    });
    audio.addEventListener('ended', () => {
        iconPlay.style.display = 'inline-block';
        iconPause.style.display = 'none';
        iconPlayFooter.style.display = 'inline-block';
        iconPauseFooter.style.display = 'none';

    })
});


/* -------- Footer Audio -------- */

const svgsInsideButtonFooter = buttonplayFooter.querySelectorAll('svg');
/* --- hover --- */
buttonplayFooter.addEventListener('mouseover', () => {
    svgsInsideButtonFooter.forEach(svg => {
        svg.setAttribute('fill', '#ccc');
    });
});
buttonplayFooter.addEventListener('mouseout', () => {
    svgsInsideButtonFooter.forEach(svg => {
        svg.setAttribute('fill', '#031e35');
    });
});

/* --- Faire jouer la musique --- */

/* Duration (track-time) */
function displayAudioDuration(trackTimeDuration, audioFooterDuration) {
    /*  const audioFooterDuration = document.getElementById(audio); */

    // Vérifier si l'élément audio existe
    if (audioFooterDuration) {
        // Attendre que le fichier audio soit chargé
        audioFooterDuration.addEventListener('canplaythrough', () => {
            // Récupérer la durée de l'audio en secondes
            const duration = audioFooterDuration.duration;

            // Convertir la durée en format minutes:secondes
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);

            // Afficher la durée dans une div
            /* const trackTimeDuration = document.getElementById(divTime) */
            trackTimeDuration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
    }
}

displayAudioDuration(trackTime, audioFooter)

/* Suivi du temps (elapse) */
function buildDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const secondes = Math.floor(duration % 60);
    return `${minutes}:${String(secondes).padStart(2, "0")}`;
}
trackAudioGlobal(audioFooter)
function trackAudioGlobal(audio) {
    audio.addEventListener('timeupdate', () => {
        track.value = (audio.currentTime / audio.duration) * 100;

        elapse.textContent = buildDuration(audio.currentTime)

    })
}


track.addEventListener('input', () => {
    /* elapse.textContent = "hhs" */
    const newTime = (track.value / 100) * audioFooter.duration;
    // Mettre à jour le currentTime de l'audio
    audioFooter.currentTime = newTime;

});
/* Button back and next */
const backAudio10s = document.getElementById('back-10s')
const nextAudio10s = document.getElementById('next-10s')
backAudio10s.addEventListener('click', () => {
    audioFooter.currentTime -= 10
});
nextAudio10s.addEventListener('click', () => {
    audioFooter.currentTime += 10
});


/* Gestion des bouttons */
function gestionAudioFooter(buttonplayFooter, iconPlayFooter, iconPauseFooter, isPlayingFooter, audioFooter, buttonPlays , audios) {
    buttonplayFooter.addEventListener('click', () => {
        if (isPlayingFooter == true) {
            iconPlayFooter.style.display = "inline-block"
            iconPauseFooter.style.display = "none"
            audioFooter.pause();

            isPlayingFooter = false;



        } else {
            iconPlayFooter.style.display = "none"
            iconPauseFooter.style.display = "inline-block"
            audioFooter.play();
            isPlayingFooter = true;
           /*  buttonPlays.forEach((button, index) => {

                const iconPause = iconPauses[index];
                const iconPlay = iconPlays[index];
                const audio = audios[index];
                iconPause.style.display = "none";
                iconPlay.style.display = "inline-block";
                if (!audio.paused) {
                    audio.pause();
                }
            });
 */
        }


    });
    audioFooter.addEventListener('ended', () => {
        track.value = (0 / audioFooter.duration) * 100;
        iconPlayFooter.style.display = 'inline-block';
        iconPauseFooter.style.display = 'none';
    })
}
gestionAudioFooter(buttonplayFooter, iconPlayFooter, iconPauseFooter, false, audioFooter, buttonPlays, audios)

/* ###################### Gestion des caractère ########################## */

/* ---------- Compter le nombre de caractère ----------*/

const limitCharactere = document.getElementById('limit-char')
const messageToTranscrip = document.getElementById('message-to-transcrip')
const trackWord = document.getElementById('track-word')

let limitword = limitCharactere.textContent
const maxLength = parseInt(limitword)

messageToTranscrip.addEventListener('input', function (event) {
    // Récupérer le contenu de l'input
    const texte = this.value;

    // Compter le nombre de caractères
    const nombreCaracteres = texte.length;


    trackWord.textContent = nombreCaracteres;

    // Mettre à jour l'élément d'affichage du comptage
    if (texte.length >= maxLength) {
        event.preventDefault()
        this.value = texte.substring(0, maxLength);
        trackWord.textContent = this.value.length;
    }
});



/* ###################### Valider le formulaire ########################## */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
document.getElementById('text-to-speech-form').addEventListener('submit', async (e) => {

    e.preventDefault();
    const spinnerIcon = document.querySelector('#spinner-icon')

    var texte = messageToTranscrip.value;
    var voice = document.getElementById('voiceForm').value;

    spinnerIcon.classList.remove("hidden")

    fetch('/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
        },
        body: JSON.stringify({ text: texte, voice: voice })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);


            // Définir la source audio avec les données base64
            audioFooter.src = 'data:audio/mpeg;base64,' + data.audio;

            // Jouer l'audio
            audioFooter.play();
        })
        .catch(error => console.error('Erreur:', error));
    await sleep(3000);
    spinnerIcon.classList.add("hidden")

});

/* ###################### Paiement ########################## */

// Fonction pour revenir à l'URL précédente
function retournerPagePrecedente() {
    window.history.back();
}




