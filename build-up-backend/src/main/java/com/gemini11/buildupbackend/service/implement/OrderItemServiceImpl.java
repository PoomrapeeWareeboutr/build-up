package com.gemini11.buildupbackend.service.implement;

import com.gemini11.buildupbackend.model.OrderItem;
import com.gemini11.buildupbackend.repository.OrderItemRepository;
import com.gemini11.buildupbackend.service.OrderItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public Iterable<OrderItem> getOrderItems() {

        try {
            return orderItemRepository.findAll();
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public OrderItem addOrderItem(OrderItem orderItem) {
        try {
            return orderItemRepository.save(orderItem);
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public Integer deleteOrderItem(int id) {

        try {
            orderItemRepository.deleteById(id);
            return id;
        } catch (Exception e) {
            return null;
        }
    }
}
