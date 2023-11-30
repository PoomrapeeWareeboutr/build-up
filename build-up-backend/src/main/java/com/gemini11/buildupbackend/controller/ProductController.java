package com.gemini11.buildupbackend.controller;

import com.gemini11.buildupbackend.entity.ProductSnippet;
import com.gemini11.buildupbackend.entity.ResponseObject;
import com.gemini11.buildupbackend.entity.SizePoolObject;
import com.gemini11.buildupbackend.model.Product;
import com.gemini11.buildupbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @CrossOrigin
    @GetMapping("/findAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = new ArrayList<>();
        if (productService.getProducts() == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        productService.getProducts().forEach(products::add);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/findByName")
    public ResponseEntity<List<Product>> getAllProductsByName(@RequestParam("name") String name) {
        List<Product> products = productService.getProductsByName(name);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @CrossOrigin
    @GetMapping("/findByType")
    public ResponseEntity<List<Product>> getAllProductsByType(@RequestParam("category") String category) {
        List<Product> products = productService.getProductsByType(category);
        return ResponseEntity.status(HttpStatus.OK).body(products);
    }

    @CrossOrigin
    @GetMapping("/findMinPriceProductByNameAndIsBrandNew")
    public ResponseEntity<List<SizePoolObject>> findMinPriceProductByNameAndIsBrandNew(
            @RequestParam(name = "name") String name,
            @RequestParam(name = "is-brand-new") String isBrandNew
    ) {
        List<List<Object>> data = productService.getMinPriceProductByNameAndIsBrandNew(name, isBrandNew);

        List<SizePoolObject> pool = new ArrayList<>();
        if (data != null) {
            data.forEach(record -> pool.add(new SizePoolObject(
                    (String) record.get(0), (Boolean) record.get(1), (Integer) record.get(2), (String) record.get(3),
                    (String) record.get(4), (Double) record.get(5))));
        }
        return ResponseEntity.status(HttpStatus.OK).body(pool);
    }

    @CrossOrigin
    @GetMapping("/findBySizeWithMinPrice")
    public ResponseEntity<List<SizePoolObject>> getGroupSizeWithMinPrice(@RequestParam("name") String name, @RequestParam("is_brand_new") Boolean is_brand_new) {
        List<List<Object>> data = productService.getSizeWithMinPrice(name, is_brand_new);

        List<SizePoolObject> pool = new ArrayList<>();
        if (data != null) {
            data.forEach(record -> pool.add(new SizePoolObject(
                    (String) record.get(0), (Boolean) record.get(1), (Integer) record.get(2), (String) record.get(3),
                    (String) record.get(4), (Double) record.get(5))));
        }
        return ResponseEntity.status(HttpStatus.OK).body(pool);
    }

    @CrossOrigin
    @GetMapping("/groupByName")
    public ResponseEntity<ResponseObject> groupByName() {
        List<List<Object>> res = productService.groupByName();
        if (res == null) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.NOT_FOUND,
                    "",
                    null
            ), HttpStatus.NOT_FOUND);
        }

        Stream<ProductSnippet> data = res.stream().map(
                record -> new ProductSnippet((String) record.get(0), (String) record.get(1), (Double) record.get(2))
        );
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                data
        ), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/groupByName/{name}")
    public ResponseEntity<ResponseObject> findByNameInGroupName(@PathVariable("name") String name) {
        List<List<Object>> raw = productService.getByNameInGroupName(name);
        List<Object> data = raw.get(0);

        Map<String, String> product = new HashMap<>();
        product.put("name", (String) data.get(0));
        product.put("description", (String) data.get(1));

        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                product
        ), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/findProductsBySellerId/{id}")
    public ResponseEntity<List<Product>> getProductsBySellerId(@PathVariable("id") int sellerId) {
        List<Product> products = new ArrayList<>();
        if (productService.getProductsBySellerId(sellerId) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        productService.getProductsBySellerId(sellerId).forEach(products::add);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/findProductsByProductId/{id}")
    public ResponseEntity<Product> getProductsByProductId(@PathVariable("id") int productId) {
        Product product = productService.getProductById(productId);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @GetMapping("/findProductsByUsername/{username}")
    public ResponseEntity<List<Product>> getProductsByUsername(@PathVariable("username") String username) {
        List<Product> products = (List<Product>) productService.getProductsByUsername(username);
        if (products == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            List<Product> availableProducts = new ArrayList<>();
            products.forEach(each -> {
                if (each.getPurchaseDate() == null) {
                    availableProducts.add(each);
                }
            });
            return new ResponseEntity<>(availableProducts, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/addProduct/{username}")
    public ResponseEntity<Product> addProduct(@RequestBody Product _product, @PathVariable("username") String username) {
        Product product = productService.addProduct(_product, username);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        }
    }

    @CrossOrigin
    @PutMapping("/editProduct/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable("id") int id, @RequestBody Product _product) {
        _product.setAccount(productService.getProductById(id).getAccount());

        Product product = productService.editProduct(id, _product);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") int _id) {
        Integer id = productService.deleteProduct(_id);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
