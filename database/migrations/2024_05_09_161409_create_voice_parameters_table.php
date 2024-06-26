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
        Schema::create('voice_parameters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('chapter_id');
            $table->string('parameter_name');
            $table->unsignedBigInteger('voice_id');
            $table->string('parameter_value');
            $table->timestamps();

            $table->foreign('chapter_id')->references('id')->on('chapter_projects')->onDelete('cascade');
            $table->foreign('voice_id')->references('id')->on('customized_voice')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voice_parameters');
    }
};
