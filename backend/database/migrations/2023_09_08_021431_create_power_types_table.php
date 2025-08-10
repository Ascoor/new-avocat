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
        Schema::create('power_types', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_09_08_021431_create_power_types_table.php ======
$table->id();
            $table->string('name');
            $table->timestamps();
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('power_types');
    }
};
