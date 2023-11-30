package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.Order;

public interface OrderService {
    Iterable<Order> getOrders();

    Iterable<Order> getOrdersByAccountId(int userId);

    Order addOrder(Order order);

    Integer deleteOrder(int id);
}
