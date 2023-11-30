package com.gemini11.buildupbackend.service.implement;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.ShippingAddress;
import com.gemini11.buildupbackend.repository.AccountRepository;
import com.gemini11.buildupbackend.repository.ShippingAddressRepository;
import com.gemini11.buildupbackend.service.ShippingAddressService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ShippingAddressServiceImpl implements ShippingAddressService {

    @Autowired
    ShippingAddressRepository shippingAddressRepository;

    @Autowired
    AccountRepository userRepository;

    @Override
    public Iterable<ShippingAddress> getShippingAddresses() {

        try {
            return shippingAddressRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Iterable<ShippingAddress> getShippingAddressesByAccountId(int userId) {
        try {
            Optional<Account> user = userRepository.findByAccountId(userId);
            if (user.isPresent()) {
                return shippingAddressRepository.findByAccount(user);
            } else {
                return Collections.emptyList();
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ShippingAddress getShippingAddressesById(int id) {
        return shippingAddressRepository.findById(id).orElse(null);
    }

    @Override
    public ShippingAddress addShippingAddress(ShippingAddress shippingAddress) {
        try {
            return shippingAddressRepository.save(shippingAddress);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ShippingAddress editShippingAddress(int id, ShippingAddress shippingAddress) {
        Optional<ShippingAddress> shippingAddress1 = shippingAddressRepository.findById(id);

        if (shippingAddress1.isPresent()) {
            ShippingAddress shippingAddress2 = shippingAddress1.get();
            shippingAddress2.setName(shippingAddress.getName());
            shippingAddress2.setCountry(shippingAddress.getCountry());
            shippingAddress2.setDetail(shippingAddress.getDetail());
            shippingAddress2.setDistrict(shippingAddress.getDistrict());
            shippingAddress2.setPhone(shippingAddress.getPhone());
            shippingAddress2.setPostcode(shippingAddress.getPostcode());
            shippingAddress2.setProvince(shippingAddress.getProvince());
            shippingAddress2.setSubDistrict(shippingAddress.getSubDistrict());
            return shippingAddressRepository.save(shippingAddress2);
        } else {
            return null;
        }
    }

    @Override
    public Integer deleteShippingAddressById(int id) {
        try {
            shippingAddressRepository.deleteById(id);
            return id;
        } catch (Exception e) {
            return null;
        }
    }
}
