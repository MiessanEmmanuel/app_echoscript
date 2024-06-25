import { Link, Head, usePage } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';

import Header from '@/Components/pages/Header';
import AudioFooter from '@/Components/pages/AudioFooter';
import Pagination from '@/Components/pages/Pagination';
import IconPause from '@/Components/Icons/IconPause';
import IconPlay from '@/Components/Icons/IconPlay';
import { useState } from 'react';

export default function History() {

    const {histories} = usePage().props;
    const [dataAudio, setDataAudio] = useState(null);
    const [hrefAudio, setHrefAudio] = useState(null);
    console.log(histories);

    //Faire jour l'audio en fonction de l'audio qui vient
    const [isPlayingFooter, setIsPlayingFooter] = useState(false);



    //------------------Pagination--------------------
    //-------- declaration des pamamètre de page
    const [pageHistory, setPageHistory] = useState(1);
    const [itemsPerPageHistory, setItemsPerPageHistory] = useState(3);


    const startIndex = (pageHistory - 1) * itemsPerPageHistory;
    const endIndex = startIndex + itemsPerPageHistory;
    const displayedHistories = histories.slice(startIndex, endIndex);


    const handleClickPlay = (url_audio) => {

     if (isPlayingFooter) {
        setIsPlayingFooter(false);
     }else{
        setHrefAudio(url_audio);
        setDataAudio(null)
        setIsPlayingFooter(true);
     }

    }

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    // je dois faire une condition pour que le isPlayingFooter soit seulement pour un element de la boucle de telle sorte que quand il recoit true, tout les element n'affiche pas tous à la fois le svg requis


    return (
        <>
            <Head title='History' />
            <Navigation>
                <div className="lg:pl-[4em] pl-0 pt-8">
                    {/* <Header name='History' description='History ipsum dolor sit amet consectetur adipisicing elit. Itaque, nisi dicta autem eveniet modi doloremque
                    dolorem delectus, amet illum vero id doloribus aliquam.' button='Oui'>
                        <Link href='/project' className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'> Go To Project</Link>
                    </Header> */}
                    <div className="mx-auto lg:w-2/3 w-[90%] backdrop-blur-xl bg-white/80 rounded-lg shadow-lg  my-12 max-h-3xl">
                        <div className="  " id="">
                            <div className=" ">
                                {/* {{-- ********* Title History ********* --}} */}
                                <div className="font-bold mb-5 text-xl bg-slate-100 rounded-t-lg px-6 py-4 capitalize font-bold">
                                    <span>History</span>
                                </div>
                                {/* {{-- ********* Output Audios ********* --}} */}

                                {displayedHistories && displayedHistories.length > 0 ? displayedHistories.map((history) => (
                                    <div key={history.id} className="bg-slate-100 border-drop rounded-xl shadow-lg  my-6 w-2/3 mx-auto flex">
                                        <div className=" flex-1 ">

                                            <div className="text-sm font-thin px-6 py-4">
                                                {truncateText(history.text, 400)}
                                            </div>
                                            <div className='mt-3 border-t border-gray-200'>
                                                <div className='py-2 px-5'>
                                                    <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 mx-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/10">{history.category}</span>
                                                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 mx-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">{history.voice}</span>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="flex items-center px-3 text-sm border-l border-gray-200">
                                            <button type="button" className='!shadow-none !px-0' onClick={() => handleClickPlay(history.url_transcribed_audio)}>
                                                {(isPlayingFooter && history.url_transcribed_audio === hrefAudio) ? (
                                                    <IconPause fill='indigo' className='inline-block !size-14 ' />
                                                ) : (
                                                    <IconPlay fill='indigo' className='inline-block !size-14 box-shad' />
                                                )}
                                                <audio controls className="hidden" ></audio>
                                            </button>
                                        </div>

                                    </div>

                                )) : <div>No Audio available</div>}

                            </div>

                            {/* {{-- ********* Pagination ********* --}} */}
                            <Pagination objects={histories} className='bg-slate-100' page={pageHistory} setPage={setPageHistory} itemsPerPageHistory={itemsPerPageHistory} />
                        </div>
                    </div>
                    <div id="" className="absolute inset-x-0 bottom-0 bg-slate-100/60 px-6 py-4 backdrop-blur-xl border-drop  mt-6 w-3/4 mx-auto rounded-t-xl ">
                        <AudioFooter srcLinkAudio={hrefAudio} data={dataAudio} isPlayingFooterLocal={isPlayingFooter} />
                    </div>
                </div>
            </Navigation>

        </>

    )
}
