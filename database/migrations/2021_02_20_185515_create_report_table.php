<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report', function (Blueprint $table) {
            $table->id();
            $table->string('class',99)->comment('分类');
            $table->string('posts_id',99)->comment('帖子id');
            $table->string('user_id',255)->comment('举报者id');
            $table->longText('content')->nullable()->comment('举报原因');
            $table->string('select',300)->nullable()->comment('举报类型');
            $table->string('zhuangtai',50)->default('发布')->comment('状态');
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
        Schema::dropIfExists('report');
    }
}
