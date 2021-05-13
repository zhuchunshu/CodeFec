<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsCommentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts_comment', function (Blueprint $table) {
            $table->id();
            $table->string('class',50)->comment('分类');
            $table->string('posts_id',255)->comment('帖子id');
            $table->longText('content',255)->comment('内容');
            $table->string('user_id',255)->comment('评论者id');
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
        Schema::dropIfExists('posts_comment');
    }
}
