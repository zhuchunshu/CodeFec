<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUserNoticeTableAddTu extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_notice', function (Blueprint $table) {
            $table->string('title',255)->nullable()->comment('标题'); 
            $table->string('url',900)->nullable()->comment('跳转网址');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_notice', function (Blueprint $table) {
            //
        });
    }
}
