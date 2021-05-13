<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic_options', function (Blueprint $table) {
            $table->id();
            $table->string('type',255)->comment('类型');
            $table->string('topic_id',999)->comment('帖子id');
            $table->string('name',999)->nullable()->comment('名');
            $table->longText('content')->nullable()->comment('内容');
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
        Schema::dropIfExists('topic_options');
    }
}
