package com.example.HospitalManagement.Model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admins") // MongoDB collection name\
@Data
public class Admin {
    @Id
    private String id;
    private String username;
    private String password; // In real app, encrypt this! For now, simple.
}
