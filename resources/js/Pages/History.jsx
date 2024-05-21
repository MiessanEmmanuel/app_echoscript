import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';

import Header from '@/Components/pages/Header';

export default function History() {
    return (
        <>
         <Head title='History'/>
            <Navigation >
                <Header name='History' description='History ipsum dolor sit amet consectetur adipisicing elit. Itaque, nisi dicta autem eveniet modi doloremque
                    dolorem delectus, amet illum vero id doloribus aliquam.' button='Oui'>

                    <Link href='/project' className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'> Go To Project</Link>
                </Header>
                <div>
                    history
                </div>
            </Navigation>

        </>

    )
}
