package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.Product;

import java.util.List;

public interface ProductService {
    Iterable<Product> getProducts();

    Iterable<Product> getProductsBySellerId(int sellerId);

    Iterable<Product> getProductsByUsername(String username);

    Product getProductById(int id);

    Product addProduct(Product product, String username);

    Integer deleteProduct(int id);

    Product editProduct(int id, Product product);

    List<Product> getProductsByName(String name);

    List<Product> getProductsByType(String name);

    List<List<Object>> getMinPriceProductByNameAndIsBrandNew(String name, String isBrandNew);

    List<List<Object>> groupByName();

    List<List<Object>> getByNameInGroupName(String name);

    List<List<Object>> getSizeWithMinPrice(String name, Boolean is_brand_new);
}
