package com.gemini11.buildupbackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gemini11.buildupbackend.entity.LoginTokenDTO;
import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.ShippingAddress;
import com.gemini11.buildupbackend.service.AccountService;
import com.gemini11.buildupbackend.service.ShippingAddressService;
import com.gemini11.buildupbackend.utility.JwtHelper;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class ShippingAddressControllerTest {

    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    @Nested
    class testGetShippingAddressByToken {

        @Mock
        ShippingAddressService shippingAddressService;

        @Mock
        AccountService accountServiceMock;

        @InjectMocks
        ShippingAddressController shippingAddressController;

        ObjectMapper objectMapper;

        LoginTokenDTO tokenDTO;

        private MockMvc mockMvc;

        @BeforeAll
        public void setup() {
            this.mockMvc = MockMvcBuilders.standaloneSetup(shippingAddressController).build();
            objectMapper = new ObjectMapper();
            tokenDTO = new LoginTokenDTO(new JwtHelper().generateToken("mon123"));
        }

        @Test
        public void testGivenTokenWithNullUsername() throws Exception {
            LoginTokenDTO tokenDTO = new LoginTokenDTO(new JwtHelper().generateToken(null));

            mockMvc.perform(MockMvcRequestBuilders.post("/api/shippingAddress/findShippingAddressByToken")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(tokenDTO)))
                    .andExpect(MockMvcResultMatchers.status().isBadRequest())
                    .andReturn();
        }

        @Test
        public void testGivenAccountEmpty() throws Exception {
            when(accountServiceMock.getAccountByUsername("mon123")).thenReturn(Optional.empty());

            mockMvc.perform(MockMvcRequestBuilders.post("/api/shippingAddress/findShippingAddressByToken")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(tokenDTO)))
                    .andExpect(MockMvcResultMatchers.status().isBadRequest())
                    .andReturn();
        }

        @Test
        public void testGivenAccountHasEmptyShippingAddress() throws Exception {
            Iterable<ShippingAddress> addresses = Collections.emptyList();
            Account account = new Account("mon123", "password");
            account.setAccountId(11);

            when(accountServiceMock.getAccountByUsername(account.getUsername())).thenReturn(Optional.of(account));

            when(shippingAddressService.getShippingAddressesByAccountId(account.getAccountId())).thenReturn(addresses);

            mockMvc.perform(MockMvcRequestBuilders.post("/api/shippingAddress/findShippingAddressByToken")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(tokenDTO)))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andReturn();
        }

        @Test
        public void testGivenAccountHasShippingAddress() throws Exception {

            Account account1 = new Account("mon123", "password");
            account1.setAccountId(11);
            List<ShippingAddress> addresses = new java.util.ArrayList<>(Collections.emptyList());
            addresses.add(new ShippingAddress());
            addresses.add(new ShippingAddress());

            when(accountServiceMock.getAccountByUsername(account1.getUsername())).thenReturn(Optional.of(account1));

            when(shippingAddressService.getShippingAddressesByAccountId(account1.getAccountId())).thenReturn(addresses);

            mockMvc.perform(MockMvcRequestBuilders.post("/api/shippingAddress/findShippingAddressByToken")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(tokenDTO)))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andReturn();

        }

        @AfterEach
        public void teardown() {
            Mockito.reset(accountServiceMock);
        }

    }

}
