package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.OrderItem;

public interface OrderItemService {

    Iterable<OrderItem> getOrderItems();

    OrderItem addOrderItem(OrderItem orderItem);

    Integer deleteOrderItem(int id);

}
