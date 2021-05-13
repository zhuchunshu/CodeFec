<?php

namespace App\Admin\Repositories;

use App\Models\Plugin as Model;
use Dcat\Admin\Repositories\EloquentRepository;

class Plugin extends EloquentRepository
{
    /**
     * Model.
     *
     * @var string
     */
    protected $eloquentClass = Model::class;
}
