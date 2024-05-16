import React, { useState } from 'react';

const AudioFooter = ({ data }) => {

    const audioFooter = document.getElementById('audioFooter');
    console.log(audioFooter);
    if (data != null) {
        // Définir la source audio avec les données base64
        audioFooter.src = 'data:audio/mpeg;base64,' + data;
// Jouer l'audio
audioFooter.play();
    }


    const iconPauses = document.querySelectorAll('.icon-pause');
    const iconPlays = document.querySelectorAll('.icon-play');
    const buttonPlays = document.querySelectorAll('.buttonplay');
    const audios = document.querySelectorAll('audio');
    /* Variables footer */
    const track = document.getElementById('trackaudio');
    const elapse = document.getElementById('elapse');
    const trackTime = document.getElementById('track-time')
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
    function gestionAudioFooter(buttonplayFooter, iconPlayFooter, iconPauseFooter, isPlayingFooter, audioFooter, buttonPlays, audios) {
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





    return (
        <div className="flex gap-x-4 gap-y-2 justify-between">
            <div className="flex items-center">
                <button type="button" id="buttonplayFooter">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" id="icon-playFooter" width="3em" height="3em" viewBox="0 0 53.18 53.18">
                        <defs>
                            <style>
                                {`
                                   .icn-play {
                                    fill: #031e35;
                                   }

                                   .cls-2 {
                                    fill: #fff;
                                   }
                                `}
                            </style>
                        </defs>
                        <g id="Calque_2" data-name="Calque 2">
                            <g id="Calque_1-2" data-name="Calque 1">
                                <circle className="icn-play" cx="26.59" cy="26.59" r="26.59" />
                                <path className="cls-2" d="M18.48,14.55V38.63A1.53,1.53,0,0,0,20.79,40l20.6-12a1.53,1.53,0,0,0,0-2.64l-20.6-12A1.53,1.53,0,0,0,18.48,14.55Z" />
                            </g>
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block hidden" id="icon-pauseFooter" width="3em" height="3em" viewBox="0 0 53.18 53.18">
                        <defs>
                            <style>
                                {`
                                    .icn-pause {
                                        fill: #031e35;
                                    }

                                    .cls-2 {
                                        fill: #fff;
                                    }
                                `}
                            </style>
                        </defs>
                        <g id="Calque_2" data-name="Calque 2">
                            <g id="Calque_1-2" data-name="Calque 1">
                                <circle className="icn-pause" cx="26.59" cy="26.59" r="26.59" />
                                <rect className="cls-2" x="16.18" y="13.3" width="6" height="27" rx="1.77" />
                                <rect className="cls-2" x="31.18" y="13.3" width="6" height="27" rx="1.77" />
                            </g>
                        </g>
                    </svg>
                    <audio src="{{ asset('audiostest/audio.mp3') }}" controls className="hidden" id="audioFooter"></audio>
                </button>
            </div>
            <div className="flex-1 flex items-center relative">
                <input type="range" name="" id="trackaudio" min="0" value="0"></input>
                <div className="absolute -bottom-2 right-0 text-sm text-gray-700 px-1 py-0.5 font-mono">
                    <span id="elapse">0:00</span> / <span id="track-time">0:00</span>
                </div>
                <div className="flex items-center absolute -bottom-2 left-0 text-sm px-1">
                    <button type="button" id="back-10s" className="group relative rounded-full focus:outline-none px-1" aria-label="Fast-forward 10 seconds">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-slate-500 group-hover:stroke-slate-700 h-6 w-6">
                            <path d="M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188"></path>
                            <path d="M5 15V19"></path>
                            <path d="M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z"></path>
                        </svg>
                    </button>

                    <button type="button" id="next-10s" className="group relative rounded-full focus:outline-none" aria-label="Fast-forward 10 seconds">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="stroke-slate-500 group-hover:stroke-slate-700 h-6 w-6">
                            <path d="M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M13 15V19" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <span className="inline-block shadow-lg rounded-lg py-1 px-2 bg-white/60 hover:bg-white-blue border-ui-1">
                    <button type="button" className="">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-play inline-block" width="1.2rem" height="1.2rem" viewBox="0 0 53.18 53.18">
                            <defs>
                                <style>
                                    {`
                                        .icn-play {
                                            fill: #031e35;
                                        }

                                        .cls-2 {
                                            fill: #fff;
                                        }
                                    `}
                                </style>
                            </defs>
                            <g id="Calque_2" data-name="Calque 2">
                                <g id="Calque_1-2" data-name="Calque 1">
                                    <circle className="icn-play" cx="26.59" cy="26.59" r="26.59" />
                                    <path className="cls-2" d="M18.48,14.55V38.63A1.53,1.53,0,0,0,20.79,40l20.6-12a1.53,1.53,0,0,0,0-2.64l-20.6-12A1.53,1.53,0,0,0,18.48,14.55Z" />
                                </g>
                            </g>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-pause inline-block hidden" width="1.2rem" height="1.2rem" viewBox="0 0 53.18 53.18">
                            <defs>
                                <style>
                                    {`
                                        .icn-pause {
                                            fill: #031e35;
                                        }

                                        .cls-2 {
                                            fill: #fff;
                                        }
                                    `}
                                </style>
                            </defs>
                            <g id="Calque_2" data-name="Calque 2">
                                <g id="Calque_1-2" data-name="Calque 1">
                                    <circle className="icn-pause" cx="26.59" cy="26.59" r="26.59" />
                                    <rect className="cls-2" x="16.18" y="13.3" width="6" height="27" rx="1.77" />
                                    <rect className="cls-2" x="31.18" y="13.3" width="6" height="27" rx="1.77" />
                                </g>
                            </g>
                        </svg>
                    </button>
                    <a href="{{ asset('audiostest/audio.mp3') }}" download="download" id="downloadFooteraudio"> Download</a>
                </span>
            </div>
        </div>
    );
};

export default AudioFooter;
