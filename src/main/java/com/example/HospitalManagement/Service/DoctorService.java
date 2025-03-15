package com.example.HospitalManagement.Service;

import com.example.HospitalManagement.Model.Doctor;
import com.example.HospitalManagement.Repository.DoctorRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor getDoctorById(ObjectId id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public void deleteDoctor(ObjectId id) {
        doctorRepository.deleteById(id);
    }
}
