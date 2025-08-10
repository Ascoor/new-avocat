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
        Schema::create('service_documents', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_09_08_021300_create_service_documents_table.php ======
$table->id();
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->string('file_path');
            $table->timestamps();

            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('client_id')->references('id')->on('clients');
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_documents');
    }
};
