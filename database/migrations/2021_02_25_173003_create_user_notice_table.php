<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserNoticeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_notice', function (Blueprint $table) {
            $table->id();
            $table->string('user_id',255)->comment('接受者用户id');
            $table->string('form_id',255)->comment('发送至用户id')->nullable();
            $table->longText('content')->comment('内容');
            $table->string('zhuangtai',255)->nullable()->default('未查看');
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
        Schema::dropIfExists('user_notice');
    }
}
