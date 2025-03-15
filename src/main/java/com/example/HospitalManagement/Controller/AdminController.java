package com.example.HospitalManagement.Controller;


import com.example.HospitalManagement.Model.Admin;
import com.example.HospitalManagement.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @GetMapping("/username/{username}")
    public Admin getAdminByUsername(@PathVariable String username) {
        return adminService.getAdminByUsername(username);
    }

    // ... other admin endpoints (e.g., login - for simple example skip login for now)
}
