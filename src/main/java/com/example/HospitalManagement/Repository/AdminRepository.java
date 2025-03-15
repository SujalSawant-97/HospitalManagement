package com.example.HospitalManagement.Repository;
import com.example.HospitalManagement.Model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByUsername(String username); // Example: Find admin by username
}
