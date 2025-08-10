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
        Schema::create('unclients', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_04_12_045550_create_unclients_table.php ======
$table->id();

            $table->string('slug')->unique();
            $table->string('name');
            $table->string('email')->unique()->nullable();
            $table->string('phone_number');
            $table->string('address')->nullable();
            $table->string('work')->nullable();
            $table->string('emergency_number')->nullable();
            $table->date('date_of_birth');
            $table->enum('gender', ['ذكر', 'أنثى'])->nullable();
            $table->enum('religion', ['مسلم', 'مسيحي']) ->nullable();
            $table->string('identity_number', 14)->unique();
            $table->timestamps();
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unclients');
    }
};
