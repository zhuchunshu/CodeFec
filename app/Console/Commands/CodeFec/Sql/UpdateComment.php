<?php

namespace App\Console\Commands\CodeFec\Sql;

use App\Models\PostsComment;
use Illuminate\Console\Command;

class UpdateComment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CodeFec:SqlUp:Comment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '迁移评论数据库';

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
        $all = PostsComment::where([['class', 'topic'], ['topic_id', null]])->get();
        $bar = $this->output->createProgressBar(count($all));

        $bar->start();
        foreach ($all as $value) {
            PostsComment::where('id',$value->id)->update([
                'class' => null,
                'topic_id' => $value->comment_id,
                'comment_id' => null
            ]);
            $bar->advance();
        }
        $bar->finish();
        $this->info('更新完成!');
    }
}
