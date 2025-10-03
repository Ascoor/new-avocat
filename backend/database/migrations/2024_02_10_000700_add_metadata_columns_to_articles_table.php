<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('tag_ar')->nullable()->after('title_en');
            $table->string('tag_en')->nullable()->after('tag_ar');
            $table->text('summary_ar')->nullable()->after('tag_en');
            $table->text('summary_en')->nullable()->after('summary_ar');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['tag_ar', 'tag_en', 'summary_ar', 'summary_en']);
        });
    }
};
