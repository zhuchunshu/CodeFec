<?php

namespace App\Jobs\Admin\Users;

use App\Models\User;
use App\Models\UserGroup;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class GroupDelete implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * 用户组id
     */
    private $id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(int $id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach (User::where('user_group',$this->id)->get() as $value) {
            User::where('id',$value['id'])->update([
                'user_group' => 1
            ]);
            Curd_UserLog()->Insert("被动迁移用户组", $value['id']);
        }
        UserGroup::where('id',$this->id)->delete();
    }
}
