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
        Schema::create('leg_case_court', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_04_23_054123_leg_case_court.php ======
$table->unsignedBigInteger('leg_case_id');
                $table->unsignedBigInteger('court_id')->nullable();
                $table->string('case_number')->nullable();
                $table->string('case_year')->nullable();

                $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
                $table->foreign('court_id')->references('id')->on('courts')->onDelete('cascade');
        // ====== END IMPORT ======
     });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leg_case_court');
    }
};

