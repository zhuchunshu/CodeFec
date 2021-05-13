<?php

namespace App\Handlers\Models;

use App\Models\Posts_type as Pt;


class Posts_Type{

    public function get_all(){
        return Pt::get();
    }
}
