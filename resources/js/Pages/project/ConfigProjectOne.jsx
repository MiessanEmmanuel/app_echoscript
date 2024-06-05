import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';
import Header from '@/Components/pages/Header';
import CreateProject from '@/Components/pages/CreateProject';
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from '@/Components/PrimaryButton';
import IconDelete from '@/Components/Icons/IconDelete';
/* import '/resources/css/style.css';*/
/* import '/resources/css/livre.css'; */


const ConfigProjectOne = ({ project }) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const [numberChapter, setNumberChapter] = useState(1);
    const [chapters, setChapters] = useState([{ id: 0, title: '', text: '' }]);

    const addChapter = () => {
        setNumberChapter(prevNumber => prevNumber + 1);
    };

    useEffect(() => {

        const newChapters = [];
        for (let index = 0; index < numberChapter; index++) {
            newChapters.push({ id: index, title: '', text: '' });
        }
        setChapters(newChapters);
    }, [numberChapter]);

    const handleChange = (index, field, value) => {
        const newChapters = [...chapters];
        newChapters[index][field] = value;
        setChapters(newChapters);
    };


    // csrfToken



    const handleSubmitConfig = (e) => {

        e.preventDefault();



        fetch('/project/add-chapter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                project_id: project.id,
                introduction: e.target.introduction.value,
                chapters: chapters
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
            })
            .catch(error => console.log(error));
    };



    return (

        <div className='min-h-screen pl-[4em]  z-10 relative'>

            <Head title='ConfigProject' />
            <Navigation >
                {/* <Header name={project.title} description={project.description} button='non' >
                        <button type='button' className='bg-yellow-400 text-white hover:bg-yellow-800 px-6 py-2 shadow rounded-lg' onClick={addChapter}>add chapter</button>
                    </Header> */}
                <form className="lg:pl-[4em] pl-0 " onSubmit={handleSubmitConfig}>

                    <div className='pt-10'>
                        <div className="max-w-6xl mx-auto rounded-lg bg-gray-100 rounded-xl border-gray-500  border ">
                            <div className='border-b border-gray-200 px-4 py-3 sm:px-6 rounded-t-xl flex justify-between shadow-sm  bg-white '>
                                <h2 className='text-2xl font-bold'>{project.title}</h2>
                                <div>
                                    <PrimaryButton type='button' className='!shadow-none !py-2' onClick={addChapter}> Add Chapter</PrimaryButton>
                                </div>
                            </div>
                            <div className='gap-x-6 gap-y-7  py-4 lg:h-[600px] h-auto overflow-y-scroll'>

                                <div className=" mx-6  pb-8  mx-auto">
                                    <div className=' my-4  '>
                                        <button className="!text-start z-10 !shadow-none !rounded-none !text-white bg-blue-900  w-full block p-6 uppercase">
                                            Introduction
                                        </button>
                                        <div className=' px-8 '>
                                            <textarea name="introduction" placeholder='Enter your introduction' required className='block w-full rounded-lg shadow-lg bg-white focus:ring-0' rows={4} cols={35}></textarea>
                                        </div>
                                    </div>
                                    {chapters.map((chapter, index) => (
                                        <div key={chapter.id} className='my-4'>
                                            <div className='bg-blue-900 w-full flex justify-between  items-center'>
                                                <button type='button' className=" block p-6 uppercase !text-start z-10 !shadow-none !rounded-none !text-white  ">
                                                    Chapter {chapter.id + 1}
                                                </button>
                                                <button type='button' className=" block bg-red-500 hover:bg-red-800 !text-white/60 uppercase px-3 ring-red-700 !text-start z-10 !shadow-none !rounded-md mx-3">
                                                    Delete <IconDelete className='!size-4 !inline-block' />
                                                </button>

                                            </div>

                                            <div className='pl-8'>
                                                <input
                                                    type="text"
                                                    name={`titlechapter-${chapter.id}`}
                                                    placeholder='Title'
                                                    required
                                                    className='block w-full my-2 rounded-lg shadow-lg  bg-white focus:ring-0'
                                                    value={chapter.title}
                                                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                                                />
                                                <textarea
                                                    name={`textchapter-${chapter.id}`}
                                                    placeholder='Enter your chapter'
                                                    required
                                                    rows={4}
                                                    className='block w-full rounded-lg shadow-lg  bg-white focus:ring-0'
                                                    value={chapter.text}
                                                    onChange={(e) => handleChange(index, 'text', e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='w-[60%] mx-auto mt-6 flex  justify-around items-center'>
                        <button type="submit" className=' bg-blue-700 hover:bg-blue-900 !shadow-none text-white px-6 w-1/2'>Submit</button>
                        <Link href={`/${project.id}-test-voice`} className='text-white hover:text-blue-800 font-bold'>Continue</Link>
                    </div>


                </form>
            </Navigation>
        </div >
    );
};

export default ConfigProjectOne;

