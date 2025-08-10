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
        Schema::create('clients', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_04_12_045551_create_clients_table.php ======
$table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('address');
            $table->string('nationality')->nullable();
            $table->string('work')->nullable();
            $table->string('emergency_number')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['ذكر', 'أنثى']);
            $table->enum('religion', ['مسلم', 'مسيحي'])->default('مسلم');
            $table->string('identity_number', 14)->unique()->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
