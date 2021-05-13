<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePostsCommentAddTopic extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts_comment', function (Blueprint $table) {
            $table->string('topic_id',255)->comment('帖子id')->nullable();
            $table->string('class',255)->nullable()->change();
            $table->renameColumn('posts_id', 'comment_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts_comment', function (Blueprint $table) {
            //
        });
    }
}
