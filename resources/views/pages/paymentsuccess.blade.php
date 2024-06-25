@extends('layouts.base')
@section('title')
Payment Successful
@endsection
@section('style')
<style>
body{
    background-size: cover;
    background-attachment:fixed;
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
<div class="container mx-auto py-12 relative z-10 ">
    <div class="max-w-lg mx-auto bg-slate-200 p-6 rounded-lg shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" class="size-14 mx-auto">
            <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
          </svg>

        <h1 class="text-3xl font-bold text-green-700 mb-4 text-center tracking-tight">Payment Successful!</h1>
        <p class="text-gray-700 mb-6 line-clamp-2 text-center ">Thank you for your purchase. Here are the details of your transaction:</p>
        <div class="space-y-4">
            <div class="flex justify-between border-gray-300 border-b pb-3 capitalize">
                <span class="font-medium text-gray-900 font-bold">Name:</span>
                <span >{{ $pricing->name }}</span>
            </div>
            <div class="flex justify-between border-gray-300 border-b pb-3 ">
                <span class="font-medium text-gray-900 font-bold">Amount:</span>
                <span>${{ number_format($pricing->amount, 2) }}</span>
            </div>
            <div class="flex justify-between border-gray-300 border-b pb-3 ">
                <span class="font-medium text-gray-900 font-bold">Characters:</span>
                <span>+{{ $pricing->char }}</span>
            </div>
            <div class="flex justify-between pb-3 ">
                <span class="font-medium text-gray-900">Payment Method:</span>
                <span>{{-- {{ $checkout_session->payment_method_types[0] }} --}}Stripe</span>
            </div>
        </div>
        <div class="mt-6 text-center">
            <a href="/" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Return to Home
            </a>
        </div>
    </div>
</div>

    {{-- <div class="container mx-auto px-4 py-16">
        <div class="flex flex-col items-center justify-center">
            <svg class="w-20 h-20 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            <h1 class="text-2xl font-bold text-gray-800">Payment Successful</h1>
            <p class="text-gray-600">Your payment has been processed successfully. Thank you for your purchase.</p>
            <div class="my-6 border-ui-1  text-center">
                <div class=" grid grid-cols-3 gap-x-9 font-bold border-ui-bottom-1 px-6 py-4">
                     <div>Name</div>
                     <div>Amount</div>
                     <div>Characters</div>

                </div>
                <div class="grid grid-cols-3 px-6 py-4 gap-x-9 font-light">
                    <div>{{$pricing->name}}</div>
                    <div>{{$pricing->amount}}$</div>
                    <div>+{{$pricing->char}}</div>
                </div>

            </div>
            <a href="" class="btn btn-primary mt-8">Go to History</a>
        </div>
    </div> --}}

@endsection
