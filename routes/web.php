<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PayoutController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TranscribedaudioController;






Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', [PagesController::class, 'index']);
    Route::get('/baseui', [PagesController::class, 'UiBaseShow']);
    Route::get('/history', [PagesController::class, 'showHistory'])->name('HISTORY');



    Route::get('/project', [PagesController::class, 'showHomeProject'])->name('project');
    Route::post('/create-project', [ProjectController::class, 'add'])->name('project.add');
    Route::post('/edit-project', [ProjectController::class, 'edit'])->name('project.edit');
    Route::post('/delete-project', [ProjectController::class, 'delete'])->name('project.delete');


    Route::get('/project/{id}/config', [PagesController::class, 'showConfigProjectOne'])->name('projectConfig');
    Route::get('/project/{id}', [PagesController::class, 'showProjectOne'])->name('projectOne');

    Route::get('/{id}-test-voice', [PagesController::class, 'showConfigVoiceParameter'])->name('testVoice');
    Route::post('/{id}-test-voice', [ProjectController::class, 'UpdateConfigVoiceParameter'])->name('testVoice.updateVoiceSettings');


    Route::get('/project{id}/chapters-history', [PagesController::class, 'showChapterHistory'])->name('chapter-history');
    Route::post('/project/add-chapter',[ProjectController::class, 'addChapter'])->name('chapter.add');
    Route::post('/project/edit-chapter',[ProjectController::class, 'editChapter'])->name('chapter.edit');
    Route::post('/project/delete-chapter',[ProjectController::class, 'deleteChapter'])->name('chapter.destroy');
    Route::post('/project/generate-chapter',[ProjectController::class, 'generateChapter'])->name('chapter.generate');



    Route::post('/text-to-speech', [TranscribedaudioController::class, 'generateTextAudio'])->name('text-to-speech');
    Route::post('/speech-to-speech', [TranscribedaudioController::class, 'generateSpeechAudio'])->name('speech-to-speech');
    Route::get('/download-audio', [TranscribedaudioController::class, 'downloadAudio']);




    Route::get('/pricing', [PayoutController::class, 'show'])->name('payouts');



    Route::get('/payment/{id}', [PaymentController::class, 'show'])->name('payment');
    Route::post('/payment/store',[PaymentController::class, 'store'])->name('paymentstore');
    Route::post('/payment/buy',[PaymentController::class, 'buyCharacter'])->name('payment.buyChar');

    Route::get('/succes-payment', [PaymentController::class, 'chargeSuccess'])->name('chargeSuccess');
    Route::get('/failed-payment', [PaymentController::class, 'chargeFailed'])->name('chargeFailed');




    Route::get('/csrf-token', [PagesController::class, 'getCsrfToken'])->name('CsrfToken');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
