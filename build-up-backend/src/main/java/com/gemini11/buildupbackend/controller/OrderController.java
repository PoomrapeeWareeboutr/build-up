package com.gemini11.buildupbackend.controller;

import com.gemini11.buildupbackend.entity.BuyerCheckoutDTO;
import com.gemini11.buildupbackend.entity.LoginTokenDTO;
import com.gemini11.buildupbackend.entity.OrderAndOrderItem;
import com.gemini11.buildupbackend.entity.ResponseObject;
import com.gemini11.buildupbackend.model.*;
import com.gemini11.buildupbackend.repository.OrderRepository;
import com.gemini11.buildupbackend.repository.StatusRepository;
import com.gemini11.buildupbackend.service.*;
import com.gemini11.buildupbackend.utility.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    AccountService accountService;

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    ShippingAddressService shippingAddressService;

    @Autowired
    CreditCardService creditCardService;

    @Autowired
    BankAccountService bankAccountService;

    @Autowired
    ProductService productService;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("/findAll")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        if (orderService.getOrders() == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        orderService.getOrders().forEach(orders::add);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
    }

    @GetMapping("/findOrdersByAccountId/{id}")
    public ResponseEntity<List<Order>> getOrdersByAccountId(@PathVariable("id") int accountId) {
        List<Order> orders = new ArrayList<>();
        if (orderService.getOrdersByAccountId(accountId) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        orderService.getOrdersByAccountId(accountId).forEach(orders::add);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }
    }

    @PostMapping("/addOrder")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order order1 = orderService.addOrder(order);
        if (order1 == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(order1, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable("id") int id) {
        Integer idd = orderService.deleteOrder(id);
        if (idd == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @CrossOrigin
    @PostMapping("/checkout")
    public ResponseEntity<ResponseObject> checkout(@RequestBody BuyerCheckoutDTO checkoutDTO) {
        // validate the token first, is user authorized to the system?.
        String username = new JwtHelper().extractUsernameFromToken(checkoutDTO.token());
        if (username == null) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "Token is invalid.",
                    null
            ), HttpStatus.BAD_REQUEST);
        }

        Order newOrder = new Order();
        newOrder.setOrderDate(LocalDateTime.now());

        // check balance in the credit card or bank account based on user's choice.
        Double balance = 0.00;
        CreditCard creditCard = null;
        if (checkoutDTO.creditCardId().isPresent()) {
            creditCard = creditCardService.getCreditCardById(checkoutDTO.creditCardId().get());
            newOrder.setCreditCard(creditCard);
            balance = creditCard.getBalance();
        }

        BankAccount bankAccount = null;
        if (checkoutDTO.bankAccountId().isPresent()) {
            bankAccount = bankAccountService.getBankAccountById(checkoutDTO.bankAccountId().get());
            newOrder.setBankAccount(bankAccount);
            balance = bankAccount.getBalance();
        }

        // if the balance is not enough then return bad request.
        if (balance < checkoutDTO.totalPrice()) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "Insufficient balance.",
                    null
            ), HttpStatus.BAD_REQUEST);
        }

        // set order information.
        newOrder.setStatus(statusRepository.findByName("Ordered"));
        newOrder.setAccount(accountService.getAccountByUsername(username).orElse(null));
        newOrder.setShippingAddress(shippingAddressService.getShippingAddressesById(checkoutDTO.shippingAddressId()));
        List<OrderItem> items = new ArrayList<>();
        checkoutDTO.items().forEach(item -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(newOrder);
            orderItem.setProduct(productService.getProductById(item.itemId()));
            orderItem.setItemQuantity(item.quantity());
            items.add(orderItem);
        });
        newOrder.setOrderItems(items);
        orderService.addOrder(newOrder);

        // update the balance of user's credit card or bank account.
        if (creditCard != null) {
            creditCard.setBalance(creditCard.getBalance() - checkoutDTO.totalPrice());
            creditCardService.editCreditCard(checkoutDTO.creditCardId().get(), creditCard);
        }

        if (bankAccount != null) {
            bankAccount.setBalance(bankAccount.getBalance() - checkoutDTO.totalPrice());
            bankAccountService.editBankAccount(checkoutDTO.bankAccountId().get(), bankAccount);
        }

        // update the purchase_date of the products user bought.
        items.forEach(item -> {
            Integer productId = item.getProduct().getProductId();
            Product purchasedProduct = productService.getProductById(productId);
            purchasedProduct.setPurchaseDate(LocalDateTime.now());
            productService.editProduct(productId, purchasedProduct);
        });
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                newOrder
        ), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/findOrderByToken")
    public ResponseEntity<ResponseObject> getOrderByToken(@RequestBody LoginTokenDTO tokenDTO) {
        String username = new JwtHelper().extractUsernameFromToken(tokenDTO.token());
        if (username == null) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "",
                    null
            ), HttpStatus.BAD_REQUEST);
        }
        Optional<Account> account = accountService.getAccountByUsername(username);
        if (account.isEmpty()) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "",
                    null
            ), HttpStatus.BAD_REQUEST);
        }

        List<List<Object>> data = orderRepository.findOrderByAccountId(account.get().getAccountId());
        List<OrderAndOrderItem> orders = new ArrayList<>();
        data.forEach(each -> orders.add(new OrderAndOrderItem(
                (Integer) each.get(0), (Integer) each.get(1),
                (Integer) each.get(2), (Integer) each.get(3),
                (String) each.get(4), (String) each.get(5), (String) each.get(6),
                (Double) each.get(7), (Integer) each.get(8),
                (Boolean) each.get(9), LocalDateTime.ofInstant(((Date) each.get(10)).toInstant(), ZoneId.systemDefault())
        )));
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                orders
        ), HttpStatus.OK);
    }

}
