package com.gemini11.buildupbackend.repository;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    Iterable<Order> findByAccount(Optional<Account> user);

    @Query(value = """
            SELECT
                o.order_id,
                o.status_id,
                oi.order_item_id,
                oi.product_id,
                p.name,
                p.description,
                p.size,
                p.price,
                oi.item_quantity,
                p.is_brand_new,
                p.purchase_date
            FROM orders o
            INNER JOIN order_item oi on o.order_id = oi.order_id
            INNER JOIN account acc on o.owner_account_id = acc.account_id
            INNER JOIN product p on oi.product_id = p.product_id
            WHERE o.owner_account_id = :ownerAccountId
            """,
            nativeQuery = true
    )
    List<List<Object>> findOrderByAccountId(@Param("ownerAccountId") Integer ownerAccountId);
}
