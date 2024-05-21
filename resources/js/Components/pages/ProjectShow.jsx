import { Link, Head } from '@inertiajs/react';
export default function ProjectShow({ project }) {
    const handleDeleteProject = () => {
        console.log('delete');
    }
    return (
        <>

            <div class="backdrop-blur-xl border-droprounded-lg shadow-lg border-ui-1 my-6" key={project.id}>
                <div class=" border-ui-bottom-1 px-6 py-4 ">
                    <span className="text-lg pb-1 block font-bold">{project.title}</span>
                    <p class="text-sm font-thin">
                        {project.description}
                    </p>
                </div>
                <div class="flex justify-between px-6 py-4 text-sm">
                    <div class="">
                        <span class=" inline-block shadow-lg rounded-lg py-1 px-2 bg-red-400/60 hover:bg-red-400 border-ui-1">
                            <button type="button" onClick={handleDeleteProject}>Delete</button>
                        </span>
                    </div>
                    <div class=" flex-1 flex justify-end space-x-2">
                        <div class="shadow-lg rounded-lg py-1 px-2 bg-white/60 hover:bg-white-blue border-ui-1">
                            <span>
                                <a href="#">Settings</a>
                            </span>
                        </div>
                        <div
                            class="shadow-lg rounded-lg py-1 px-2 bg-white/60 hover:bg-white-blue border-ui-1">
                            <Link href={`project/${project.id}/config`}>
                                <span>Go to project</span>

                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}
