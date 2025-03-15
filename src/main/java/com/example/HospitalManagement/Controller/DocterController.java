package com.example.HospitalManagement.Controller;
import com.example.HospitalManagement.Model.Doctor;
import com.example.HospitalManagement.Service.DoctorService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DocterController {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/create")
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable ObjectId id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable ObjectId id) {
        doctorService.deleteDoctor(id);
    }

    // ... other doctor endpoints
}



