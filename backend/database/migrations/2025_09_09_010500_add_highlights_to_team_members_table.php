<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('team_members', function (Blueprint $table) {
            $table->json('highlights_ar')->nullable()->after('bio_en');
            $table->json('highlights_en')->nullable()->after('highlights_ar');
        });
    }

    public function down(): void
    {
        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn(['highlights_ar', 'highlights_en']);
        });
    }
};
