<?php

namespace App\Console\Commands\CodeFec;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use Dcat\Admin\Models\AdminTablesSeeder;

class Install extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CodeFec:Install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'CodeFec 安装';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if (PHP_VERSION >= "7.3.0") {
            if (config('app.url') == "网站地址") {
                $web_url = $this->ask('网站地址(https://www.codefec.com)');
                if ($this->confirm('是不是https站点?(否则可能导致无法访问后台)')) {
                    $this->modifyEnv([
                        "ADMIN_HTTPS" => "true",
                    ]);
                }
                $database = [];
                $database['name'] = $this->ask('数据库名');
                $database['user'] = $this->ask('数据库用户名');
                $database['pwd'] = $this->ask('数据库密码');

                // $smtp = [];
                // $smtp['host'] = $this->ask('smtp主机地址(smtp.qq.com)');
                // $smtp['port'] = $this->ask('smtp端口(465,25或其他)');
                // $smtp['user'] = $this->ask('smtp发信邮箱用户名(example@qq.com)');
                // $smtp['pwd'] = $this->ask('smtp发信邮箱密码(授权码)');
                // $smtp['en'] = $this->ask('smtp认证方式(ssl、tsl)');
                $env = [
                    'APP_URL' => $web_url,
                    'DB_DATABASE' => $database['name'],
                    'DB_USERNAME' => $database['user'],
                    'DB_PASSWORD' => $database['pwd'],
                    // 'MAIL_HOST' => $smtp['host'],
                    // 'MAIL_PORT' => $smtp['port'],
                    // 'MAIL_USERNAME' => $smtp['user'],
                    // 'MAIL_PASSWORD' => $smtp['pwd'],
                    // 'MAIL_ENCRYPTION' => $smtp['en']
                ];
                $this->modifyEnv($env);
                Artisan::call('key:generate');
                $this->info('配置成功! 如果需要修改配置请编辑网站根目录下.env文件');
                $this->info('请重新运行脚本进行数据库迁移');
                $this->error('请重新运行脚本进行数据库迁移');
                $this->error('请重新运行脚本进行数据库迁移');
                $this->error('请重新运行脚本进行数据库迁移');
            } else {
                Artisan::call('migrate --force');
                $this->info('数据库迁移成功!');
                $admin_group_name = $this->ask('站长所属用户组叫什么名字?');
                $default_group_name = $this->ask('默认用户组叫什么名字?');
                $default_group_id = Curd_UserGroup()->Cerated($default_group_name, 'default', 'blue', 1);
                $admin_group_id = Curd_UserGroup()->Cerated($admin_group_name, 'admin', 'indigo', 999);
                $this->info('用户组创建成功!');
                $this->info('加下来开始创建管理员账号!');
                $username = $this->ask('管理员用户名', 'admin');
                $email = $this->ask('注册邮箱');
                $password = $this->ask('密码');
                User::create([
                    'username' => $username,
                    'email' => $email,
                    '_Token' => Str::random(15),
                    'jifen' => 10,
                    'reg_ip' => Helpers()->GetClientIp(),
                    'login_ip' => Helpers()->GetClientIp(),
                    'password' => Hash::make($password),
                ]);
                $this->info('用户创建成功!');
                $this->info('接下来调整用户组!');
                User::where('username', $username)->update([
                    'user_group' => $admin_group_id
                ]);
                File::put(base_path() . DIRECTORY_SEPARATOR . 'install.lock', 'CodeFec 已安装');
                $this->info('调整完毕!');
                $this->info('接下来创建独立后台!');
                $this->call('migrate');

                $userModel = config('admin.database.users_model');

                if ($userModel::count() == 0) {
                    $this->call('db:seed', ['--class' => AdminTablesSeeder::class]);
                }
                $pre = Str::random(6);
                $this->modifyEnv([
                    "ADMIN_ROUTE_PREFIX" => $pre,
                ]);
                Artisan::call("CodeFec:AdminInit");
                $this->info("创建完毕");
                if ($this->confirm('您是用的国内服务器吗?')) {
                    $url = "https://e.coding.net/codefec/codefec/CodeFec-Public.git";
                }else{
                    $url = "https://github.com/zhuchunshu/CodeFec-Public.git";
                }
                shell_exec("mkdir public && git clone ".$url." ".base_path("public"));
                $this->info("public 资源克隆成功");
                $this->info('本次安装结束。');
                $this->info("请按照教程进行下一步操作, 然后访问: " . config('app.url') . "/" . $pre . " 进入管理后台");
            }
        } else {
            $this->error('PHP版本必须大于7.3.0');
        }
    }
    public function modifyEnv(array $data)
    {
        $envPath = base_path() . DIRECTORY_SEPARATOR . '.env';

        $contentArray = collect(file($envPath, FILE_IGNORE_NEW_LINES));

        $contentArray->transform(function ($item) use ($data) {
            foreach ($data as $key => $value) {
                if (str_contains($item, $key)) {
                    return $key . '=' . $value;
                }
            }

            return $item;
        });

        $content = implode("\n", $contentArray->toArray());

        File::put($envPath, $content);
    }
}
