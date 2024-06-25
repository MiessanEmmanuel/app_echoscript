
import React, { useRef, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import Checkbox from './Checkbox';
import SecondaryButton from './SecondaryButton';
import IconClose from './Icons/IconClose';

const SettingsVoice = ({ isOpen, handleClose, fixStability, fixSimilarity, fixStyle, fixSpeakerBoost,  stability, similarity, style, speakerBoost, }) => {
    if (!isOpen) return null;
    const refReset = useRef(null);

  const handleReset = ()=>{
    fixStability(0);
    fixSimilarity(0);
    fixStyle(0);
    fixSpeakerBoost(0);

  }
    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <form>
                <div className="bg-violet-200 p-6 rounded-lg shadow-lg w-96 relative">
                    <button type='button' onClick={handleClose} className='absolute top-4 right-5 !shadow-none transform-none rounded-none'>
                        <IconClose className='' fill='white'   />
                    </button>

                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Stability</label>
                        <input type="range" className="w-full" min="0" value={stability} max="100" onChange={(e) => { fixStability(e.target.value) }}  />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Similarity</label>
                        <input type="range" className="w-full" onChange={(e) => { fixSimilarity(e.target.value) }} min="0" value={similarity} max="100" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Style Exaggeration</label>
                        <input type="range" className="w-full" min="0" value={style} max="100" onChange={(e) => { fixStyle(e.target.value) }} />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 flex items-center">
                            <span className="mr-2">Speaker Boost</span>
                            <Checkbox checked value={speakerBoost} onChange={(e) => { fixSpeakerBoost(e.target.value) }} />
                        </label>
                    </div>
                    <div className="flex justify-between items-center gap-x-6">

                        <button type='reset' onClick={handleReset} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 w-full !bg-white/80  py-3 hover:bg-blackblue/60 text-gray-700 px-4 py-2 rounded">
                            <span className='block  mx-auto'>
                                Reset
                            </span>
                        </button>

                        <PrimaryButton className='w-full mx-auto py-3 !bg-gray-600' type="submit" onClick={handleClose}>
                            <span className='block  mx-auto'>
                                Update
                            </span>
                        </PrimaryButton>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default SettingsVoice;
