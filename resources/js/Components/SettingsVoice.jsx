
import React, { useState } from 'react';

const SettingsVoice = ({ isOpen, handleClose, fixStability, fixSimilarity, fixStyle, fixSpeakerBoost }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <form>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 border-ui-1">
                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Stability</label>
                        <input type="range" className="w-full" min="0" max="100" onChange={(e) => { fixStability(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Similarity</label>
                        <input type="range" className="w-full" onChange={(e) => { fixSimilarity(e.target.value) }} min="0" max="100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Style Exaggeration</label>
                        <input type="range" className="w-full" min="0" max="100" onChange={(e) => { fixStyle(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 flex items-center">
                            <span className="mr-2">Speaker Boost</span>
                            <input type="checkbox" checked onChange={(e) => { fixSpeakerBoost(e.target.value) }} />
                        </label>
                    </div>
                    <div className="flex justify-between items-center gap-x-6">
                        <button
                            type='reset'
                            className="w-full bg-gray-500 hover:bg-blackblue/60 text-white px-4 py-2 rounded"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full bg-gray-500 hover:bg-blackblue/60 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default SettingsVoice;
