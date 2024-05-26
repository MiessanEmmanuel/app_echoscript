export default function CreateProject({ isOpen, categories, voices, handleCloseModalCreateProject}) {
    if (!isOpen) return null;

    // Récupérer le jeton CSRF depuis le serveur
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleSubmitCreateProject = (e) => {
        e.preventDefault();
        const { name, description, category, voice, language } = e.target.elements;
        const project = {
            name: name.value,
            description: description.value,
            category: category.value,
            voice: voice.value,
            language: language.value,

        }
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('description', description.value);
        formData.append('category', category.value);
        formData.append('voice', voice.value);
        formData.append('language', language.value);


        fetch('/create-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log(data);
                    window.location.href = '/projects';
                } else {
                    console.log(data);
                }
            })
            .catch(error => console.log(error));



    }
    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <form className="w-2/5" onSubmit={handleSubmitCreateProject}>
                <div className="bg-[#fafcfc] p-6 rounded-lg shadow-lg w-full border-ui-1">
                    <h2 className="text-xl font-bold mb-4">Create Project</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name Project</label>
                        <input type="text" name="name" className="w-full" /* onChange={(e) => { fixStability(e.target.value) }} */ />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <input type="text" name="description" className="w-full" /* onChange={(e) => { fixSimilarity(e.target.value) }} */ />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Default Voice</label>
                        <select name="voice" className="w-full" /* onChange={(e) => { fixSpeakerBoost(e.target.value) }} */>
                            <option value="">Select voice</option>
                            {Object.entries(voices).map(([voice, value]) => (
                                <option key={voice} value={value}>
                                    {voice}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Language</label>
                        <select name="language" id="" className="w-full" /* onChange={(e) => { fixSpeakerBoost(e.target.value) }} */>
                            <option value="">Select language</option>
                            <option value="Fr">Fr</option>
                            <option value="En">En</option>

                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <select name="category" id="" className="w-full" /* onChange={(e) => { fixSpeakerBoost(e.target.value) }} */>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center gap-x-6" >
                    <button
                            type='button'
                            onClick={handleCloseModalCreateProject}
                            className="w-full bg-gray-500 hover:bg-blackblue/60 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                        <button
                            type='reset'
                            className="w-full bg-gray-500 hover:bg-blackblue/60 text-white px-4 py-2 rounded"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-gray-500 hover:bg-blackblue/60 text-white px-4 py-2 rounded"
                        >
                            Create Project
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}
