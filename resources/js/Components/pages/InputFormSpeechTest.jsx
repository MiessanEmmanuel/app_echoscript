
import React, { useState } from 'react';
import SettingsVoice from '../SettingsVoice';

function InputFormSpeechTest({ voices, onSubmit }) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const [selectedVoice, setSelectedVoice] = useState('Adam');
    const [audioFile, setAudioFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stability, setStability] = useState(0.5);
    const [similarity, setSimilarity] = useState(0.5);
    const [style, setstyle] = useState(0.5);
    const [speakerBoost, setSpeakerBoost] = useState(true);

    // Fixer la voix
    const handleVoiceChange = (e) => {
        setSelectedVoice(e.target.value);
    };
    // Fixer la l'audio
    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };
    //Ouvrir le Popup
    const handleShowSettings = () => {
        setIsModalOpen(true);
    };
    // Fermer le popup
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };




    // Valider le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(audioFile);
        /**
         * Fait une requête POST vers l'endpoint /text-to-speech avec le texte saisi et la voix sélectionnée.
        */
        const formData = new FormData();
        formData.append('audio', audioFile);
        formData.append('voice', selectedVoice);
        formData.append('stability', stability);
        formData.append('similarity_boost', similarity);
        formData.append('style', style);
        formData.append('use_speaker_boost', speakerBoost);

        fetch('/speech-to-speech', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: formData,
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
    };



    return (
        <div className="flex items-center justify-center py-16 ">
            <form
                className="bg-white/60 p-8 rounded-xl  shadow-lg max-w-3xl w-full   bg-gray-100/50"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">SPEECH TO SPEECH</h2>
                <div className="mb-4">
                    <label htmlFor="voiceSelect" className="block text-gray-700 mb-2">Voice</label>

                    <div className="flex justify-between items-center gap-x-6">

                        <select
                            id="voiceSelect"
                            value={selectedVoice}
                            onChange={handleVoiceChange}
                            required
                            className="w-2/3 p-2 rounded   bg-white/60 focus:ring-0"
                        >
                            <option value="">Select your voice</option>
                            {voices ? Object.entries(voices).map(([voice, value]) => (
                                <option key={voice} value={value}>
                                    {voice}
                                </option>
                            )) : <option disabled>No voices available</option>}
                        </select>

                        <button
                            id="voiceSelect"
                            onClick={handleShowSettings}
                            type='button'
                            className="w-1/3 p-2 rounded font-bold   bg-gray-400 focus:ring-0"
                        >
                            Settings
                        </button>
                        <SettingsVoice isOpen={isModalOpen} handleClose={handleCloseModal} fixStability={setStability} fixSimilarity={setSimilarity} setstyle={setstyle} fixSpeakerBoost={setSpeakerBoost} />
                    </div>

                </div>

                <div className="mb-4 py-8 flex justify-center items-center ">
                    {/* <label htmlFor="audioFile" className="block text-gray-700 mb-2">Audio File</label> */}
                    <input
                        type="file"
                        id="audioFile"
                        accept="audio/*"
                        onChange={handleFileChange}
                        required
                        className=" p-2 border border-gray-300 rounded w-1/3 mx-auto"
                    />
                </div>
                <div className="flex justify-around mb-4">
                    <button
                        type="button"
                        className="bg-blackblue w-1/3 hover:bg-blackblue/50 text-white px-4 py-2 rounded-lg shadow-lg"
                        onClick={() => document.getElementById('audioFile').click()}
                    >
                        Upload audio
                    </button>
                    <button
                        type="button"
                        className="bg-blackblue w-1/3  hover:bg-blackblue/50 text-white px-4 py-2 rounded-lg shadow-lg"
                        onClick={() => console.log('Record audio clicked')}
                    >
                        Record audio
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-500 hover:bg-blackblue/60 text-white px-4 py-2 rounded"
                >
                    Generate speech
                </button>
            </form>
        </div>
    );
}

export default InputFormSpeechTest;
