import CardPricing from "@/Components/pages/CardPricing";
import Header from "@/Components/pages/Header";
import Navigation from "@/Layouts/Navigation";
import { Head, Link } from "@inertiajs/react";
import { Card } from "flowbite-react";


export default function Payout({ pricing }) {

    const handleBuyChar = (id_pricing) => {
        console.log(id_pricing);
        fetch(`/payment/buy`, {
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_pricing: id_pricing,
            }),
        }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                window.location.href = data.url;
            })
            .catch((error) => console.error(error));
    };


    return (
        <div class="lg:pl-[4em] pl-0 flex flex-col justify-between lg:h-auto min-h-screen bg-violet-200">
            <Head title="Payout" />

            <Navigation>
               {/*  <Header name="Pricing" description="test" >

                </Header> */}
                <div class="header-payout my-4  ">
                    <div
                        class="w-[80%] backdrop-blur-xl border-drop bg-slate-200 font-bold uppercase  px-6 py-4 text-xl font-bold mx-auto text-center rounded-lg border-ui-1">
                        <h3>Payer avec Stripe</h3>

                    </div>
                </div>
                <div class="py-6 px-4 max-w-6xl mx-auto">
                    <div class="grid grid-cols-4 space-y-5  space-x-6 ">

                        {pricing ? Object.entries(pricing).map(([key, onepricing]) => (
                            <Card className='max-w-sm !bg-slate-200' key={onepricing.id}>
                                <h5 className="mb-3 text-xl font-medium text-violet-500 dark:text-violet-400 uppercase">{onepricing.name} plan</h5>
                                <div className="flex items-baseline text-violet-900 ">
                                    <span className="text-3xl font-semibold">$</span>
                                    <span className="text-5xl font-extrabold tracking-tight">{onepricing.amount}</span>
                                    {/*  <span className="ml-1 text-xl font-normal text-gray-500 ">/month</span> */}
                                </div>
                                <ul className="my-5 space-y-5">
                                    <li className="flex space-x-3">
                                        <svg
                                            className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-base font-normal leading-tight text-gray-500 ">+{onepricing.char} Char</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <svg
                                            className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-base font-normal leading-tight text-gray-500 ">
                                            20GB Cloud storage
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    onClick={() => { handleBuyChar(onepricing.id) }}

                                    className="inline-flex w-full justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900"
                                >
                                    Buy plan {onepricing.amount}$
                                </button>
                                {/* <a href={`/payment/${onepricing.id}`}
                                    className="inline-flex w-full justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900"
                                > Buy plan {onepricing.amount}$</a> */}
                            </Card>



                        )) : <div >No voices available</div>
                        }


                    </div>
                </div>
            </Navigation>


        </div>
    );

}
