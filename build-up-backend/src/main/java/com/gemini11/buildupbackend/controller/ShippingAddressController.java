package com.gemini11.buildupbackend.controller;

import com.gemini11.buildupbackend.entity.LoginTokenDTO;
import com.gemini11.buildupbackend.entity.ResponseObject;
import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.ShippingAddress;
import com.gemini11.buildupbackend.service.AccountService;
import com.gemini11.buildupbackend.service.ShippingAddressService;
import com.gemini11.buildupbackend.utility.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shippingAddress")
public class ShippingAddressController {

    @Autowired
    ShippingAddressService shippingAddressService;

    @Autowired
    AccountService accountService;

    @GetMapping("/findAll")
    public ResponseEntity<List<ShippingAddress>> getShippingAddresses() {
        List<ShippingAddress> shippingAddresses = new ArrayList<>();
        if (shippingAddressService.getShippingAddresses() == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        shippingAddressService.getShippingAddresses().forEach(shippingAddresses::add);
        if (shippingAddresses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(shippingAddresses, HttpStatus.OK);
        }
    }

    @GetMapping("/findShippingAddressesByUserId/{id}")
    public ResponseEntity<List<ShippingAddress>> getShippingAddressesByAccountId(@PathVariable("id") int accountId) {
        List<ShippingAddress> shippingAddresses = new ArrayList<>();
        if (shippingAddressService.getShippingAddressesByAccountId(accountId) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        shippingAddressService.getShippingAddressesByAccountId(accountId).forEach(shippingAddresses::add);
        if (shippingAddresses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(shippingAddresses, HttpStatus.OK);
        }
    }

    @GetMapping("/findShippingAddressesById/{id}")
    public ResponseEntity<ShippingAddress> getShippingAddressesById(@PathVariable("id") int id) {
        ShippingAddress shippingAddress = shippingAddressService.getShippingAddressesById(id);
        if (shippingAddress == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(shippingAddress, HttpStatus.OK);
        }
    }

    @PostMapping("/addShippingAddress")
    public ResponseEntity<ShippingAddress> addShippingAddress(@RequestBody ShippingAddress shippingAddress) {
        ShippingAddress shippingAddress1 = shippingAddressService.addShippingAddress(shippingAddress);
        if (shippingAddress1 == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(shippingAddress1, HttpStatus.CREATED);
        }
    }

    @PostMapping("/editShippingAddress/{id}")
    public ResponseEntity<ShippingAddress> editShippingAddress(@PathVariable("id") int id, @RequestBody ShippingAddress shippingAddress) {
        ShippingAddress shippingAddress1 = shippingAddressService.editShippingAddress(id, shippingAddress);
        if (shippingAddress1 == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(shippingAddress1, HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteShippingAddress(@PathVariable("id") int id) {
        Integer idd = shippingAddressService.deleteShippingAddressById(id);
        if (idd == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @CrossOrigin
    @PostMapping("/findShippingAddressByToken")
    public ResponseEntity<ResponseObject> getShippingAddressByToken(@RequestBody LoginTokenDTO tokenDTO) {
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
        Iterable<ShippingAddress> addresses = shippingAddressService.getShippingAddressesByAccountId(
                account.get().getAccountId()
        );
        addresses.forEach(address -> address.setAccount(null));
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                addresses
        ), HttpStatus.OK);
    }
}
