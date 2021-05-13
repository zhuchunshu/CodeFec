<?php

namespace App\Jobs\Admin\Invitation;

use App\Models\invitationCode;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ClearShiyong implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $get = invitationCode::where('zhuangtai','已使用')->get();
        foreach ($get as $value) {
            invitationCode::where(['id' => $value->id,'zhuangtai' => '已使用'])->delete();
        }
    }
}
