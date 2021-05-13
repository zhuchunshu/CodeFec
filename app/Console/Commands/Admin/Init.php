<?php

namespace App\Console\Commands\Admin;

use App\Models\User;
use Illuminate\Console\Command;
use Dcat\Admin\Models\Administrator;
use Illuminate\Support\Facades\DB;

class Init extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CodeFec:AdminInit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '初始化后台';

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
        if(Administrator::where('username' , 'admin')->count()){
            if(User::count()){
                Administrator::where('username' , 'admin')->update([
                    "username" => User::where('id',1)->first()->username,
                    "password" => User::where('id',1)->first()->password,
                    "avatar" => user_avatars(User::where('id',1)->first()->email,User::where('id',1)->first()->avatar)
                ]);
                DB::table('admin_menu')->where('id',7)->delete();
                DB::table('admin_permissions')->where('id',7)->delete();
                DB::table('admin_permissions')->where('id',6)->delete();
                $this->info("搞定");
            }else{
                $this->error("请不要花样作死");
            }
        }else{
            $this->error("无需重复执行");
        }
    }
}
