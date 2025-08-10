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
        Schema::create('payments', function (Blueprint $table) {
        // ====== START IMPORTED FROM 2023_09_22_224961_create_payments_table.php ======
$table->id();
            $table->unsignedBigInteger('invoice_id');
            $table->date('payment_date');
            $table->enum('payment_method', ['Cash', 'Card', 'Bank Transfer']);
            $table->decimal('amount', 10, 2);
            $table->timestamps();

            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
        // ====== END IMPORT ======
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
