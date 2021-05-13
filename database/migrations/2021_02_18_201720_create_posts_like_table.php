<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsLikeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts_like', function (Blueprint $table) {
            $table->id();
            $table->string('class',50)->comment('分类');
            $table->string('posts_id',255)->comment('帖子id');
            $table->string('type',90)->comment('类型')->default('like');
            $table->string('user_id',255)->comment('操作者id');
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
        Schema::dropIfExists('posts_like');
    }
}
