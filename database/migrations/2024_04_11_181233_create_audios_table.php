<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('transcribed_audios', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->string('voice');
            $table->enum('category', ['text-to-speech', 'speech-to-speech'])->default('text-to-speech');
            $table->text('url_transcribed_audio');
            $table->integer('stability');
            $table->integer('similarity_boost');
            $table->integer('style');
            $table->integer('use_speaker_boost');

            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audios');
    }
};
