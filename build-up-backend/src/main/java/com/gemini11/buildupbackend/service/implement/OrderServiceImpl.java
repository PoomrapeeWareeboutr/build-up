package com.gemini11.buildupbackend.service.implement;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.Order;
import com.gemini11.buildupbackend.repository.AccountRepository;
import com.gemini11.buildupbackend.repository.OrderRepository;
import com.gemini11.buildupbackend.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AccountRepository accountRepository;

    @Override
    public Iterable<Order> getOrders() {
        try {
            return orderRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Iterable<Order> getOrdersByAccountId(int accountId) {
        try {
            Optional<Account> user = accountRepository.findByAccountId(accountId);
            if (user.isPresent()) {
                return orderRepository.findByAccount(user);
            } else {
                return Collections.emptyList();
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Order addOrder(Order order) {
        try {
            return orderRepository.save(order);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Integer deleteOrder(int id) {
        try {
            orderRepository.deleteById(id);
            return id;
        } catch (Exception e) {
            return null;
        }
    }
}
