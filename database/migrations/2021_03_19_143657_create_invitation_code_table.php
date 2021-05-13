<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvitationCodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitationCode', function (Blueprint $table) {
            $table->id();
            $table->string('user_id',255)->comment('创建者用户id');
            $table->string('code',255)->comment('码');
            $table->string('zhuangtai',50)->default('未使用')->comment('使用状态');
            $table->string('use_id',255)->comment('使用者用户id')->nullable();
            $table->string('time',255)->comment('使用时间戳')->nullable();
            $table->ipAddress('use_ip')->comment('使用者用户ip')->nullable();
            $table->ipAddress('created_ip')->comment('创建者用户ip');
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
        Schema::dropIfExists('invitationCode');
    }
}
