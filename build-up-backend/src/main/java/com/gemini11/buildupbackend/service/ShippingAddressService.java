package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.ShippingAddress;

public interface ShippingAddressService {
    Iterable<ShippingAddress> getShippingAddresses();

    Iterable<ShippingAddress> getShippingAddressesByAccountId(int userId);

    ShippingAddress getShippingAddressesById(int id);

    ShippingAddress addShippingAddress(ShippingAddress shippingAddress);

    ShippingAddress editShippingAddress(int id, ShippingAddress shippingAddress);

    Integer deleteShippingAddressById(int id);
}
