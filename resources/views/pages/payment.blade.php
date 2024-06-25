@extends('layouts.base')
@section('title')
    Payment
@endsection
@section('style')
<style>
body{
    background-size: cover;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1366' height='768' preserveAspectRatio='none' viewBox='0 0 1366 768'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1247%26quot%3b)' fill='none'%3e%3crect width='1366' height='768' x='0' y='0' fill='rgba(4%2c 23%2c 103%2c 0.95)'%3e%3c/rect%3e%3cg transform='translate(0%2c 0)' stroke-linecap='round'%3e%3cpath d='M167 203.635 L167 300.385' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M167 348.76 L167 477.76' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M167 526.135 L167 564.365' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M210 119.965 L210 648.035' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M253 304.675 L253 336.925' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M253 385.3 L253 463.325' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M296 156.045 L296 317.29499999999996' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M296 365.66999999999996 L296 611.955' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M339 216.895 L339 551.105' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M382 354.445 L382 413.555' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M425 327.385 L425 440.615' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M468 115.905 L468 244.905' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M468 293.28 L468 390.03' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M468 438.405 L468 652.095' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M511 260.615 L511 507.385' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M554 117.415 L554 246.41500000000002' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M554 294.79 L554 391.54' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M554 439.915 L554 650.585' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M597 285.975 L597 318.225' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M597 366.6 L597 398.85' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M597 447.225 L597 482.025' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M640 290.935 L640 355.435' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M640 403.81 L640 477.065' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M683 177.795 L683 210.045' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M683 258.41999999999996 L683 387.41999999999996' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M683 435.79499999999996 L683 590.205' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M726 304.245 L726 336.495' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M726 384.87 L726 463.755' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M769 158.845 L769 352.345' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M769 400.72 L769 609.155' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M812 152.715 L812 615.285' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M855 138.325 L855 428.575' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M855 476.95 L855 509.2' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M855 557.575 L855 629.675' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M898 309.985 L898 458.015' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M941 132.245 L941 196.745' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M941 245.12 L941 503.12' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M941 551.495 L941 635.755' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M984 140.935 L984 627.065' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M1027 235.685 L1027 300.185' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M1027 348.56 L1027 532.315' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M1070 182.465 L1070 246.965' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M1070 295.34000000000003 L1070 392.09000000000003' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M1070 440.46500000000003 L1070 585.535' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M1113 325.295 L1113 442.705' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M1156 266.445 L1156 330.945' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M1156 379.32 L1156 411.57' stroke-width='32.25' stroke='rgba(254%2c 125%2c 4%2c 1)'%3e%3c/path%3e%3cpath d='M1156 459.945 L1156 501.54499999999996' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M1199 225.855 L1199 258.105' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3cpath d='M1199 306.48 L1199 338.73' stroke-width='32.25' stroke='rgba(74%2c 15%2c 214%2c 1)'%3e%3c/path%3e%3cpath d='M1199 387.105 L1199 542.145' stroke-width='32.25' stroke='rgba(4%2c 125%2c 254%2c 1)'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1247'%3e%3crect width='1366' height='768' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
}
body::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #100f0fab;
    z-index: 4;
}
</style>

@endsection

@section('content')
    <div class="grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-2 min-h-screen relative z-10 ">


        <div class="bg-gray-900 text-gray-300 lg:flex block justify-center items-center shadow-xl px-8">

            <div class=" text-white/80 px-4 py-8 md:px-8 md:py-12 ">
                <div class="max-w-2xl mx-auto">
                    <div class="flex items-center justify-between mb-4">
                        <button type="button" onclick="retournerPagePrecedente();" class="text-gray-400 hover:text-white">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-800 via-white to-blue-500 text-transparent bg-clip-text uppercase">Echoscript</h1>
                    </div>
                    <div class="bg-gray-800/60 backdrop-blur-lg rounded-lg p-6 md:p-8">
                        <h2 class="text-2xl font-bold mb-4 text-white">Buy {{ $pricing->name }}</h2>
                        <p class="text-4xl font-bold mb-2">{{ $pricing->amount }} $US</p>
                        <p class="text-gray-400 mb-6 w-[430px]">{{ $pricing->description }} </p>
                        <div class="space-y-4 font-light">
                            <div class="flex items-center justify-between">
                                <p>{{ $pricing->name }}</p>
                                <p>{{ $pricing->amount }} $US</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p>Number of characters</p>
                                <p>+{{ $pricing->char }}</p>
                            </div>
                            <div class="flex items-center justify-between">

                            </div>
                            <div class="flex items-center justify-between text-gray-400 text-sm">
                                <p>Recurring</p>
                                <p>No</p>
                            </div>
                            <div class="flex items-center justify-between font-medium text-2xl text-white">
                                <p>Total</p>
                                <p class="">{{ $pricing->amount }} $US</p>
                            </div>
                            <div>
                                <form action="{{route('payment.buyChar')}}" method="post">
                                    @csrf
                                    <input type="hidden" name="id_pricing" value="{{$pricing->id}}">
                                    <button
                                    type="submit"

                                    className="inline-flex w-full justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900"
                                >
                                    Buy plan {{$pricing->amount}}$
                                </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class=" flex flex-col sm:justify-center items-center pt-6 sm:pt-0  px-8">
            <div class="hidden lg:block">
                <a href="">
                    <br />
                </a>
            </div>
            <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg border-ui-1">
                <form action="{{ route('paymentstore') }}" method="post" id="form-payment">
                    @csrf
                    <div class="my-4">
                        <input id="email" class="block mt-1 w-full " type="text" name="email"
                            :value="old('email')" required autofocus autocomplete="email" placeholder="Email" />

                    </div>
                    <div class="my-10">
                        <input id="name" class="block mt-1 w-full" type="text" name="name"
                            :value="old('name')" required autofocus autocomplete="name" placeholder="Name" />

                    </div>
                    <input type="hidden" name="pricing_id" value="1" />
                    <input type="hidden" id="payment_method" name="paymentMethod" />
                    <!-- Stripe Elements Placeholder -->

                    <div id="card-element" class="my-10"></div>


                    <button class="mt-4 w-full py-4" id="submit-button" type="submit">
                        <div class="!text-center w-full">
                            {{ __('Process Payment') }}
                        </div>

                    </button>

                </form>


            </div>
        </div>
    </div>
@section('scripts')
    <script src="https://js.stripe.com/v3/"></script>

    <script>
        const stripe = Stripe('{{ env('STRIPE_KEY') }}');

        const elements = stripe.elements();
        const cardElement = elements.create('card', {
            classes: {
                base: 'block mt-1 w-full py-6 px-4 bg-white/60 focus:ring-teal-500 rounded-md shadow-sm border-ui-1 backdrop-blur-xl  bg-white/60'
            },
        });

        cardElement.mount('#card-element');
        const cardButton = document.getElementById('submit-button');
        cardButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const {
                paymentMethod,
                error
            } = await stripe.createPaymentMethod(
                'card', cardElement
            );

            if (error) {
                for (let index = 0; index < error.length; index++) {
                   alert(error[index]);

                }
            } else {
                document.getElementById('payment_method').value = paymentMethod.id;
            }

            document.getElementById('form-payment').submit();
        });
    </script>
@endsection
@endsection
