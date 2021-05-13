<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->comment('用户id');
            $table->integer('class_id')->comment('收藏分类id');
            $table->string('url',999)->nullable()->comment('链接');
            $table->string('type',100)->comment('类型');
            $table->integer('posts_id')->comment('帖子id')->nullable();
            $table->string('title',200)->comment('简要标题')->nullable();
            $table->text('text')->comment('简单介绍')->nullable();
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
        Schema::dropIfExists('collections');
    }
}
