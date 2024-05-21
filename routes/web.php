<?php

use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TranscribedaudioController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;






Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', [PagesController::class, 'index']);
    Route::get('/history', [PagesController::class, 'showHistory'])->name('HISTORY');


    Route::get('/project', [PagesController::class, 'showHomeProject'])->name('HOMEPROJECT');
    Route::post('/create-project', [ProjectController::class, 'add'])->name('ADD_PROJECT');
    Route::get('/project/{id}/config', [PagesController::class, 'showConfigProjectOne'])->name('CONFIG_PROJECT');
    Route::get('/project/{id}', [PagesController::class, 'showProjectOne'])->name('PROJECT');

    Route::post('/text-to-speech', [TranscribedaudioController::class, 'generateTextAudio'])->name('text-to-speech');
    Route::post('/speech-to-speech', [TranscribedaudioController::class, 'generateSpeechAudio'])->name('speech-to-speech');

    Route::get('/csrf-token', [PagesController::class, 'getCsrfToken'])->name('CsrfToken');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
