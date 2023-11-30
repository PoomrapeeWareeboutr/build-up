package com.gemini11.buildupbackend.controller;

import com.gemini11.buildupbackend.model.OrderItem;
import com.gemini11.buildupbackend.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orderitem")
public class OrderItemController {

    @Autowired
    OrderItemService orderItemService;

    @GetMapping("/findAll")
    public ResponseEntity<List<OrderItem>> getAllOrderItems() {
        List<OrderItem> orderItems = new ArrayList<>();
        if (orderItemService.getOrderItems() == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        orderItemService.getOrderItems().forEach(orderItems::add);
        if (orderItems.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(orderItems, HttpStatus.OK);
        }
    }

    @PostMapping("/addOrderItem")
    public ResponseEntity<OrderItem> addOrderItem(@RequestBody OrderItem _orderItem) {
        OrderItem orderItem = orderItemService.addOrderItem(_orderItem);
        if (orderItem == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(orderItem, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteOrderItem(@PathVariable("id") int _id) {
        Integer id = orderItemService.deleteOrderItem(_id);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
