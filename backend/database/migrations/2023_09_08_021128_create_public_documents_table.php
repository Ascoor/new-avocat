<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up()
    {
        // Create appeal_types table
       Schema::create('public_documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('service_id')->nullable();
            $table->string('file_path');
            $table->timestamps();

            $table->unsignedBigInteger('leg_case_id')->nullable();
            $table->foreign('leg_case_id')->references('id')->on('leg_cases');
            $table->foreign('service_id')->references('id')->on('services');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('public_documents');
    }
};