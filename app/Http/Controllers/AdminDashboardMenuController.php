<?php

namespace App\Http\Controllers;

use App\Models\AdminDashboardMenu;
use Illuminate\Http\Request;

class AdminDashboardMenuController extends Controller
{
    public function __construct()
    {
        $this->middleware(["auth","auth.admin"]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(AdminDashboardMenu::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return response()->json($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AdminDashboardMenu  $adminDashboardMenu
     * @return \Illuminate\Http\Response
     */
    public function show(AdminDashboardMenu $adminDashboardMenu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AdminDashboardMenu  $adminDashboardMenu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AdminDashboardMenu $adminDashboardMenu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AdminDashboardMenu  $adminDashboardMenu
     * @return \Illuminate\Http\Response
     */
    public function destroy(AdminDashboardMenu $adminDashboardMenu)
    {
        //
    }
}
