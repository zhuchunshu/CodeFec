<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTopicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('topic', function (Blueprint $table) {
            $table->string('zhuanzai',999)->nullable()->comment('转载');
            $table->string('tlou',999)->nullable()->comment('T楼(结束楼层)');
            $table->string('tlou_shuliang',999)->nullable()->comment('T楼奖品数量');
            $table->date("tlou_date")->nullable()->comment('T楼结束时间');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('topic', function (Blueprint $table) {
            $table->string('zhuanzai',999)->nullable()->comment('转载');
            $table->string('tlou',999)->nullable()->comment('T楼(结束楼层)');
            $table->string('tlou_shuliang',999)->nullable()->comment('T楼奖品数量');
            $table->date("tlou_date")->nullable()->comment('T楼结束时间');
        });
    }
}
