import React, { useState } from 'react';
import Checkbox from "@/Components/Checkbox";

const ProjectOne = ({ project }) => {
    const [content, setContent] = useState("Enter your chapter");

    const applyHeaderTag = (tag) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const newNode = document.createElement(tag);
        newNode.textContent = selectedText;

        range.deleteContents();
        range.insertNode(newNode);

        // Refresh content state
        setContent(document.getElementById("editable-content").innerHTML);
    };

    return (
        <div className="">
            <div className="flex justify-between items-center space-x-2  mb-4 bg-indigo-700 p-4">
                <div>
                    <h2 className="text-2xl font-bold  bg-gradient-to-r from-yellow-800 via-white  to-blue-500 text-transparent bg-clip-text uppercase text-center">{project.title}</h2>

                </div>
                <div className="flex justify-between gap-x-2 items-center">
                    <button className="bg-yellow-400 p-2 rounded block">▶️</button>
                    <button className="bg-gray-300 p-2 rounded block">↩️</button>
                    <button className="bg-gray-300 p-2 rounded block">↪️</button>
                    <button className="bg-gray-300 p-2 rounded block">🔄</button>
                    {["H1", "H2", "H3", "H4", "H5", "H6"].map((tag) => (
                        <button
                            key={tag}
                            className="bg-violet-300 p-2 rounded block"
                            onClick={() => applyHeaderTag(tag.toLowerCase())}
                        >
                            {tag}
                        </button>
                    ))}

                </div>
                <div>
                    <button className="bg-indigo-900 text-white py-2 px-3 rounded ml-auto">Convert</button>
                </div>

            </div>
            <div className="grid grid-cols-3 px-4 gap-x-5">
                <div className=' col-span-2'>
                    <div className='my-5 text-bold'>
                        <h2 className='text-3xl'>Chapitre 1</h2>
                    </div>
                    <div
                        id="editable-content "
                        contentEditable
                        className="border bg-violet-200/60 shadow-lg p-4 h-[400px] max-h-[400px]  rounded-xl"/* overflow-y-scroll */
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    <div className='my-5 '>
                        <button type='button' className='bg-indigo-900 text-white py-2 px-4 rounded ml-auto shadow-lg' >Regenerate</button>
                    </div>
                </div>
                <div>
                    <div className='my-5 text-bold flex'>
                        <h2 className='text-3xl'>Parameter</h2>
                        <div>
                            <label htmlFor="">Voice:</label>
                            <select name="voice" id="">
                                <option value="">{project.default_voice}</option>

                            </select>
                        </div>
                    </div>
                    <div className="border bg-violet-200/60 p-4 max-h-[400px] h-[400px] shadow-lg rounded-xl " >
                        <form >
                            <div className='mb-3'>
                                <label htmlFor="language" className='mb-2 block'>Language</label>
                                <select name="language" id="language" className='w-full'>
                                    <option value="">Select your language</option>
                                    <option value="En">{project.language}</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="stability" className='mb-2 block'>Stability</label>
                                <input type="range" name="stability" id="stability" min="0" max="100" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="similarity" className='mb-2 block'>Similarity</label>
                                <input type="range" name="similarity" id="similarity" min="0" max="100" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="style" className='mb-2 block'>Style</label>
                                <input type="range" name="style" id="style" min="0" max="100" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="speaker" className='mb-2 '>Speaker Boost</label>

                                <Checkbox name="speaker" id="speaker" />
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            <div className='p-4' id='section'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2'>

                    </div>
                    <div>

                        <div className="border bg-violet-200/60 p-4 shadow-lg rounded-xl " >

                            <button className='block border text-center w-full bg-yellow-300 p-4 my-4'>
                                Introduction
                            </button>
                            <button className='block border text-center w-full bg-yellow-300/30 p-4   my-4'>
                                Chapitre 1
                            </button>
                            <button className='block border text-center w-full bg-yellow-300/30 p-4  my-4'>
                                Chapitre 2
                            </button>
                            <button className='block border text-center w-full bg-yellow-300/30 p-4  my-4'>
                                Chapitre 3
                            </button>



                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default ProjectOne;

