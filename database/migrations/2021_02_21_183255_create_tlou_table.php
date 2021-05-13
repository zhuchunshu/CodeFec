<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTlouTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tlou', function (Blueprint $table) {
            $table->id();
            $table->string('topic_id',255)->comment('帖子id');
            $table->string('user_id',255)->comment('获奖者id');
            $table->string('comment_id',255)->comment('评论id');
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
        Schema::dropIfExists('tlou');
    }
}
