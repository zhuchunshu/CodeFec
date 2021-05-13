<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDengjiLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dengji_log', function (Blueprint $table) {
            $table->id();
            $table->string('user_id',255);
            $table->string('value',999)->nullable();
            $table->string('num',999);
            $table->string('type',50)->default('+');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dengji_log');
    }
}
