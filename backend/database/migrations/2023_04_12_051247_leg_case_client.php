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
        Schema::create('leg_case_client', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_04_12_051247_leg_case_client.php ======
$table->id();
            $table->unsignedBigInteger('leg_case_id');
            $table->unsignedBigInteger('client_id');



            $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leg_case_client');
    }
};
