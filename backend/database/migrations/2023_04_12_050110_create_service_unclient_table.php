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
        Schema::create('service_unclient', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_04_12_050110_create_service_unclient_table.php ======
$table->id();
    $table->foreignId('service_id')->constrained()->onDelete('cascade');
    $table->foreignId('unclient_id')->constrained()->onDelete('cascade');
    $table->timestamps();
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_unclient');
    }
};
