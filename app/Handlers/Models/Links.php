<?php

namespace App\Handlers\Models;

use App\Models\Links as ModelsLinks;

class Links{

    public function get_all(){
        return ModelsLinks::where('class','zanzhushang')->get();
    }
    // 友情链接
    public function get__all(){
        return ModelsLinks::where('class','friend')->get();
    }

}
