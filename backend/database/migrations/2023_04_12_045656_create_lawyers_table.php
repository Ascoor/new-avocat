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
        Schema::create('lawyers', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_04_12_045656_create_lawyers_table.php ======
$table->id();
            $table->string('name');
            $table->date('birthdate');
            $table->string('identity_number')->unique();
            $table->string('law_reg_num')->unique();
            $table->enum('lawyer_class', ['نقض', 'إستئناف','إبتدائي','جدول عام']);
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();
            $table->enum('gender', ['ذكر', 'أنثى']);
            $table->string('address')->nullable();
            $table->enum('religion', ['مسلم', 'مسيحى']);
            $table->unsignedBigInteger('user_id')->nullable(); // Add user_id column
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Add a foreign key constraint
 
            $table->timestamps();
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lawyers');
    }
};
