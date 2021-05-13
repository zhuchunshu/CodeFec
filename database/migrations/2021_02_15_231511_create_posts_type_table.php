<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts_type', function (Blueprint $table) {
            $table->id();
            $table->string('name',255)->unique()->comment('类型名称');
            $table->string('color',50)->comment('颜色')->default('blue');
            $table->string('ename',255)->unique()->comment('英文名');
            $table->string('user_id',255)->comment('创建者id');
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
        Schema::dropIfExists('posts_type');
    }
}
