<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectionsClassTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collections_class', function (Blueprint $table) {
            $table->id();
            $table->string('name',999)->comment('名称');
            $table->text('remarks')->nullable()->comment('备注');
            $table->integer('user_id')->comment('用户id');
            $table->string('zhuangtai',50)->default('正常')->nullable()->comment('状态');
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
        Schema::dropIfExists('collections_class');
    }
}
