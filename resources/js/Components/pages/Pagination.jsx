import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState,useEffect } from 'react';


const items = [
    { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
    { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

export default function Pagination({ className, objects, page, setPage, itemsPerPageHistory }) {
    const [chapterCurrent, setChapterCurrent] = useState(objects[0]);
    const [dataAudio, setDataAudio] = useState(null);
    // Pagination
    const totalPage = Math.ceil(objects.length / itemsPerPageHistory);
    const handlePageChangeNext = () => {
        if (page >= totalPage) {
            setPage(page);
        } else {
            setPage(page + 1);
        }
    };
    const handlePageChangeBack = () => {
        if (page <= 1) {
            setPage(page);
        } else {
            setPage(page - 1);

        }
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className={"flex  items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 " + className}>
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{page}</span> to <span className="font-medium">{itemsPerPageHistory}</span> of{' '}
                        <span className="font-medium">{totalPage}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                                href="#"
                                onClick={handlePageChangeBack}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}


                            {// nombre de pagination en fontion du total page de la page
                                Array.from({ length: totalPage }, (_, index) => index + 1).map((pageIndex) => (
                                    <a
                                    key={pageIndex}
                                        href="#"
                                        onClick={() => handlePageClick(pageIndex)}
                                        aria-current="page"
                                        className={`${pageIndex == page ? 'bg-button-primary' : ' '} relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        {pageIndex}
                                    </a>
                                ))}


                            <a
                                href="#"
                                onClick={handlePageChangeNext}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
