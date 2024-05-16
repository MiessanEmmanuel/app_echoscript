import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import InputForm from '@/Components/pages/InputForm';
import Header from '@/Components/pages/Header';
import Navigation from '@/Layouts/Navigation';
import AudioFooter from '@/Components/pages/AudioFooter';
import InputFormTest from '@/Components/pages/InputFormSpeech';
import InputFormSpeech from '@/Components/pages/InputFormSpeech';

export default function Welcome({ auth, laravelVersion, phpVersion, voices }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    const [data, setData] = useState(null);

    const handleFormSubmit = (responseData) => {
        setData(responseData);
    };

    const [currentComponent, setCurrentComponent] = useState('text-to-speech');

    const handleButtonClickToSpeech = () => {
        setCurrentComponent('speech-to-speech');
    };
    const handleButtonClickToText = () => {
        setCurrentComponent('text-to-speech');
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'text-to-speech':
                return <InputForm voices={voices} onSubmit={handleFormSubmit} />;
            case 'speech-to-speech':
                return <InputFormSpeech voices={voices} onSubmit={handleFormSubmit} />;
            default:
                return null;
        }
    };


    return (
        <>
            <Head title="Welcome" />
            <Navigation >
                <div className="lg:pl-[4em] pl-0 ">
                    <Header />
                    <div className="col-span-2 pt-8 flex flex-col justify-between">
                        {/*  {{-- ********************** Title Inputs *********************** --}} */}
                        <div
                            className="w-[80%] backdrop-blur-xl border-dropz-[30] bg-white/60 mx-auto border-ui rounded-lg px-6 py-4 grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0 lg:grid-rows-1  grid-rows-2 gap-y-4 gap-x-0  ">
                            <button onClick={handleButtonClickToText} className={`border-ui rounded-lg px-6 py-2  shadow-lg text-center font-semibold relative ${currentComponent == 'text-to-speech' ? 'bg-white-blue' : 'hover:bg-white-blue'}`}>
                                <div className="absolute -left-2 -top-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={` icon-check inline-block w-[1.2em] h-[1.2em] ${currentComponent == 'text-to-speech' ? 'block' : 'hidden'} `}
                                        viewBox="0 0 53.18 53.18">
                                        <defs>
                                            <style>
                                                {`
                                                    .icn-check {
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
                                                <circle className="icn-check" cx="26.59" cy="26.59" r="26.59" />
                                                <path className="cls-2"
                                                    d="M10,27.56l8.21,8.22,5.05,5.06,5.06-5.06-5.06-5.05L15,22.52a3.33,3.33,0,0,0-4.72,0l-.32.32A3.33,3.33,0,0,0,10,27.56Z" />
                                                <path className="cls-2"
                                                    d="M18.21,35.78l5.05,5.06,5.06-5.06L44.13,20a3.58,3.58,0,0,0,0-5,3.56,3.56,0,0,0-5.05,0L23.26,30.73Z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span>Text To Speech</span>
                            </button>
                            <button onClick={handleButtonClickToSpeech} className={`border-ui rounded-lg px-6 py-2  shadow-lg text-center font-semibold relative ${currentComponent == 'speech-to-speech' ? 'bg-white-blue' : 'hover:bg-white-blue'}`}>

                                <span>Speech To Speech</span>

                                <div className="absolute -left-2 -top-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={` icon-check inline-block w-[1.2em] h-[1.2em] ${currentComponent == 'speech-to-speech' ? 'block' : 'hidden'} `}
                                        viewBox="0 0 53.18 53.18">
                                        <defs>
                                            <style>
                                                {`
                                                    .icn-check {
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
                                                <circle className="icn-check" cx="26.59" cy="26.59" r="26.59" />
                                                <path className="cls-2"
                                                    d="M10,27.56l8.21,8.22,5.05,5.06,5.06-5.06-5.06-5.05L15,22.52a3.33,3.33,0,0,0-4.72,0l-.32.32A3.33,3.33,0,0,0,10,27.56Z" />
                                                <path className="cls-2"
                                                    d="M18.21,35.78l5.05,5.06,5.06-5.06L44.13,20a3.58,3.58,0,0,0,0-5,3.56,3.56,0,0,0-5.05,0L23.26,30.73Z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </button>

                        </div>
                        {/* speech-to-speech ou text-to-speech */}
                        {renderComponent()}

                        {/* {{-- ************* Read Vocal Footer ************* --}} */}
                        <div id="" className="border-ui-top-2 bg-white/60 px-6 py-4  backdrop-blur-xl border-dropz-[30]  mt-6 w-full ">
                            <AudioFooter data={data} />
                        </div>
                    </div>
                </div>
            </Navigation>


        </>
    );
}
