package com.example.HospitalManagement.Service;
import com.example.HospitalManagement.Model.Admin;
import com.example.HospitalManagement.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}
