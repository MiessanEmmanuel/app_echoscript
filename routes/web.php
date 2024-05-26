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
    Route::post('/edit-project', [ProjectController::class, 'edit'])->name('EDIT_PROJECT');

    Route::get('/project/{id}/config', [PagesController::class, 'showConfigProjectOne'])->name('CONFIG_PROJECT');
    Route::get('/project/{id}', [PagesController::class, 'showProjectOne'])->name('PROJECT');

    Route::post('/project/add-chapter',[ProjectController::class, 'addChapter'])->name('add-chapter');
    Route::post('/project/edit-chapter',[ProjectController::class, 'editChapter'])->name('edit-chapter');
    Route::post('/project/delete-chapter',[ProjectController::class, 'deleteChapter'])->name('delete-chapter');
    Route::post('/project/generate-chapter',[ProjectController::class, 'generateChapter'])->name('generate-chapter');

    Route::post('/text-to-speech', [TranscribedaudioController::class, 'generateTextAudio'])->name('text-to-speech');
    Route::post('/speech-to-speech', [TranscribedaudioController::class, 'generateSpeechAudio'])->name('speech-to-speech');

    Route::get('/csrf-token', [PagesController::class, 'getCsrfToken'])->name('CsrfToken');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
