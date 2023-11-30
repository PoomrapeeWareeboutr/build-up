package com.gemini11.buildupbackend.repository;

import com.gemini11.buildupbackend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {

    Status findByName(String name);
}