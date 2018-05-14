<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/orders', 'HomeController@orders')->name('orders');
Route::post('/order', 'HomeController@createOrder')->name('createOrder');
Route::get('/order/{id}', 'HomeController@getOrder')->name('getOrder')->where('id', '\d+');
Route::post('/order/{id}', 'HomeController@updateOrder')->name('updateOrder')->where('id', '\d+');
