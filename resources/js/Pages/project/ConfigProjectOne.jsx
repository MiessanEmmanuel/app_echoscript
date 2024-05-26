import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';
import Header from '@/Components/pages/Header';
import CreateProject from '@/Components/pages/CreateProject';
import Checkbox from "@/Components/Checkbox";

const ConfigProjectOne = ({ project }) => {

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
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


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
        <div>
            <Head title='Project' />
            <Navigation >
                <form className="lg:pl-[4em] pl-0 min-h-screen " onSubmit={handleSubmitConfig}>

                    <Header name={project.title} description={project.description} button='non' >
                        <button type='button' className='bg-yellow-400 text-white hover:bg-yellow-800 px-6 py-2 shadow rounded-lg' onClick={addChapter}>add chapter</button>
                    </Header>

                    <div className='flex justify-between items-center'>
                        <div className=" py-4 mx-6 rounded-lg my-8 mx-6  w-3/5 mx-auto">
                            <div className=' my-4  '>
                                <button className="rounded-lg z-10  bg-gradient-to-r to-white via-pink-500 from-yellow-200 w-full block p-6 uppercase">
                                    Introduction

                                </button>
                                <div className=' px-8 '>
                                    <textarea name="introduction" placeholder='Enter your introduction' required className='block w-full rounded-lg shadow-lg border-ui-1 bg-white/60 focus:ring-0'></textarea>
                                </div>
                            </div>
                            {chapters.map((chapter, index) => (
                                <div key={chapter.id} className='my-4'>
                                    <button className="bg-blue-300 w-full block p-6 uppercase">
                                        Chapter {chapter.id + 1}
                                    </button>
                                    <div className='pl-8'>
                                        <input
                                            type="text"
                                            name={`titlechapter-${chapter.id}`}
                                            placeholder='Title'
                                            required
                                            className='block w-full my-2 rounded-lg shadow-lg border-ui-1 bg-white/60 focus:ring-0'
                                            value={chapter.title}
                                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                                        />
                                        <textarea
                                            name={`textchapter-${chapter.id}`}
                                            placeholder='Enter your chapter'
                                            required
                                            className='block w-full rounded-lg shadow-lg border-ui-1 bg-white/60 focus:ring-0'
                                            value={chapter.text}
                                            onChange={(e) => handleChange(index, 'text', e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className='text-center'>
                        <Link href={`/project/${project.id}`}>Continue</Link>
                        <button type="submit" className='px-6'> Valider</button>
                    </div>
                </form>
            </Navigation>
        </div>
    );
};

export default ConfigProjectOne;

