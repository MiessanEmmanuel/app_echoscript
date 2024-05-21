import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';
import ProjectShow from '@/Components/pages/ProjectShow';
import Header from '@/Components/pages/Header';
import CreateProject from '@/Components/pages/CreateProject';
import { useState } from 'react';

export default function HomeProject({ projects, categories, voices }) {
  const [openModalCreateProject, setOpenModalCreateProject] = useState(false);

  const handleOpenModalCreateProject= () => {
    setOpenModalCreateProject(true);
  };
  const handleCloseModalCreateProject = () => {
    setOpenModalCreateProject(false);
   };

  console.log(projects);

    return (
        <>
            <Head title='Project' />
            <CreateProject isOpen = {openModalCreateProject} categories={categories} voices={voices} handleCloseModalCreateProject={handleCloseModalCreateProject}/>
            <Navigation >
                <div className="lg:pl-[4em] pl-0 min-h-screen ">

                    <Header name='Project' description='Project ipsum dolor sit amet consectetur adipisicing elit. Itaque, nisi dicta autem eveniet modi doloremque
                    dolorem delectus, amet illum vero id doloribus aliquam.' button='non' >
                        <button type='button' onClick={handleOpenModalCreateProject} className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' > Create New Project</button>

                    </Header>
                    <div className='py-6'>
                        <h1 className='text-5xl font-bold bg-gradient-to-r from-gray-800 via-white  to-blue-500 text-transparent bg-clip-text uppercase text-center'>Project</h1>
                    </div>
                    <div className=''>
                        <div className="max-w-4xl mx-auto rounded-lg px-6 py-4 border-ui-1 shadow-md border-gray-500 border ">
                            <div className='grid grid-cols-2 gap-x-10 gap-y-6 '>

                                {projects ? Object.entries(projects).map(([key, project]) => (
                                    <ProjectShow  project={project}  />

                            )) : <div >No voices available</div>}

                            </div>
                        </div>
                    </div>
                </div >
            </Navigation>


        </>

    )
}
