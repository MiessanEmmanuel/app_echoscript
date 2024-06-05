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
        Schema::table('chapter_projects', function (Blueprint $table) {
            $table->text('similary')->nullable();
            $table->text('speaker_boost')->nullable();
            $table->text('style')->nullable();
            $table->text('stability')->nullable();
            $table->text('voice')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chapter_projects', function (Blueprint $table) {
            $table->text('similary')->nullable();
            $table->text('speaker_boost')->nullable();
            $table->text('style')->nullable();
            $table->text('stability')->nullable();
        });
    }
};
