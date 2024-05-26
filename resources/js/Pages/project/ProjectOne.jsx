import React, { useState } from 'react';
import Checkbox from "@/Components/Checkbox";
import AudioFooter from '@/Components/pages/AudioFooter';

const ProjectOne = ({ project, chapters }) => {
    if (chapters[0] == null) {
        return "irns";
    }
    const [chapterCurrent, setChapterCurrent] = useState(chapters[0]);



    const [dataAudio, setDataAudio] = useState(null);


    /*
    _LANGUE
    _VOICES
    _STABILITY
    _SIMILARY
    _STYLE
    _SPEAKER_BOOST
    _CHAPTER_TEXT
    _CHAPTER_ID

    */
    const [langue, setLangue] = useState('En');
    const [voiceChapter, setVoiceChapter] = useState(project.default_voice);
    const [stability, setStability] = useState(50);
    const [similarity, setSimilarity] = useState(50);
    const [style, setStyle] = useState(50);
    const [speakerBoost, setSpeakerBoost] = useState(true);


    // Ce que l'utilisateur entre dans la partie editable
    const [newChapterText, setNewChapterText] = useState(chapterCurrent.chapter_text);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



    const handleRegenerate = () => {
        fetch('/project/generate-chapter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                project_id: chapterCurrent.project_id,
                chapter_id: chapterCurrent.id,
                chapter_text: newChapterText,
                langue: langue,
                voice: voiceChapter,
                stability: stability,
                similarity: similarity,
                style: style,
                speakerBoost: speakerBoost
            }),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Unknown error');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setDataAudio(data.audio);
            })
            .catch(error => console.log(error));
    }



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
                        <h2 className='text-3xl'>Chapter {chapterCurrent.chapter_number}: {chapterCurrent.chapter_title}</h2>
                    </div>
                    <div
                        id="editable-content"
                        contentEditable
                        className="border bg-violet-200/60 shadow-lg p-4 h-[400px] max-h-[400px]  rounded-xl"/* overflow-y-scroll */
                        dangerouslySetInnerHTML={{ __html: chapterCurrent.chapter_text }} onInput={(e) => {
                            const content = e.target.innerText;
                            setNewChapterText(content)
                        }}

                    />

                    <div className='my-5 '>
                        <button type='button' className='bg-indigo-900 text-white py-2 px-4 rounded ml-auto shadow-lg' onClick={handleRegenerate}>Regenerate</button>
                    </div>
                </div>
                <div>
                    <div className='my-5 text-bold flex'>
                        <h2 className='text-3xl'>Parameter</h2>
                        <div>
                            <label htmlFor="">Voice:</label>
                            <select name="voice" id="" onChange={(e) => { setVoiceChapter(e.target.value) }}>
                                <option value={project.default_voice}>{project.default_voice}</option>
                            </select>
                        </div>
                    </div>
                    <div className="border bg-violet-200/60 p-4 max-h-[400px] h-[400px] shadow-lg rounded-xl " >
                        <form >
                            <div className='mb-3'>
                                <label htmlFor="language" className='mb-2 block'>Language</label>
                                <select name="language" id="language" className='w-full' onChange={(e) => { setLangue(e.target.value) }} >
                                    <option value="">Select your language</option>
                                    <option value="En">English</option>
                                    <option value="Fr">French</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="stability" className='mb-2 block'>Stability</label>
                                <input type="range" name="stability" id="stability" onChange={(e) => { setStability(e.target.value) }} min="0" max="100" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="similarity" className='mb-2 block'>Similarity</label>
                                <input type="range" name="similarity" id="similarity" onChange={(e) => { setSimilarity(e.target.value) }} min="0" max="100" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="style" className='mb-2 block'>Style</label>
                                <input type="range" name="style" id="style" onChange={(e) => { setStyle(e.target.value) }} min="0" max="100" />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="speaker" className='mb-2 ' >Speaker Boost</label>

                                <Checkbox name="speaker" id="speaker" checked={speakerBoost} onChange={(e) => { setSpeakerBoost(e.target.checked) }} />
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            <div className='p-4' id='section'>
                <div className='grid grid-cols-3'>
                    <div className='col-span-2'>
                    <AudioFooter data={dataAudio} srcLinkAudio={chapterCurrent.chapter_audio} />
                    </div>
                    <div>

                        <div className="border bg-violet-200/60 p-4 shadow-lg rounded-xl " >

                            <button className='block border text-center w-full bg-yellow-300 p-4 my-4'>
                                Introduction
                            </button>
                            {
                                chapters.map((chapter, index) => (
                                    <button key={chapter.id} onClick={() => {
                                        setChapterCurrent(chapter)
                                    }} className={` ${chapter== chapterCurrent ? 'bg-orange-600': 'bg-yellow-300'} block border text-center w-full bg-yellow-300 p-4 my-4`}>
                                        Chapter  {chapter.chapter_number}
                                    </button>
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
};

export default ProjectOne;

