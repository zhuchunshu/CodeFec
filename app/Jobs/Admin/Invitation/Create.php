<?php

namespace App\Jobs\Admin\Invitation;

use Illuminate\Support\Str;
use Illuminate\Bus\Queueable;
use App\Models\invitationCode;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class Create implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $qianzhui;
    private $houzhui;
    private $shuliang;
    private $user_data;
    private $ip;
    public function __construct($qianzhui,$houzhui,$shuliang,$user_data,$ip)
    {
        $this->qianzhui = $qianzhui;
        $this->houzhui = $houzhui;
        $this->shuliang = $shuliang;
        $this->user_data = $user_data;
        $this->ip = $ip;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        for ($i=0; $i < $this->shuliang; $i++) { 
            $code = $this->qianzhui.Str::random(25).$i.$this->houzhui;
            invitationCode::insert([
                'user_id' => $this->user_data->id,
                'code' => $code,
                'created_ip' => $this->ip,
                'created_at' => date("Y-m-d H:i:s")
            ]);
        }
    }
}
