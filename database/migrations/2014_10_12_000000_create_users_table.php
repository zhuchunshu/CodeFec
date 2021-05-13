<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username',50)->comment('用户名');
            $table->string('email')->unique()->comment('邮箱');
            $table->timestamp('email_verified_at')->nullable()->comment('邮箱验证时间');
            $table->string('_Token',999)->comment('用户秘钥');
            $table->string('password')->comment('密码');
            $table->string('user_group',225)->comment('用户组id')->default('1');
            $table->string('jifen',255)->default('10')->comment('积分');
            $table->string('qianming',999)->nullable()->default("这个人没有签名")->comment('签名');
            $table->string('qq',11)->nullable()->comment('qq');
            $table->string('wechat',99)->nullable()->comment('微信');
            $table->string('telegram',150)->nullable()->comment('tg');
            $table->string('reg_ip',99)->comment('注册ip');
            $table->string('login_ip',99)->comment('登陆ip');
            $table->string('gongsi',255)->nullable()->comment('所在公司');
            $table->string('zhiwei',255)->nullable()->comment('职位');
            $table->string('website',999)->nullable()->comment('个人网站');
            $table->string('address',255)->nullable()->comment('所在地');
            $table->string('lv',999)->default("10")->comment('经验');
            $table->string('auth_github',999)->nullable();
            $table->string('auth_google',999)->nullable();
            $table->string('auth_qq',999)->nullable();
            $table->string('zhuangtai',999)->comment('状态')->default('正常'); //状态
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
