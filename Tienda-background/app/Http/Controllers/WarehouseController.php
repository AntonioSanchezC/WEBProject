<?php

namespace App\Http\Controllers;

use App\Http\Resources\WarehouseCollection;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index()
    {
        return new WarehouseCollection(Warehouse::all());
    }

}
