import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';
import ProjectShow from '@/Components/pages/ProjectShow';
import Header from '@/Components/pages/Header';
import CreateProject from '@/Components/pages/CreateProject';
import { useState,useEffect } from 'react';
import AanimateWriteText from '@/Components/text/AnimateWriteText';
import Pagination from '@/Components/pages/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';

export default function HomeProject({ projects, categories, voices }) {
    console.log(projects);
    const [projectsLocal, setProjects] = useState(projects || [])

    useEffect(() => {
        setProjects(projects || []);
      }, [projects]);
      /* const [articles, setArticles] = useState([]);

      useEffect(() => {
          // Remplacez cette partie par votre logique de récupération des articles depuis la base de données
          const fetchArticles = async () => {
              const response = await fetch('/api/articles'); // Exemple d'appel API
              const data = await response.json();
              setArticles(data);
          };

          fetchArticles();
      }, []);
 */


    const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
    const [valueShowModalRenameP, setValueShowModalRenameP] = useState(false);
    const [valueShowModalDeleteP, setValueShowModalDeleteP] = useState(false);

    const [projectModalCurrent, setProjectModalCurrent] = useState(null);
    const [titleProjectCurrentModified, setTitleProjectCurrentModified] = useState(null)
    const [lastProjectModifie, setLastProjectModifie] = useState(null)


    //Modal Create Project

    const handleOpenModalCreateProject = () => {
        setOpenModalCreateProject(true);
    };
    const handleCloseModalCreateProject = () => {
        setOpenModalCreateProject(false);
    };


    //Modal Rename  project
    const showModalRenameProject = (idProject) => {
        setValueShowModalRenameP(true)
        setProjectModalCurrent(idProject)

    };
    const CloseModalRenameProject = () => {
        setValueShowModalRenameP(false)
        setProjectModalCurrent(null)
    };

    // Modal delete Project
    const showModalDeleteProject = (idProject) => {
        setValueShowModalDeleteP(true)
        setProjectModalCurrent(idProject)

    };

    const CloseModalDeleteProject = () => {
        setValueShowModalDeleteP(false)
        setProjectModalCurrent(null)
    };


    const handleChangeNameAndCategoryProject = () => {

        fetch('/edit-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({
                id: projectModalCurrent,
                title_project: titleProjectCurrentModified,
                /* category: 'new category', */
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
                setValueShowModalRenameP(false)
            })
            .catch(error => console.log(error));


    }
    const handleDeleteProject = () => {

        fetch('/delete-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({
                id_project: projectModalCurrent,
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
                setValueShowModalDeleteP(false)
                setProjects(projects.filter(project => project.id !== projectModalCurrent));
            })
            .catch(error => console.log(error));


    }

    // pagination
    const [page, setPage] = useState(1);
    const [itemsPerPageHistory, setItemsPerPageHistory] = useState(4);
    const startIndex = (page - 1) * itemsPerPageHistory;
    const endIndex = startIndex + itemsPerPageHistory;
    const displayedChapters = projectsLocal.slice(startIndex, endIndex);


    return (
        <>
            <Head title='Project' />
            <CreateProject isOpen={openModalCreateProject} categories={categories} voices={voices} handleCloseModalCreateProject={handleCloseModalCreateProject} />
            <Navigation >
                <div className="lg:pl-[4em] pl-0 min-h-screen section-heros">
                    <div className='relative  z-10'>
                        {/* <AanimateWriteText text="Project" className='' /> */}

                        {/* <Header name='Project' description='Project ipsum dolor sit amet consectetur adipisicing elit. Itaque, nisi dicta autem eveniet modi doloremque
                    dolorem delectus, amet illum vero id doloribus aliquam.' button='non' >
                        <button type='button' onClick={handleOpenModalCreateProject} className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' > Create New Project</button>
                    </Header> */}
                        {/* <div className='py-6'>
                        <h1 className='text-5xl font-bold bg-gradient-to-r from-gray-800 via-white  to-blue-500 text-transparent bg-clip-text uppercase text-center'>Project</h1>
                    </div> */}

                        <div className='pt-10'>
                            <div className="max-w-6xl mx-auto rounded-lg bg-gray-100 rounded-xl shadow-md shadow-blue-600 border-gray-500  border ">
                                <div className='border-b border-gray-200 px-4 py-3 sm:px-6 rounded-t-xl flex justify-between shadow-sm  bg-white '>
                                    <h2 className='text-2xl font-bold'>Project</h2>
                                    <div>
                                        <PrimaryButton type='button' onClick={handleOpenModalCreateProject} className='!shadow-none !py-2' > Create New Project</PrimaryButton>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-6 gap-y-7 px-6 py-4 max-h-[600px] overflow-y-scroll'>

                                    {displayedChapters ? Object.entries(displayedChapters).map(([key, project]) => (
                                        <ProjectShow project={project} showModalRenameProject={showModalRenameProject} showModalDeleteProject={showModalDeleteProject} key={key} />

                                    )) : <div >No voices available</div>}

                                </div>
                                <Pagination className="bg-white rounded-b-xl" objects ={projects} page={page} setPage ={setPage} itemsPerPageHistory={itemsPerPageHistory} />
                            </div>

                        </div>
                    </div>

                </div >
                <Modal show={valueShowModalRenameP} maxWidth='lg' >
                    <div className='w-[90%] mx-auto p-6'>
                        <div className='mb-6'>
                            <input type="text"
                                placeholder='Project Name'
                                required
                                className='w-full mx-auto block bg-indigo-100  rounded-lg'
                                onChange={(e) => {
                                    setTitleProjectCurrentModified(e.target.value)
                                }
                                }></input>
                        </div>
                        <div className='flex justify-between space-x-8'>
                            <button onClick={CloseModalRenameProject} className='w-full bg-slate-900 text-slate-100'>
                                Close
                            </button>
                            <button onClick={handleChangeNameAndCategoryProject} className={`${titleProjectCurrentModified == '' ? 'opacity-50 hover:bg-indigo-600' : ''}  w-full bg-indigo-600 hover:bg-indigo-700 hover:text-white text-slate-100`}>
                                Update
                            </button>
                        </div>

                    </div>


                </Modal>
                <Modal show={valueShowModalDeleteP} maxWidth='lg' >
                    <div className='w-[90%] mx-auto p-6'>
                        <div className='mb-8 text-center text-red-600 text-xl font-bold '>
                            Are you sure you want to delete this project?
                        </div>
                        <div className='flex justify-between space-x-8'>
                            <button onClick={CloseModalDeleteProject} className='w-full bg-slate-900 text-slate-100'>
                                No
                            </button>
                            <button onClick={handleDeleteProject} className={`${titleProjectCurrentModified == '' ? 'opacity-50 hover:bg-red-600' : ''}  w-full bg-red-600 hover:bg-red-700 hover:text-white text-slate-100`}>
                                Delete
                            </button>
                        </div>

                    </div>


                </Modal>
            </Navigation>


        </>

    )
}
