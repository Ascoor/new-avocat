<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->json('value');
            $table->enum('type', ['text', 'image', 'link', 'html', 'list', 'json'])->default('text');
            $table->timestamps();

            $table->unique(['page_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_blocks');
    }
};
