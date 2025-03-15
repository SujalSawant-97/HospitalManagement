package com.example.HospitalManagement.Repository;
import com.example.HospitalManagement.Model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientRepository extends MongoRepository<Patient, String> {
    // You can add custom query methods if needed
}
