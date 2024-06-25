import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Navigation = ({ children }) => {
    const { url } = usePage();

    const isActive = (path) => url === path;

    return (
        /* -- *********************** Menu *********************** -- */
        <div className='lg:min-h-screen min-h-auto'>
            <header className="lg:block hidden fixed left-0 top-0 h-full w-[4em] z-[41] p-3 backdrop-blur-xl  border-drop  bg-slate-100 " id="">
                <nav className="flex flex-col justify-between  h-full">
                    <div className="flex-1 flex flex-col space-y-6" id="logopng">

                        <div className={`backdrop-blur-xl  border-drop   rounded-lg p-2 font-bold  ${isActive('/') ? '!bg-violet-200' : 'bg-white/60'}`}>

                            <Link href="/">ES</Link>
                        </div>
                        <div className={`backdrop-blur-xl  border-drop bg-white/60   rounded-lg p-2 font-bold hover:bg-violet-200 ${isActive('/history') ? '!bg-violet-200' : 'bg-white/60'} `}>

                            <Link href="/history">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10v4m4.5-3v2M12 6v12m4.5-15v18M21 10v4"></path></svg>
                            </Link>
                        </div>

                        <div  className={`backdrop-blur-xl  border-drop bg-white/60   rounded-lg p-2 font-bold hover:bg-violet-200 ${isActive('/pricing') ? '!bg-violet-200' : 'bg-white/60'} `}>
                            <Link href="/pricing">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 20 20"
                                    fill="none" stroke="currentColor" strokeWidth="1.5"
                                >
                                    <g clipPath="url(#clip0_363_486)">
                                        <path
                                            d="M7.083 12.222c0 1.074.871 1.945 1.945 1.945h1.805c1.15 0 2.083-.932 2.083-2.083 0-1.15-.933-2.083-2.083-2.083h-1.667c-1.151 0-2.083-.933-2.083-2.083s.932-2.083 2.083-2.083h1.806c1.073 0 1.944.871 1.944 1.945M10 4.583v1.25M10 14.167v1.25M18.333 10c0 4.602-3.731 8.333-8.333 8.333S1.667 14.602 1.667 10 5.398 1.667 10 1.667s8.333 3.731 8.333 8.333z">
                                        </path>
                                    </g>
                                    <defs>
                                        {/*  <clipPath id="clip0_363_486">
                                            <rect width="20" height="20" fill="white"></rect>
                                        </clipPath> */}
                                    </defs>
                                </svg>

                            </Link>
                        </div>

                    </div>


                    <div className="flex-1 flex flex-col justify-end  mb-8 mt-auto space-y-6">
                        <div className="backdrop-blur-xl  border-drop bg-white/60 !bg-none rounded-lg p-2 font-bold hover:bg-indigo-200">
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" viewBox="0 0 24 24"
                                    fill="none" className="-mt-[1px]">
                                    <path
                                        d="M11.302 21.6149C11.5234 21.744 11.6341 21.8086 11.7903 21.8421C11.9116 21.8681 12.0884 21.8681 12.2097 21.8421C12.3659 21.8086 12.4766 21.744 12.698 21.6149C14.646 20.4784 20 16.9084 20 12V7.21759C20 6.41808 20 6.01833 19.8692 5.6747C19.7537 5.37113 19.566 5.10027 19.3223 4.88552C19.0465 4.64243 18.6722 4.50207 17.9236 4.22134L12.5618 2.21067C12.3539 2.13271 12.25 2.09373 12.143 2.07827C12.0482 2.06457 11.9518 2.06457 11.857 2.07827C11.75 2.09373 11.6461 2.13271 11.4382 2.21067L6.0764 4.22134C5.3278 4.50207 4.9535 4.64243 4.67766 4.88552C4.43398 5.10027 4.24627 5.37113 4.13076 5.6747C4 6.01833 4 6.41808 4 7.21759V12C4 16.9084 9.35396 20.4784 11.302 21.6149Z"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" >
                                    </path>
                                </svg>
                            </a>
                        </div>
                        {/*<div className="bg-indigo-200 rounded-full p-5 bottom-0 text-center " style="box-sizing: border-box;">

                        </div> */}

                    </div>
                </nav>
            </header>
            {/*  -- backdrop-blur-xl  bg-white/60  -- */}

            {/* -- *********************** Mobile Menu *********************** -- */}
            <header className="block lg:hidden ">
                {/*-- ****** Menu top ******** --*/}
                <div className=" z-[41] p-3 backdrop-blur-xl border-drop bg-white/60" id="header-mobile">

                    <nav className="flex  justify-between  h-full ">
                        {/*-- ********* Logo + toogle *********  --*/}
                        <div className="flex-1 flex items-center space-x-2" id="logopng">
                            <button type="button" onClick="slideMenu()" className="backdrop-blur-xl  border-drop bg-white/60  rounded-lg p-2 font-bold inline-block">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256"
                                    className="w-4 h-4 h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z">
                                    </path>
                                </svg>

                            </button>
                            <span className="backdrop-blur-xl  border-drop bg-white/60  rounded-lg p-2 font-bold inline-block">
                                <a href="{/*route('accueil')*/}">
                                    ES
                                </a>
                            </span>
                        </div>


                        {/*-- ********* Compte *********  --*/}
                        <div className="flex-1 flex justify-end  mt-auto ">
                            <div className="bg-indigo-200 rounded-full p-5   bottom-0 text-center " /* style="box-sizing: border-box;" */>

                            </div>
                        </div>
                    </nav>


                </div>
                {/*-- ****** Menu slide ******** --*/}
                <div className="fixed inset-0 h-screen w-screen bg-gray-100/60 overflow-hidden z-[44] hidden" id="bg-menu-slide">


                    <div className="fixed left-0 top-0 w-[60%] z-[44] p-3 backdrop-blur-xl  border-drop bg-white/60  h-full -translate-x-[100%]" id="menu-slide">
                        {/*-- icon close --*/}
                        <div className="absolute -right-12 top-7 backdrop-blur-xl  border-drop bg-white/60 !bg-gray-600/40 p-1 rounded-lg " id="btn-close-menu">
                            <button type="button" onClick="closeSlideMenu()">
                                <svg xmlns="http://www.w3.org/2000/svg" className=" icon-close inline-block w-[1.5em] h-[1.5em] "
                                    viewBox="0 0 53.18 53.18">
                                    <defs>
                                        {/* <style>
                            .icn-close {
                                fill: none;
                            }

                            .cls-2 {
                                fill: #fff;
                            }
                        </style> */}
                                    </defs>
                                    <g id="Calque_2" data-name="Calque 2">
                                        <g id="Calque_1-2" data-name="Calque 1">
                                            <circle className="icn-close" cx="26.59" cy="26.59" r="26.59" />
                                            <rect className="cls-2" x="23.05" y="9.82" width="7.77" height="34.97" rx="3.89"
                                                transform="translate(27.19 -11.05) rotate(45)" />
                                            <rect className="cls-2" x="23.05" y="9.82" width="7.77" height="34.97" rx="3.89"
                                                transform="translate(65.29 27.56) rotate(135)" />
                                        </g>
                                    </g>
                                </svg>
                            </button>

                        </div>

                        <div className="flex flex-col justify-between  h-full">
                            {/*-- logo --*/}
                            <div className="mb-4">
                                <a href="{/*route('accueil')*/}" className="  rounded-lg p-2 font-bold flex space-x-2 text-xl">
                                    <span className="inline-block">
                                        ES
                                    </span>
                                    <div className="text-center flex justify-end">
                                        <span className="inline-block ">
                                            Echoscript
                                        </span>

                                    </div>
                                </a>
                            </div>
                            {/*-- menu --*/}
                            <div className="flex-1 flex flex-col space-y-6 text-sm" id="logopng">


                                <a href="{/*route('history')*/}"
                                    className="backdrop-blur-xl  border-drop bg-white/60 !bg-none rounded-lg p-2  hover:bg-indigo-200 flex items-center space-x-2 active ">
                                    <span href="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round"
                                                strokeWidth="2" d="M3 10v4m4.5-3v2M12 6v12m4.5-15v18M21 10v4"></path>
                                        </svg>
                                    </span>
                                    <span>
                                        History
                                    </span>
                                </a>

                                <a href="{/*route('payouts')*/}"
                                    className="backdrop-blur-xl  border-drop bg-white/60 !bg-none rounded-lg p-2 hover:bg-indigo-200 flex items-center space-x-2 ">
                                    <span >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem"
                                            viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" >
                                            <g clipPath="url(#clip0_363_486)">
                                                <path
                                                    d="M7.083 12.222c0 1.074.871 1.945 1.945 1.945h1.805c1.15 0 2.083-.932 2.083-2.083 0-1.15-.933-2.083-2.083-2.083h-1.667c-1.151 0-2.083-.933-2.083-2.083s.932-2.083 2.083-2.083h1.806c1.073 0 1.944.871 1.944 1.945M10 4.583v1.25M10 14.167v1.25M18.333 10c0 4.602-3.731 8.333-8.333 8.333S1.667 14.602 1.667 10 5.398 1.667 10 1.667s8.333 3.731 8.333 8.333z">
                                                </path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_363_486">
                                                    <rect width="20" height="20" fill="white"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </span>
                                    <span>
                                        Payouts
                                    </span>
                                </a>

                            </div>


                            <div className="flex-1 flex flex-col justify-end  mb-8 mt-auto space-y-6 text-sm">
                                <a href="#"
                                    className="backdrop-blur-xl  border-drop bg-white/60 !bg-none rounded-lg p-2  hover:bg-indigo-200 flex items-center space-x-2">
                                    <span className="inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1rem" height="1.1rem"
                                            viewBox="0 0 24 24" fill="none" className="-mt-[1px]">
                                            <path
                                                d="M11.302 21.6149C11.5234 21.744 11.6341 21.8086 11.7903 21.8421C11.9116 21.8681 12.0884 21.8681 12.2097 21.8421C12.3659 21.8086 12.4766 21.744 12.698 21.6149C14.646 20.4784 20 16.9084 20 12V7.21759C20 6.41808 20 6.01833 19.8692 5.6747C19.7537 5.37113 19.566 5.10027 19.3223 4.88552C19.0465 4.64243 18.6722 4.50207 17.9236 4.22134L12.5618 2.21067C12.3539 2.13271 12.25 2.09373 12.143 2.07827C12.0482 2.06457 11.9518 2.06457 11.857 2.07827C11.75 2.09373 11.6461 2.13271 11.4382 2.21067L6.0764 4.22134C5.3278 4.50207 4.9535 4.64243 4.67766 4.88552C4.43398 5.10027 4.24627 5.37113 4.13076 5.6747C4 6.01833 4 6.41808 4 7.21759V12C4 16.9084 9.35396 20.4784 11.302 21.6149Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            >
                                            </path>
                                        </svg>
                                    </span>
                                    <span>
                                        Terms and Privacy
                                    </span>
                                </a>
                                <div className="bg-indigo-200 rounded-full p-5 bottom-0 text-center " /* style="box-sizing: border-box;" */>
                                    <span>
                                        Contact us
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </header>
            {children}
        </div>
    );
};

export default Navigation;
