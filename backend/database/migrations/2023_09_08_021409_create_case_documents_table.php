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
        Schema::create('case_documents', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_09_08_021409_create_case_documents_table.php ======
$table->id();
                $table->unsignedBigInteger('leg_case_id');
                $table->unsignedBigInteger('client_id')->nullable();
                $table->unsignedBigInteger('unclient_id')->nullable();
                $table->text('description');
                $table->string('file_path');
                $table->timestamps();


                $table->foreign('leg_case_id')->references('id')->on('leg_cases');
                $table->foreign('client_id')->references('id')->on('clients');
                $table->foreign('unclient_id')->references('id')->on('unclients');
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_documents');
    }
};
