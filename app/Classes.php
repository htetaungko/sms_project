<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $fillable = [
        'class_name', 'section_name'
    ];

    public function students(){
    	return $this->hasMany('App\Student');
    }
}
