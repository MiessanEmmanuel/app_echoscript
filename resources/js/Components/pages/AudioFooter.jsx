import React, { useState, useRef, useEffect } from 'react';
import IconPlay from '../Icons/IconPlay';
import IconPause from '../Icons/IconPause';
import IconBack10S from '../Icons/IconBack10S';
import IconNext10S from '../Icons/IconNext10S';
import IconDownload from '../Icons/IconDownload';

const AudioFooter = ({ data, srcLinkAudio, className = '', isPlayingFooterLocal = false, nameAudioDownload = 'Audio' }) => {
    const audioFooterRef = useRef(null);
    const audioFooterDownloadRef = useRef(null);

    const trackRef = useRef(null);
    const elapseRef = useRef(null);
    const trackTimeRef = useRef(null);

    const [isPlayingFooter, setIsPlayingFooter] = useState(false);


    // Name download
    const [fileNameDownload, setFileNameDownload] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD
        setFileNameDownload(`${nameAudioDownload}_Echoscript_${formattedDate}.mp3`);
        if (data !== null) {
            audioFooterRef.current.src = `data:audio/mpeg;base64,${data}`;
            audioFooterDownloadRef.current.href = `data:audio/mpeg;base64,${data}`;
        } else {
            audioFooterRef.current.src = srcLinkAudio;
            audioFooterDownloadRef.current.href = srcLinkAudio;
        }
    }, [data, srcLinkAudio, nameAudioDownload]);

    const buildDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    const displayAudioDuration = () => {
        if (audioFooterRef.current) {
            audioFooterRef.current.addEventListener('canplaythrough', () => {
                const duration = audioFooterRef.current.duration;
                trackTimeRef.current.textContent = buildDuration(duration);
            });
        }
    };

    const trackAudioGlobal = () => {
        if (audioFooterRef.current) {
            audioFooterRef.current.addEventListener('timeupdate', () => {
                trackRef.current.value = (audioFooterRef.current.currentTime / audioFooterRef.current.duration) * 100;
                elapseRef.current.textContent = buildDuration(audioFooterRef.current.currentTime);
            });
            audioFooterRef.current.addEventListener('pause', () => {
                trackRef.current.value = (audioFooterRef.current.currentTime / audioFooterRef.current.duration) * 100;
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
            audioFooterRef.current.pause();
            setIsPlayingFooter(false);
        } else {
            audioFooterRef.current.play();
            setIsPlayingFooter(true);
        }
    };

    const handleAudioEnded = () => {
        trackRef.current.value = 0;
        setIsPlayingFooter(false);
    };

    useEffect(() => {
        if (audioFooterRef.current) {
            audioFooterRef.current.addEventListener('ended', handleAudioEnded);
        }
        return () => {
            if (audioFooterRef.current) {
                audioFooterRef.current.removeEventListener('ended', handleAudioEnded);
            }
        };
    }, []);

    useEffect(() => {
        displayAudioDuration();
        trackAudioGlobal();

        return () => {
            if (audioFooterRef.current) {
                audioFooterRef.current.removeEventListener('pause', () => {
                    trackRef.current.value = (audioFooterRef.current.currentTime / audioFooterRef.current.duration) * 100;
                });
            }
        };
    }, []);


    // faire un click appel automatisé de la fonction handleButtonPlayFooterClick
    useEffect(() => {
        if (isPlayingFooterLocal) {
            handleButtonPlayFooterClick();
            setIsPlayingFooter(true);
        } else {
            handleButtonPlayFooterClick();
            setIsPlayingFooter(false);
        }
    }, [isPlayingFooterLocal]);





    return (
        <div className={'flex gap-x-4 gap-y-2 justify-between w-[80%] mx-auto ' + className}>
            <div className="flex items-center">
                <button type="button" onClick={handleButtonPlayFooterClick}>
                    {isPlayingFooter ? (
                        <IconPause fill='indigo' className='inline-block !size-8' />
                    ) : (
                        <IconPlay fill='indigo' className='inline-block !size-8' />
                    )}
                    <audio controls className="hidden" ref={audioFooterRef}></audio>
                </button>
            </div>
            <div className="flex-1 flex items-center relative">
                <input type="range" id="trackaudio" min="0" value="0" ref={trackRef} onInput={handleTrackInput}></input>
                <div className="absolute -bottom-2 right-0 text-sm text-gray-700 px-1 py-0.5 font-mono">
                    <span ref={elapseRef} id="elapse">0:00</span> / <span ref={trackTimeRef} id="track-time">0:00</span>
                </div>
                <div className="flex items-center absolute -bottom-3  left-0 text-sm px-1">
                    <button type="button" id="back-10s" className="group !shadow-none relative rounded-full focus:outline-none px-1 lg:px-0" aria-label="Rewind 10 seconds" onClick={handleBack10s}>
                        <IconBack10S />
                    </button>
                    <button type="button" id="next-10s" className="group relative !shadow-none rounded-full focus:outline-none lg:px-0" aria-label="Fast-forward 10 seconds" onClick={handleNext10s}>
                        <IconNext10S />
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <span className="inline-block shadow-lg rounded-lg py-1 px-2 bg-white/60 hover:bg-white-blue">
                    <a ref={audioFooterDownloadRef} download={fileNameDownload} id="downloadFooteraudio" className='font-bold hover:text-indigo-600'>
                        <IconDownload className="icon-play inline-block" fill="indigo" />Download
                    </a>
                </span>
            </div>
        </div>
    );
};

export default AudioFooter;
