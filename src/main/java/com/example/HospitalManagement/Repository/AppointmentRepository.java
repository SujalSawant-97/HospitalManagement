package com.example.HospitalManagement.Repository;
import com.example.HospitalManagement.Model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByDoctorId(String doctorId); // Find appointments by doctorId
    List<Appointment> findByPatientId(String patientId); // Find appointments by patientId
}
