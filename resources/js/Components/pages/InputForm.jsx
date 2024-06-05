import React, { useState } from 'react';
import SettingsVoice from '../SettingsVoice';
import PrimaryButton from '../PrimaryButton';
import SelectFormUi from '@/Components/forms/SelectFormUi'
/**
 * Composant InputForm qui prend en paramètres voices, character et onSubmit.
 *
 * @param {object} voices - Un objet contenant les options de voix.
 * @param {number} character - Le nombre maximum de caractères autorisés dans la zone de texte.
 * @param {function} onSubmit - Une fonction de callback pour gérer la soumission du formulaire.
 */
const InputForm = ({ voices, onSubmit }) => {
    /**
    * Variable d'état pour stocker les  paramètre du formulaire.
    */
    const [voice, setVoice] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('Voices...');


    const [format, setFormat] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stability, setStability] = useState(0.5);
    const [similarity, setSimilarity] = useState(0.5);
    const [style, setStyle] = useState(0.5);
    const [speakerBoost, setSpeakerBoost] = useState(true);


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
                onSubmit(data.audio);
                /* // Définir la source audio avec les données base64
                audioFooter.src = 'data:audio/mpeg;base64,' + data.audio;

                // Jouer l'audio
                audioFooter.play(); */
            })
            .catch(error => console.error('Erreur:', error));

        setLoading(false);
    }

    // Récupérer le jeton CSRF lors du montage du composant
    /*  React.useEffect(() => {
         fetchCsrfToken();
     }, []); */
    return (
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

                    </textarea>
                    <div className=" absolute inset-x-0 bottom-0 rounded-bl-xl px-2 pb-2 rounded-br-xl  flex items-center  lg:gap-x-4 grid-rows-2 gap-x-4  lg:grid-rows-1 ">
                        <div className=''>
                            {/* <select
                                name="voice"
                                id="voiceForm"

                                onChange={(e) => setVoice(e.target.value)}
                                required
                                className=" shadow-lg rounded-bl-xl focus:ring-0 bg-transparent px-6 py-4  backdrop-blur-xl "
                            >
                                <option value="">Select your voice</option>
                                {voices ? Object.entries(voices).map(([voice, value]) => (
                                    <option key={voice} value={value}>
                                        {voice}
                                    </option>
                                )) : <option disabled>No voices available</option>}

                            </select> */}
                            <SelectFormUi voices={voices}  setSelectedVoice={setSelectedVoice} />
                        </div>
                        <div className="" >
                            {/* <button
                                id="voiceSelect"
                                onClick={handleShowSettings}
                                type='button'
                                className="w-full p-2  font-bold   bg-yellow-600 shadow-xl focus:ring-0"
                            >
                                Settings
                            </button> */}
                            <button id="voiceSelect" onClick={handleShowSettings} type='button'  className=" bg-degrate-ui inline-flex items-center px-4 py-2  border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest  focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 opacity-3 !rounded-3xl !py-4 !m-0 border font-bold  shadow-xl focus:ring-0 hover:ring-0 !block !text-md"><span className='block text-center'>Settings</span></button>
                            <SettingsVoice isOpen={isModalOpen} handleClose={handleCloseModal} fixStability={setStability} fixSimilarity={setSimilarity} fixStyle={setStyle} fixSpeakerBoost={setSpeakerBoost} />

                        </div>
                    </div>
                    <div className="absolute !bottom-0 right-0  h-full flex gap-2 items-end justify-end px-1.5">
                        <p className="text-sm text-light font-normal text-gray-500 p-5">
                            <span id="track-word">{text.length}</span> / <span id="limit-char">{/* {character} */}</span>
                        </p>
                    </div>
                </div>

                 <PrimaryButton className='w-full mx-auto py-3 !bg-gray-600'  type="submit">
                    <span className='block  mx-auto'>
                    Generate <svg
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
                   </PrimaryButton>
                {/* <button
                    type="submit"
                    className="bg-blackblue hover:bg-blackblue/50 w-full text-white px-4 py-2 rounded-xl shadow-lg"
                >
                    Generate

                </button> */}
            </form>

        </div>

    );
};

export default InputForm;
