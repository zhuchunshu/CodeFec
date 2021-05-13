<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Dcat\Admin\Traits\HasDateTimeFormatter;


class Plugin extends Model
{
	use HasDateTimeFormatter;
    protected $cacheCooldownSeconds = 86400;
    protected $table = 'plugin';
    public $timestamps = true;
    
}
