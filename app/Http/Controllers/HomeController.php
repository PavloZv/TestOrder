<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderForm;
use App\Models\Order;

/**
 * Class HomeController
 * @package App\Http\Controllers
 */
class HomeController
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function orders()
    {
        $orders = (new Order())->getOrders();

        return response()->json(['data' => $orders]);
    }

    /**
     * @param OrderForm $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createOrder(OrderForm $request)
    {
        $result = (new Order())->createOrder($request->input());
        return response()->json(['status' => 'ok', 'id' => $result]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOrder($id)
    {
        return response()->json(['order' => Order::find($id)]);
    }

    /**
     * @param OrderForm $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOrder(OrderForm $request, $id)
    {
        $result = (new Order())->updateOrder($id, $request->input());
        return response()->json(['status' => 'ok', 'orderId' => $result]);
    }
}
