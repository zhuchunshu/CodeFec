<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic', function (Blueprint $table) {
            $table->id();
            $table->string('title',999)->comment('标题');
            $table->string('user_id',255)->comment('作者id');
            $table->string('node_id',255)->comment('节点id');
            $table->string('type',255)->comment('类型');
            $table->longText('content')->comment('正文内容');
            $table->string('publish',255)->default('草稿')->comment('发布状态');
            $table->integer('view')->comment('浏览量')->default('1');
            $table->integer('like')->comment('点赞量')->default('0');
            $table->string('token',255)->default(Str::random(15))->comment('秘钥');
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
        Schema::dropIfExists('topic');
    }
}
