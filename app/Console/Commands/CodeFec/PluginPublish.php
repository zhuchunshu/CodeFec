<?php

namespace App\Console\Commands\CodeFec;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class PluginPublish extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'Plugin:Publish';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '插件资源发布';

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
        Artisan::call("vendor:publish",[
            "--provider" => 'App\Providers\PluginServiceProvider'
        ]);
        $this->info("搞定");
    }
}
