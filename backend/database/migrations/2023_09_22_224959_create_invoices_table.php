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
        Schema::create('invoices', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_09_22_224959_create_invoices_table.php ======
$table->id();
            $table->unsignedBigInteger('leg_case_id')->nullable();
            $table->unsignedBigInteger('service_id')->nullable( );
            $table->string('invoice_number');
            $table->enum('status', ['Draft', 'Sent', 'Paid', 'Overdue']);
            $table->date('issue_date');
            $table->date('due_date');
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->foreign('leg_case_id')->references('id')->on('leg_cases')->onDelete('cascade');
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
