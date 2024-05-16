import React, { useState, useRef, useEffect } from 'react';

const AudioFooter = ({ data }) => {
    const audioFooterRef = useRef(null);
    const trackRef = useRef(null);
    const elapseRef = useRef(null);
    const trackTimeRef = useRef(null);
    const iconPauseFooterRef = useRef(null);
    const iconPlayFooterRef = useRef(null);
    const buttonplayFooterRef = useRef(null);

    const [isPlayingFooter, setIsPlayingFooter] = useState(false);

    useEffect(() => {
        if (data !== null) {
            audioFooterRef.current.src = `data:audio/mpeg;base64,${data}`;
            //audioFooterRef.current.play();
        }
    }, [data]);

    const buildDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    const displayAudioDuration = () => {
        if (audioFooterRef.current) {
            audioFooterRef.current.addEventListener('canplaythrough', () => {
                const duration = audioFooterRef.current.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                trackTimeRef.current.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            });
        }
    };
    // suivi de l'audio avec l'ecriture du temps(un peu ça quoi)
    const trackAudioGlobal = () => {
        if (audioFooterRef.current) {
            audioFooterRef.current.addEventListener('timeupdate', () => {
                trackRef.current.value = (audioFooterRef.current.currentTime / audioFooterRef.current.duration) * 100;
                elapseRef.current.textContent = buildDuration(audioFooterRef.current.currentTime);
            });
        }
    };

    useEffect(() => {
        displayAudioDuration();
        trackAudioGlobal();
    }, []);

    const handleTrackInput = () => {
        const newTime = (trackRef.current.value / 100) * audioFooterRef.current.duration;
        audioFooterRef.current.currentTime = newTime;


    };

    const handleBack10s = () => {
        audioFooterRef.current.currentTime -= 10;
    };

    const handleNext10s = () => {
        audioFooterRef.current.currentTime += 10;
    };

    const handleButtonPlayFooterClick = () => {
        if (isPlayingFooter) {
            iconPlayFooterRef.current.style.display = 'inline-block';
            iconPauseFooterRef.current.style.display = 'none';
            audioFooterRef.current.pause();
            trackRef.current.value  = (audioFooterRef.current.duration  / 100) * audioFooterRef.current.currentTime;
            setIsPlayingFooter(false);
        } else {
            iconPlayFooterRef.current.style.display = 'none';
            iconPauseFooterRef.current.style.display = 'inline-block';
            audioFooterRef.current.play();
            setIsPlayingFooter(true);
        }
    };

    const handleAudioEnded = () => {
        trackRef.current.value = 0;
        iconPlayFooterRef.current.style.display = 'inline-block';
        iconPauseFooterRef.current.style.display = 'none';
    };

    useEffect(() => {
        if (audioFooterRef.current) {
            audioFooterRef.current.addEventListener('ended', handleAudioEnded);
        }
    }, []);

    return (
        <div className="flex gap-x-4 gap-y-2 justify-between">
            <div className="flex items-center">
                <button type="button" ref={buttonplayFooterRef} onClick={handleButtonPlayFooterClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" ref={iconPlayFooterRef} width="3em" height="3em" viewBox="0 0 53.18 53.18">
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block hidden" ref={iconPauseFooterRef} width="3em" height="3em" viewBox="0 0 53.18 53.18">
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
                    <audio src="{{ asset('audiostest/audio.mp3') }}" controls className="hidden" ref={audioFooterRef}></audio>
                </button>
            </div>
            <div className="flex-1 flex items-center relative">
                <input type="range" name="" id="trackaudio" min="0" value="0" ref={trackRef} onInput={handleTrackInput}></input>
                <div className="absolute -bottom-2 right-0 text-sm text-gray-700 px-1 py-0.5 font-mono">
                    <span ref={elapseRef} id="elapse">0:00</span> / <span ref={trackTimeRef} id="track-time">0:00</span>
                </div>
                <div className="flex items-center absolute -bottom-2 left-0 text-sm px-1">
                    <button type="button" id="back-10s" className="group relative rounded-full focus:outline-none px-1" aria-label="Fast-forward 10 seconds" onClick={handleBack10s}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-slate-500 group-hover:stroke-slate-700 h-6 w-6">
                            <path d="M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188"></path>
                            <path d="M5 15V19"></path>
                            <path d="M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z"></path>
                        </svg>
                    </button>

                    <button type="button" id="next-10s" className="group relative rounded-full focus:outline-none" aria-label="Fast-forward 10 seconds" onClick={handleNext10s}>
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
