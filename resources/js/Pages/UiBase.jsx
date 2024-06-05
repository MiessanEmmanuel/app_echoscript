import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import IconBack10S from '@/Components/Icons/IconBack10S';
import IconBackHistory from '@/Components/Icons/IconBackHistory';
import IconDownload from '@/Components/Icons/IconDownload';
import IconNext from '@/Components/Icons/IconNext';
import IconNext10S from '@/Components/Icons/IconNext10S';
import IconPause from '@/Components/Icons/IconPause';
import IconPlay from '@/Components/Icons/IconPlay';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Pagination from '@/Components/pages/Pagination';
import { useState } from 'react';





export default function UiBase() {
    const [valueShow, SetValueShow] = useState(false);

    const handleShow = ()=>{
        SetValueShow(true);
    };


    return (
        <div className="grid grid-cols-5 gap-6  h-screen p-6 mx-auto bg-degrate-ui" >
            <div>
                <ApplicationLogo />
            </div>
            <div>
                <Checkbox />
            </div>
            <div>
                <DangerButton>Delete</DangerButton>
            </div>
            <div>
                <Dropdown>
                    <div>coucou</div>
                </Dropdown>
            </div>
            <div>
                <InputError message="Erreur 404" />

            </div>
            <div>
                <InputLabel value="Champ" />
            </div>
            <div>
            <SecondaryButton onClick={handleShow}> Show Modal</SecondaryButton>
                <Modal show={valueShow}>
                    <div className='p-6'>
                        <PrimaryButton className='mx-auto block'>Valider</PrimaryButton>
                    </div>
                </Modal>
            </div>
            <div>
                <InputLabel />
            </div>
            <div>
                <Modal />
            </div>
            <div>
                <NavLink />
            </div>
            <div>

                <PrimaryButton className=''>Valider </PrimaryButton>
            </div>
            <div>
                <ResponsiveNavLink >
                    <div>
                        bonjour
                    </div>
                    <div>
                        bonjour
                    </div>
                </ResponsiveNavLink >
            </div>
            <div>
                <SecondaryButton> Retrun   <IconDownload className='' fill='yellow-900' /></SecondaryButton>
            </div>
            <div>
                <TextInput />
            </div>
            <div className='col-span-2'>
                <Pagination />
            </div>
            <div className='col-span-2'>
                <IconDownload className='' fill='pink' />
                <IconBack10S className='stroke-red-600' />
                <IconNext10S />
                <IconNext className='text-white ' />
                <IconPause />
                <IconPlay />


                <IconBackHistory/>
                <IconBackHistory/>


            </div>
            <div className='col-span-5'>
                <h1 className='animate-write-text text-6xl  bg-gradient-to-r from-pink-700 via-white to-indigo-600 !text-transparent bg-clip-text uppercase'>Echoscript </h1>
            </div>
        </div>
    );

}
