import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';
import Header from '@/Components/pages/Header';
import CreateProject from '@/Components/pages/CreateProject';
import Checkbox from "@/Components/Checkbox";

const ConfigProjectOne = ({ project }) => {

    console.log(project);
    return (
        <div>
            <Head title='Project' />
            <Navigation >
                <div className="lg:pl-[4em] pl-0 min-h-screen ">

                    <Header name={project.title} description={project.description} button='non' >
                        <button className='bg-yellow-400 text-white hover:bg-yellow-800 px-6 py-2 shadow rounded-lg'>add chapter</button>
                    </Header>

                    <div className='flex justify-between items-center'>
                        <div className="shadow-lg py-4 mx-6 rounded-lg my-8 mx-6  w-3/5 mx-auto">
                            <div className=' my-4  '>
                                <button className="bg-blue-300 w-full block p-6 uppercase">
                                    Introduction

                                </button>
                                <div className=' pl-8'>
                                    <textarea name="descriptionIntroduction" placeholder='Enter your introduction' className='block w-full'></textarea>
                                </div>
                            </div>
                            <div className=' my-4 '>
                                <button className="bg-blue-300 w-full block p-6 uppercase">
                                    Chapter 1

                                </button>
                                <div className=' pl-8'>
                                    <input type="text" name='titlechapter' placeholder='Title' className='block w-full my-2' />
                                    <textarea name="textchapter" placeholder='Enter your chapter' className='block w-full'></textarea>
                                </div>
                            </div>
                            <div className=' my-4 '>
                                <button className="bg-blue-300 w-full block p-6 uppercase">
                                    Chapter 2

                                </button>
                                <div className=' pl-8'>
                                    <input type="text" name='titlechapter' placeholder='Title' className='block w-full my-2' />
                                    <textarea name="textchapter" placeholder='Enter your chapter' className='block w-full'></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='text-center'>
                        <Link href={`/project/${project.id}`}>Continue</Link>
                    </div>
                </div>
            </Navigation>
        </div>
    );
};

export default ConfigProjectOne;

