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
import SettingsVoice from '@/Components/SettingsVoice';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectFormUi from '@/Components/forms/SelectFormUi';



export default function TestVoice({ voices, project }) {

    const [data, setData] = useState(null);

    const handleFormSubmit = (responseData) => {
        setData(responseData);
    };

    const [selectedVoice, setSelectedVoice] = useState('Voices...');

    // Pour l'input form

    const [voice, setVoice] = useState('');



    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stability, setStability] = useState(0.5);
    const [similarity, setSimilarity] = useState(0.5);
    const [style, setStyle] = useState(0.5);
    const [speakerBoost, setSpeakerBoost] = useState(true);

 console.log(selectedVoice,
    text,
    stability,
    similarity,
    style,
    speakerBoost);
    //Ouvrir le Popup
    const handleShowSettings = () => {
        setIsModalOpen(true);
    };
    // Fermer le popup
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    // Récupérer le jeton CSRF depuis le serveur
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


    /**
     * Fonction asynchrone pour suspendre l'exécution pendant un temps spécifié.
     *
     * @param {number} ms - Le temps en millisecondes pour suspendre l'exécution.
     */
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Gère la soumission du formulaire en faisant une requête POST vers l'endpoint /text-to-speech.
     *
     * @param {object} e - L'objet événement déclenché par la soumission du formulaire.
     */
    const handleSubmit = (e) => {
        e.preventDefault();


        /**
        * Récupère les valeurs du texte saisi et de la voix sélectionnée ainsi que les autres paramètre selectioné dans le formulaire.
        */
        const texte = e.target.text.value;
        const voice = selectedVoice;

        /**
         * Affiche l'icône de chargement.
         */
        setLoading(true);

        /**
         * Fait une requête POST vers l'endpoint /text-to-speech avec le texte saisi et la voix sélectionnée.
         */
        fetch('/text-to-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
            },
            body: JSON.stringify({ text: texte, voice: voice, stability: stability, similarity_boost: similarity, style: style, use_speaker_boost: speakerBoost })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                handleFormSubmit(data.audio);
                /* // Définir la source audio avec les données base64
                audioFooter.src = 'data:audio/mpeg;base64,' + data.audio;

                // Jouer l'audio
                audioFooter.play(); */
            })
            .catch(error => console.error('Erreur:', error));

        setLoading(false);
    }


    return (
        <>
            <Head title="Test Voice" />
            <Navigation >
                <div className="lg:pl-[4em] pl-0 ">
                    {/*  <Header name='Echoscript' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nisi dicta autem eveniet modi doloremque
                    dolorem delectus, amet illum vero id doloribus aliquam.' button='oui' >
                        <Link href='/project' className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'> Go To Project</Link>
                    </Header> */}
                    <div className="col-span-2 pt-8 flex flex-col justify-between  relative">


                        {/* text-to-speech */}
                        <div className="my-6 w-[80%] mx-auto">
                            {/* <div className="font-bold my-5 text-xl">
                <span>Text To Speech</span>
            </div> */}
                            <form onSubmit={handleSubmit} method="POST" id="text-to-speech-form">
                                <div className="mb-6 relative">
                                    <textarea
                                        name="text"
                                        onChange={(e) => setText(e.target.value)}
                                        cols="30"
                                        rows="20"
                                        className="w-full rounded-xl  pb-9 shadow-xl  block focus:ring-0 bg-white/80 px-6 py-4  backdrop-blur-xl text-gray-800 font-bold"
                                        placeholder="Enter your text"

                                    >
                                        Thank you for...
                                    </textarea>
                                    <div className=" flex items-center space-x-8 px-2 pb-2  m-4 ">
                                        <div className='flex-1 '>

                                            <SelectFormUi voices={voices} setSelectedVoice={setSelectedVoice} className='!rounded-xl ' />
                                        </div>
                                        <div className="flex-1" >
                                            {/* <button
                                                        id="voiceSelect"
                                                        onClick={handleShowSettings}
                                                        type='button'
                                                        className="w-full p-2  font-bold   bg-yellow-600 shadow-xl focus:ring-0"
                                                    >
                                                        Settings
                                                    </button> */}
                                            <button id="settings" onClick={handleShowSettings} type='button' className="w-full bg-indigo-200 text-indigo-900 inline-flex items-center px-4 !py-5  border border-transparent  font-bold text-xs  uppercase tracking-widest  focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 opacity-3  !m-0 border font-bold  shadow-xl focus:ring-0 hover:ring-0 !block !text-md"><span className='block text-center'>Settings</span></button>
                                            <SettingsVoice isOpen={isModalOpen} handleClose={handleCloseModal} fixStability={setStability} fixSimilarity={setSimilarity} fixStyle={setStyle} fixSpeakerBoost={setSpeakerBoost} />

                                        </div>
                                    </div>
                                    <div className="absolute !bottom-0 right-0  h-full flex gap-2 items-end justify-end px-1.5">
                                        <p className="text-sm text-light font-normal text-gray-500 p-5">
                                            <span id="track-word">{text.length}</span> / <span id="limit-char">{/* {character} */}</span>
                                        </p>
                                    </div>
                                </div>

                                <button className=' px-4 !py-3 w-full mx-auto py-3 !bg-indigo-800 text-slate-300 ' type="submit">
                                    <span className='block  mx-auto'>
                                        Generate Voices Training  <svg
                                            className={`inline-block mx-3 ${loading ? 'block' : 'hidden'}`}
                                            id="spinner-icon"
                                            width="24"
                                            height="24"
                                            fill="#fff"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >

                                        </svg>
                                    </span>
                                </button>
                            </form>

                        </div>
                        <div className='lg:max-w-3xl w-full px-6 my-6 space-x-3 flex justify-between mx-auto'>
                            <Link href={`/project/${project.id}`} className=' text-center flex-1 px-4 !py-3 w-full mx-auto py-3 text-slate-300 !shadow-none ' type="submit">
                                Skip Now
                            </Link>
                            <button className='flex-1 px-4 !py-3 w-full mx-auto py-3 !border-2 !border-indigo-800 hover:bg-indigo-800 transition-ease hover:text-white  text-slate-300  !shadow-none' type="submit">
                                Continue
                            </button>
                        </div>

                        {/* {{-- ************* Read Vocal Footer ************* --}} */}
                        <div id="" className="-top-2 bg-white/60 px-6 py-4  backdrop-blur-xl border-drop  mt-6 w-full ">
                            <AudioFooter data={data} />
                        </div>
                    </div>
                </div>
            </Navigation>


        </>
    );
}
