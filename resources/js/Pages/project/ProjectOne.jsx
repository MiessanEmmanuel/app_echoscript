import React, { useState } from 'react';
import Checkbox from "@/Components/Checkbox";
import AudioFooter from '@/Components/pages/AudioFooter';
import '/resources/css/setting.css';
import IconPlay from '@/Components/Icons/IconPlay';
import Pagination from '@/Components/pages/Pagination';
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Head } from '@inertiajs/react';
import IconBackHistory from '@/Components/Icons/IconBackHistory';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const ProjectOne = ({ project, chapters }) => {
    if (chapters[0] == null) {
        return "irns";
    }
    const [chapterCurrent, setChapterCurrent] = useState(chapters[0]);
    const [dataAudio, setDataAudio] = useState(null);
    const [pageChapter, setPageChapter] = useState(1);
    const [itemsPerPageHistory, setItemsPerPageHistory] = useState(3);
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
    // Pagination
    const startIndex = (pageChapter - 1) * itemsPerPageHistory;
    const endIndex = startIndex + itemsPerPageHistory;
    const displayedChapters = chapters.slice(startIndex, endIndex);
    const totalPage = Math.ceil(chapters.length / itemsPerPageHistory);
    const handlePageChangeNext = () => {
        if (pageChapter >= totalPage) {
            setPageChapter(pageChapter);
        } else {
            setPageChapter(pageChapter + 1);
        }
    };
    const handlePageChangeBack = () => {
        if (pageChapter <= 1) {
            setPageChapter(pageChapter);
        } else {
            setPageChapter(pageChapter - 1);

        }
    };



    const handlePageClick = (pageNumber) => {
        setPageChapter(pageNumber);
    };

    //DropDown seetings
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    return (

        <div className="flex flex-col justify-between min-h-screen" id='projectOne'>
            <Head title={'ProjectOne'} />
            <header>
                <div className='flex items-center space-x-4'>
                    <IconBackHistory />
                    <h2 className="text-2xl font-bold  bg-gradient-to-r from-orange-800 via-indigo-200  to-violet-900 text-transparent bg-clip-text uppercase text-center">{project.title}</h2>
                </div>

                <nav className='flex justify-between'>
                    <button className="!bg-yellow-900 p-1 text-indigo-600 text-sm rounded block"><IconPlay fill='yellow' /></button>
                    {["H1", "H2", "H3", "H4", "H5", "H6"].map((tag) => (
                        <button
                            key={tag}
                            className="bg-indigo-100 p-1 text-indigo-600  hidden lg:block  text-sm rounded "
                            onClick={() => applyHeaderTag(tag.toLowerCase())}
                        >
                            {tag}
                        </button>
                    ))}
                    <div>
                        <button className='!px-4 lg:!ml-8 ml-3  !bg-blue-900'> Download Project</button>
                    </div>
                </nav>

            </header>

            <main>
                <section>
                    <div className='my-3'>
                        <div className='flex items-center justify-between '>
                            <h2 className='text-white font-bold'>Chapter {chapterCurrent.chapter_number}: {chapterCurrent.chapter_title}</h2>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-gray-50">
                                    Chapter options
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />{/*
                                        <ChevronUpIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                    </Menu.Button>
                                </div>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Edit
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a

                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Duplicate
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>

                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Delete
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                    <div
                        id="editable-content"
                        contentEditable
                        className="p-4 h-[400px] max-h-[400px]  outline-none bg-white/80 backdrop-blur-xl"
                        dangerouslySetInnerHTML={{ __html: chapterCurrent.chapter_text }} onInput={(e) => {
                            const content = e.target.innerText;
                            setNewChapterText(content)
                        }}

                    />
                    <div className='my-5 '>
                        <button type='button' className=' bg-blue-800/60 hover:bg-blue-900 backdrop-blur-xl text-white py-3 px-8 rounded  shadow-lg' onClick={handleRegenerate}>Regenerate</button>
                    </div>
                </section>

                <aside>
                    <div>
                        <select name="language" id="language" className='w-full' onChange={(e) => { setLangue(e.target.value) }} >
                            <option value="">Select your language</option>
                            <option value="En">English</option>
                            <option value="Fr">French</option>
                        </select>
                        <div className=''>
                            <label htmlFor="stability" className=' block'>Stability</label>
                            <input type="range" name="stability" id="stability" onChange={(e) => { setStability(e.target.value) }} min="0" max="100" />
                        </div>
                        <div className=''>
                            <label htmlFor="similarity" className=' block'>Similarity</label>
                            <input type="range" name="similarity" id="similarity" onChange={(e) => { setSimilarity(e.target.value) }} min="0" max="100" />
                        </div>
                        <div className=''>
                            <label htmlFor="style" className=' block'>Style</label>
                            <input type="range" name="style" id="style" onChange={(e) => { setStyle(e.target.value) }} min="0" max="100" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="speaker" className='pr-3' >Speaker Boost</label>
                            <Checkbox name="speaker" id="speaker" checked={speakerBoost} onChange={(e) => { setSpeakerBoost(e.target.checked) }} />
                        </div>
                    </div>
                    <div className="border bg-violet-200/60 p-4 shadow-lg  " >

                        <button className='block border text-center w-full bg-indigo-300 p-4 my-4'>
                            Introduction
                        </button>
                        {
                            displayedChapters.slice(0, 3).map((chapter, index) => (
                                <button key={chapter.id} onClick={() => {
                                    setChapterCurrent(chapter)
                                }} className={` ${chapter == chapterCurrent ? '!bg-indigo-600 text-slate-300' : 'bg-indigo-300'} block border text-center w-full  p-4 my-4`}>
                                    Chapter  {chapter.chapter_number}
                                </button>
                            ))

                        }
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm  " aria-label="Pagination">
                            <a
                                href="#"
                                onClick={handlePageChangeBack}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}


                            {// nombre de pagination en fontion du total page de la page
                                Array.from({ length: totalPage }, (_, index) => index + 1).map((pageIndex) => (
                                    <a
                                        href="#"
                                        onClick={() => handlePageClick(pageIndex)}
                                        aria-current="page"
                                        className={`${pageIndex == pageChapter ? 'bg-indigo-700' : 'bg-indigo-200 '} relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        {pageIndex}
                                    </a>
                                ))}


                            <a
                                href="#"
                                onClick={handlePageChangeNext}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>

                </aside>
            </main>

            <div className=''>

                <AudioFooter data={dataAudio} srcLinkAudio={chapterCurrent.chapter_audio} className='bg-white/70 !mx-0 !w-full p-4 rounded-t-md' />

            </div>
            {/* <div className="flex justify-between items-center space-x-2  mb-4 bg-indigo-700 p-4">
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
                        className="border bg-violet-200/60 shadow-lg p-4 h-[400px] max-h-[400px]  rounded-xl"
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
                                    }} className={` ${chapter == chapterCurrent ? 'bg-orange-600' : 'bg-yellow-300'} block border text-center w-full bg-yellow-300 p-4 my-4`}>
                                        Chapter  {chapter.chapter_number}
                                    </button>
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default ProjectOne;

