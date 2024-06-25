import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import InputForm from '@/Components/pages/InputForm';
import Header from '@/Components/pages/Header';
import Navigation from '@/Layouts/Navigation';
import AudioFooter from '@/Components/pages/AudioFooter';
import InputFormTest from '@/Components/pages/InputFormSpeech';
import InputFormSpeech from '@/Components/pages/InputFormSpeech';
import InputFormSpeechTest from '@/Components/pages/InputFormSpeechTest';
import AnimateWriteText from '@/Components/text/AnimateWriteText';
import IconCheck from '@/Components/Icons/IconCheck';


export default function ConfigVoiceParameter({ auth, laravelVersion, phpVersion, voices, project }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    const [data, setData] = useState(null);

    const [validatedUpdatedSettingsVoices, setValidatedUpdatedSettingsVoices] = useState(false);

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

    const handleUpdateVoicesSettings = () =>{
        setValidatedUpdatedSettingsVoices(true)
    }

    const renderComponent = () => {
        switch (currentComponent) {
            case 'text-to-speech':
                return <InputForm voices={voices} onSubmit={handleFormSubmit} validatedUpdatedSettingsVoices = {validatedUpdatedSettingsVoices} />;
            case 'speech-to-speech':
                {/* return <InputFormSpeechTest voices={voices} onSubmit={handleFormSubmit} /> */ }
                return <InputForm voices={voices} onSubmit={handleFormSubmit} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Config-voice" />
            <Navigation >
                <div className="lg:pl-[4em] pl-0 ">

                    <div className="col-span-2 pt-8 flex flex-col justify-between  relative">
                        {/*  {{-- ********************** Title Inputs *********************** --}} */}
                        {/* <AnimateWriteText text="Echoscript" /> */}
                        {/* <div
                            className="w-[80%] bg-light-indigo mx-auto  rounded-xl px-6 py-4 grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-0 lg:grid-rows-1  grid-rows-2 gap-y-4 gap-x-0  ">
                            <button onClick={handleButtonClickToText} className={` rounded-xl px-6 py-2  shadow-lg text-center font-semibold relative ${currentComponent == 'text-to-speech' ? 'bg-slate-100' : 'hover:bg-white'}`}>
                                <div className="absolute -left-2 -top-2">
                                    <IconCheck fill='indigo' className={`icon-check !size-7  inline-block w-[1.2em] h-[1.2em] ${currentComponent == 'text-to-speech' ? 'block' : 'hidden'} `} />

                                </div>
                                <span>Text To Speech</span>
                            </button>
                            <button onClick={handleButtonClickToSpeech} className={` rounded-xl px-6 py-2  shadow-lg text-center font-semibold relative ${currentComponent == 'speech-to-speech' ? 'bg-slate-100' : 'hover:bg-white'}`}>
                                <span>Speech To Speech</span>
                                <div className="absolute -left-2 -top-2">
                                    <IconCheck fill='indigo' className={` icon-check  !size-7  inline-block w-[1.2em] h-[1.2em] ${currentComponent == 'speech-to-speech' ? 'block' : 'hidden'} `} />
                                </div>
                            </button>

                        </div> */}
                        {/* speech-to-speech ou text-to-speech */}
                        {renderComponent()}
                        <div className='w-[60%] mx-auto mt-6 flex  justify-around items-center'>
                            <button type="submit" className=' bg-blue-700 hover:bg-blue-900 !shadow-none text-white px-6 w-1/2' onClick={handleUpdateVoicesSettings}>Submit</button>
                            <Link href={`project/${project.id}`} className='text-white hover:text-blue-800 font-bold'>Continue</Link>
                        </div>
                        {/* {{-- ************* Read Vocal Footer ************* --}} */}
                        <div id="" className="bg-slate-100/60 px-6 py-4 backdrop-blur-xl border-drop  mt-6 w-3/4 mx-auto rounded-t-xl ">
                            <AudioFooter data={data} className='!w-full' />
                        </div>
                    </div>

                </div>
            </Navigation>


        </>
    );
}
