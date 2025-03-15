package com.example.HospitalManagement.Repository;
import com.example.HospitalManagement.Model.Doctor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DoctorRepository extends MongoRepository<Doctor, ObjectId> {
    // You can add custom query methods if needed
}
