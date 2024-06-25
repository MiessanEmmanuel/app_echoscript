import { Link, Head } from '@inertiajs/react';
import IconDelete from '../Icons/IconDelete';
import IconSetting from '../Icons/IconSetting';
import { useState,useEffect } from 'react';
import Modal from '../Modal';

export default function ProjectShow({ project, showModalRenameProject, showModalDeleteProject}) {
    const [titleProject, setTitleProject] = useState(project.title)

   /*  useEffect(() => {
        if (titleProject == null){
            setTitleProject(project.title);
        }
    }, [titleProject]); */
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const showModalDeleteProjectLocal = () => {
        showModalDeleteProject(project)
    }

    const showModalRenameProjectLocal = () => {
        showModalRenameProject(project);
    }



    return (

        <div className="backdrop-blur-xl bg-white border-drop rounded-lg shadow-md rounded-xl relative " key={project.id}>
            <div className='absolute top-0 right-0 flex justify-between items-center px-3 py-4'>

                <button type="button" onClick={showModalDeleteProjectLocal} className='rounded-lg !shadow-none hover:bg-red-300 ring-1 ring-inset ring-red-700/10 text-red-900 px-2'>
                    <IconDelete className='!size-5 inline-block' stroke='red' />
                </button>
                <button type="button" onClick={showModalRenameProjectLocal} className=' mx-3 rounded-lg !shadow-none ring-1 ring-inset ring-indigo-700/10  hover:bg-indigo-300 px-2'>
                    <IconSetting fill='indigo' className='' />

                </button>

            </div>
            <div className="px-6 py-4 ">
                <span className="text-lg pb-1 block font-bold capitalize text-indigo-900">{project.title}</span>
                <p className="text-sm font-thin text-gray-500">
                    { truncateText(project.description, 300)}
                </p>
            </div>
            <div className="flex justify-between px-6 pt-4 text-sm">
                <div className=" flex-1 flex justify-end space-x-2">

                    <div
                        className="shadow-lg rounded-lg py-1 px-4 bg-degrate-ui text-white hover:bg-white-blue ">
                        <Link href={`project/${project.id}/config`}  >
                            <span>Go to project</span>
                        </Link>

                    </div>
                </div>

            </div>
            <div className='py-2 px-5 mt-3 border-t border-gray-200'>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mx-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">AudioBook</span>
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 mx-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">{project.default_voice}</span>
            </div>
        </div>


    );
}
