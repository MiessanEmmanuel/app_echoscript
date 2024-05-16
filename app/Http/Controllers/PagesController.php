<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class PagesController extends Controller
{
    public function index(){
        $voices = array(
            "Adam" => "pNInz6obpgDQGcFmaJgB",
            "Antoni" => "ErXwobaYiN019PkySvjV",
            "Arnold" => "VR6AewLTigWG4xSOukaG",
            "Bella" => "EXAVITQu4vr4xnSDxMaL",
            "Callum" => "N2lVS1w4EtoT3dr4eOWO",
            "Charlie" => "IKne3meq5aSn9XLyUdCD",
            "Charlotte" => "XB0fDUnXU5powFXDhCwa",
            "Clyde" => "2EiwWnXFnvU5JabPnv8n",
            "Daniel" => "onwK4e9ZLuTAKqWW03F9",
            "Dave" => "CYw3kZ02Hs0563khs1Fj",
            "Domi" => "AZnzlk1XvdvUeBnXmlld",
            "Dorothy" => "ThT5KcBeYPX3keUQqHPh",
            "Elli" => "MF3mGyEYCl7XYWbV9V6O",
            "Emily" => "LcfcDJNUP1GQjkzn1xUU",
            "Ethan" => "g5CIjZEefAph4nQFvHAz",
            "Fin" => "D38z5RcWu1voky8WS1ja",
            "Freya" => "jsCqWAovK2LkecY7zXl4",
            "Gigi" => "jBpfuIE2acCO8z3wKNLl",
            "Giovanni" => "zcAOhNBS3c14rBihAFp1",
            "Glinda" => "z9fAnlkpzviPz146aGWa",
            "Grace" => "oWAxZDx7w5VEj9dCyTzz",
            "Harry" => "SOYHLrjzK2X1ezoPC6cr",
            "James" => "ZQe5CZNOzWyzPSCn5a3c",
            "Jeremy" => "bVMeCyTHy58xNoL34h3p",
            "Jessie" => "t0jbNlBVZ17f02VDIeMI",
            "Joseph" => "Zlb1dXrM653N07WRdFW3",
            "Josh" => "TxGEqnHWrfWFTfGW9XjX",
            "Liam" => "TX3LPaxmHKxFdv7VOQHJ",
            "Matilda" => "XrExE9yKIg1WjnnlVkGX",
            "Matthew" => "Yko7PKHZNXotIFUBG7I9",
            "Michael" => "flq6f7yk4E4fJM5XTYuZ",
            "Mimi" => "zrHiDhphv9ZnVXBqCLjz",
            "Nicole" => "piTKgcLEGmPE4e6mEKli",
            "Patrick" => "ODq5zmih8GrVes37Dizd",
            "Rachel" => "21m00Tcm4TlvDq8ikWAM",
            "Ryan" => "wViXBPUzp2ZZixB1xQuM",
            "Sam" => "yoZ06aMxZJJ28mfd3POQ",
            "Serena" => "pMsXgVXv3BLzUgSXRplE",
            "Thomas" => "GBv7mTt0atIp3Br8iCZE"
        );

        return Inertia::render('Welcome', [
            'voices' => $voices,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function showHistory(){
        return Inertia::render('History');
    }

    public function getCsrfToken(){
        return csrf_token();
    }
}