import { Link, Head } from '@inertiajs/react';
import Navigation from '@/Layouts/Navigation';

import Header from '@/Components/pages/Header';
import AudioFooter from '@/Components/pages/AudioFooter';
import ProjectShow from '@/Components/pages/ProjectShow';
import Pagination from '@/Components/pages/Pagination';

export default function History({ histories }) {
    console.log(histories[0]);
    return (
        <>
            <Head title='History' />
            <Navigation >
                <div className="lg:pl-[4em] pl-0 ">
                    <Header name='History' description='History ipsum dolor sit amet consectetur adipisicing elit. Itaque, nisi dicta autem eveniet modi doloremque
                    dolorem delectus, amet illum vero id doloribus aliquam.' button='Oui'>

                        <Link href='/project' className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'> Go To Project</Link>
                    </Header>
                    <div className="mx-auto lg:w-1/2 w-[80%]   rounded-lg shadow-lg my-12">
                        <div className="  " id="">
                            <div className="px-6 py-4">
                                {/* {{-- ********* Title History ********* --}} */}
                                <div className="font-bold my-5 text-xl">
                                    <span> Lorem ipsum</span>
                                </div>
                                {/* {{-- ********* Output Audios ********* --}} */}

                                {histories ? Object.entries(histories).map((history) => (
                                    <div className="backdrop-blur-xl border-droprounded-lg shadow-lg  my-6">
                                        <div className=" -bottom-1 px-6 py-4 ">
                                            <p className="text-sm font-thin">
                                                {history.text}
                                            </p>
                                        </div>
                                        <div className="flex justify-between px-6 py-4 text-sm">
                                            <div className="flex-1">
                                                <span
                                                    className="inline-block shadow-lg rounded-lg py-1 px-2 bg-white/60 hover:bg-white-blue ">
                                                    <button type="button" className="buttonplay">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-play inline-block"
                                                            width="1.2rem" height="1.2rem" viewBox="0 0 53.18 53.18">
                                                            <defs>
                                                                <style>
                                                                    .icn-play {`
                                                            fill: #031e35;
                                                        `}

                                                                    .cls-2 {`
                                                            fill: #fff;
                                                        `}
                                                                </style>
                                                            </defs>
                                                            <g id="Calque_2" dataName="Calque 2">
                                                                <g id="Calque_1-2" dataName="Calque 1">
                                                                    <circle className="icn-play" cx="26.59" cy="26.59" r="26.59" />
                                                                    <path className="cls-2"
                                                                        d="M18.48,14.55V38.63A1.53,1.53,0,0,0,20.79,40l20.6-12a1.53,1.53,0,0,0,0-2.64l-20.6-12A1.53,1.53,0,0,0,18.48,14.55Z" />
                                                                </g>
                                                            </g>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-pause inline-block hidden"
                                                            width="1.2rem" height="1.2rem" viewBox="0 0 53.18 53.18">
                                                            <defs>
                                                                <style>
                                                                    .icn-pause {`
                                                            fill: #031e35;
                                                        `}

                                                                    .cls-2 {`
                                                            fill: #fff;
                                                        `}
                                                                </style>
                                                            </defs>
                                                            <g id="Calque_2" dataName="Calque 2">
                                                                <g id="Calque_1-2" dataName="Calque 1">
                                                                    <circle className="icn-pause" cx="26.59" cy="26.59" r="26.59" />
                                                                    <rect className="cls-2" x="16.18" y="13.3" width="6"
                                                                        height="27" rx="1.77" />
                                                                    <rect className="cls-2" x="31.18" y="13.3" width="6"
                                                                        height="27" rx="1.77" />
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                    <audio className="audio hidden">
                                                        <source src={url_transcribed_audio.url_audio} type="audio/mpeg">
                                                        </source>
                                                    </audio>
                                                    <span>Play</span>

                                                </span>
                                            </div>

                                            <div className="flex-1 flex justify-end space-x-2">
                                                <div className="shadow-lg rounded-lg py-1 px-2 bg-white/60 hover:bg-white-blue ">
                                                    <span>
                                                        {/* {{-- <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 12.5 13.74"><defs><style>.cls-3{fill:none;stroke:#031e35;stroke-miterlimit:10;}</style></defs><g id="Calque_2" dataName="Calque 2"><g id="Calque_1-2" dataName="Calque 1"><polyline className="cls-3" points="2.59 6.58 6.06 11.46 9.73 6.58"/><line className="cls-3" x1="6.08" x2="6.08" y2="11.33"/><polyline className="cls-3" points="12 11.85 12 13.24 0.5 13.24 0.5 11.85"/></g></g></svg> --}} */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block" width="1.2rem"
                                                            height="1.2rem" viewBox="0 0 13.5 14.24">
                                                            <defs>
                                                                <style>
                                                                    .cls-4 {`
                                                            fill: none;
                                                            stroke: #031e35;
                                                            stroke-miterlimit: 10;
                                                            stroke-width: 2px;
                                                        `}
                                                                </style>
                                                            </defs>
                                                            <g id="Calque_2" dataName="Calque 2">
                                                                <g id="Calque_1-2" dataName="Calque 1">
                                                                    <polyline className="cls-4" points="3.09 6.58 6.56 11.46 10.23 6.58" />
                                                                    <line className="cls-4" x1="6.58" x2="6.58" y2="11.33" />
                                                                    <polyline className="cls-4"
                                                                        points="12.5 11.85 12.5 13.24 1 13.24 1 11.85" />
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </span>

                                                    <a href="{{ route('downloadAudio', ['id' => $history->id]) }}">Download</a>
                                                    {/* {{-- <button onclick="downloadAudio()">Download</button> --}} */}
                                                    <script>
                                                        {/* function downloadAudio() {
                                                                                                                                                                                fetch('{{ route('downloadAudio', ['id' => $history->id]) }}', {
                                                                                                                                                                                        method: 'POST',
                                                                                                                                                                                        headers: {
                                                                                                                                                                                            'Content-Type': 'application/json',
                                                                                                                                                                                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                                                                                                                                                                                        },
                                                                                                                                                                                        body: JSON.stringify({
                                                                                                                                                                                            id: {{ $history->id }}
                                                                                                                                                                                        })
                                                                                                                                                                                    })
                                                                                                                                                                                    .then(response => response.json())
                                                                                                                                                                                    .then(data => {
                                                                                                                                                                                        const link = document.createElement('a');
                                                                                                                                                                                        link.href = data.audioDownloadUrl;
                                                                                                                                                                                        link.download = 'audio-file.mp3';


                                                                                                                                                                                         // Remplacez 'audio-file.mp3' par le nom souhaité du fichier audio
                                                                                                                                                                                        link.click();
                                                                                                                                                                                    });
                                                                                                                                                                            }  */}
                                                    </script>
                                                </div>
                                                <div className="shadow-lg rounded-lg py-1 px-2 bg-red-400/60 hover:bg-red-400 ">
                                                    <form action="{{ route('audio.destroy', ['id' => $history->id]) }}" method="POST">

                                                        <button type="submit">Delete</button>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                )) : <div  >No Audio available</div>}


                                {/* {{-- <div className="shadow-lg rounded-lg py-1 px-2 bg-white/60   ">

                            <span> Download</span>
                        </div> --}} */}

                            </div>

                            {/* {{-- ********* Pagination ********* --}} */}
                            <Pagination/>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-white  bottom-0 inset-x-0">

                    </div>
                    <div id="" className="-top-2 bg-white/60 px-6 py-4  backdrop-blur-xl border-drop  mt-6 w-full ">
                        <AudioFooter  />
                    </div>
                </div>
            </Navigation>

        </>

    )
}
