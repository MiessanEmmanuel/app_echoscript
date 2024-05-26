import React, { useState } from 'react';
import SettingsVoice from '../SettingsVoice';
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
        const voice = e.target.voice.value;

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
            body: JSON.stringify({ text: texte, voice: voice, stability : stability, similarity_boost: similarity,style:style, use_speaker_boost:speakerBoost })
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
            <div className="font-bold my-5 text-xl">
                <span>Text To Speech</span>
            </div>
            <form onSubmit={handleSubmit} method="POST" id="text-to-speech-form">

                <div className="grid lg:grid-cols-4 lg:gap-x-4 grid-rows-2 gap-x-4 gap-y-4 lg:grid-rows-1 mb-6">
                    <div className='lg:col-span-3'>
                        <select
                            name="voice"
                            id="voiceForm"

                            /* onChange={(e) => setVoice(e.target.value)} */
                            required
                            className="w-full rounded-lg shadow-lg border-ui-1 bg-white/60 focus:ring-0 "
                        >
                            <option value="">Select your voice</option>
                            {voices ? Object.entries(voices).map(([voice, value]) => (
                                <option key={voice} value={value}>
                                    {voice}
                                </option>
                            )) : <option disabled>No voices available</option>}

                        </select>
                    </div>
                    <div className="">
                        <button
                            id="voiceSelect"
                            onClick={handleShowSettings}
                            type='button'
                            className="w-full p-2 rounded font-bold  border-ui-1 bg-gray-400 focus:ring-0"
                        >
                            Settings
                        </button>
                        <SettingsVoice isOpen={isModalOpen} handleClose={handleCloseModal} fixStability={setStability} fixSimilarity={setSimilarity} fixStyle={setStyle} fixSpeakerBoost={setSpeakerBoost} />

                    </div>
                </div>
                <div className="mb-6 relative">
                    <textarea
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        cols="30"
                        rows="10"
                        className="w-full rounded-lg shadow-lg border-ui-1 bg-white/60 focus:ring-0"
                        placeholder="Enter your text"
                    ></textarea>
                    <div className="bottom-3 right-0 h-full flex gap-2 items-center justify-end px-1.5">
                        <p className="text-sm text-light font-normal text-gray-500">
                            <span id="track-word">{text.length}</span> / <span id="limit-char">{/* {character} */}</span>
                        </p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blackblue hover:bg-blackblue/50 w-full text-white px-4 py-2 rounded-lg shadow-lg"
                >
                    Generate
                    <svg
                        className={`inline-block mx-3 ${loading ? 'block' : 'hidden'}`}
                        id="spinner-icon"
                        width="24"
                        height="24"
                        fill="#fff"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                    </svg>
                </button>
            </form>

        </div>

    );
};

export default InputForm;
