import ApplicationLogo from "@/Components/ApplicationLogo";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function Payment({ pricing }) {
    // RECUPERER LA VARIABLE D'ENVIRONNEMENT STRIPE_KEY
    const stripePromise = loadStripe(process.env.STRIPE_KEY);


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            alert(error.message);
        } else {
            document.getElementById('payment_method').value = paymentMethod.id;
            document.getElementById('form-payment').submit();
        }
    };
    return (

        <div class="grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-2 min-h-screen ">


            <div class="bg-gray-900 text-gray-300 lg:flex block justify-center items-center shadow-xl px-8">

                <div class=" text-white/80 px-4 py-8 md:px-8 md:py-12 ">
                    <div class="max-w-2xl mx-auto">
                        <div class="flex items-center justify-between mb-4">
                            <button type="button" onclick="retournerPagePrecedente();" class="text-gray-400 hover:text-white">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1
                                class="text-2xl font-bold bg-gradient-to-r from-gray-800 via-white to-blue-500 text-transparent bg-clip-text uppercase">
                                Echoscript</h1>
                        </div>
                        <div class="bg-gray-800/60 backdrop-blur-lg rounded-lg p-6 md:p-8">
                            <h2 class="text-2xl font-bold mb-4 text-white">Buy {pricing.name}</h2>
                            <p class="text-4xl font-bold mb-2">{pricing.amount} $US</p>
                            <p class="text-gray-400 mb-6 w-[430px]">{pricing.description} </p>
                            <div class="space-y-4 font-light">
                                <div class="flex items-center justify-between">
                                    <p>{pricing.name}</p>
                                    <p>{pricing.amount} US</p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <p>Number of characters</p>
                                    <p>+{pricing.char}</p>
                                </div>
                                <div class="flex items-center justify-between">

                                </div>
                                <div class="flex items-center justify-between text-gray-400 text-sm">
                                    <p>Recurring</p>
                                    <p>No</p>
                                </div>
                                <div class="flex items-center justify-between font-medium text-2xl text-white">
                                    <p>Total</p>
                                    <p class="">{pricing.amount} US</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class=" flex flex-col sm:justify-center items-center pt-6 sm:pt-0  px-8">
                <div class="hidden lg:block">
                    <a href="{ route('accueil') }">
                        <ApplicationLogo />
                    </a>
                </div>
                <Elements stripe={stripePromise}>
                    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white/60 shadow-md overflow-hidden sm:rounded-lg border-ui-1">
                        <form id="form-payment" onSubmit={handleSubmit}>
                            <CardElement
                                options={{
                                    classes: {
                                        base: 'block mt-1 w-full py-6 px-4 bg-white/60 focus:ring-teal-500 rounded-md shadow-sm border-ui-1 backdrop-blur-xl bg-white/60',
                                    },
                                }}
                            />
                            <input type="hidden" id="payment_method" name="payment_method" />
                            <button type="submit" id="submit-button">
                                Pay
                            </button>
                        </form>
                    </div>
                </Elements>


            </div>
            <script src="https://js.stripe.com/v3/"></script>
        </div >
    );

}
