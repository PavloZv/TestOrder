<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class Order
 * @package App\Models
 */
class Order extends Model
{
    protected $fillable = [
        'orderId',
        'customer',
        'provider',
        'type',
        'dateOfCreate',
        'dateOfDone',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getOrders()
    {
        return Order::all();
    }

    /**
     * @param $data
     * @return mixed
     */
    public function createOrder($data)
    {
        $data['orderId'] = $this->getOrderId($data);

        $result = Order::create($data);

        return $result->id;
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateOrder($id, $data)
    {
        $order = Order::find($id);
        if (!$order) {
            throw new NotFoundHttpException("Order with id: {$id} not found!");
        }

        if ($order->type !== $data['type']) {
            $order->orderId = $this->getOrderId($data);
        } elseif ($order->dateOfCreate !== (new \DateTime($data['dateOfCreate']))->format('Y-m-d H:i:s')) {
            $order->orderId = $this->getOrderId($data);
        }

        $order->customer = $data['customer'];
        $order->provider = $data['provider'];
        $order->type = $data['type'];
        $order->dateOfCreate = $data['dateOfCreate'];
        $order->dateOfDone = $data['dateOfDone'];
        $order->save();

        return $order->id;
    }

    /**
     * @param $data
     * @return string
     */
    private function getOrderId($data)
    {
        $createDate = new \DateTime($data['dateOfCreate']);
        $orderId = $data['type'][0] . '-';
        $orderId .= $createDate->format('ymd');

        $result = Order::where('type', $data['type'])
            ->whereMonth('dateOfCreate', '=', $createDate->format('m'))
            ->whereYear('dateOfCreate', '=', $createDate->format('Y'))
            ->count();

        if (empty($result)) {
            $orderId .= 1;
        } else {
            $orderId .= $result + 1;
        }

        return $orderId;
    }
}
