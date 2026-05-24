<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = [
        'customer_id',
        'template_id',
        'session_code',
        'mode',
        'total_capture',
        'total_selected',
        'status',
        'final_file',
        'qr_code',
        'metadata',
        'started_at',
        'completed_at'
    ];
}
