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
        Schema::create('service_procedures', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_08_30_001553_create_service_procedures_table.php ======
$table->id();
            $table->unsignedBigInteger('service_id')->nullable(); 
            $table->string('title')->nullable();
            $table->unsignedBigInteger('lawyer_id');
            $table->text('job')->nullable();
            $table->text('procedure_place_name')->nullable();
            $table->unsignedBigInteger('procedure_place_type_id')->nullable();
            $table->longText('result')->nullable();
            $table->longText('note')->nullable();
            $table->enum('status', ['تمت', 'لم ينفذ', 'جارى التنفيذ'])->default('جارى التنفيذ');
     
            $table->unsignedBigInteger('event_id')->nullable();
           
            $table->foreign('event_id')->references('id')->on('events')->onDelete('set null');
            $table->date('date_start');
            $table->date('date_end');
            $table->decimal('cost1', 10, 2)->default(0)->nullable();
            $table->decimal('cost2', 10, 2)->nullable()->default(0);
            $table->decimal('cost3', 10, 2)->nullable()->default(0);
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('lawyer_id')->references('id')->on('lawyers')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_procedures');
    }
};
