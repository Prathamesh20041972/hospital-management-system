package com.hospital.hospital_management.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.hospital_management.model.Appointment;
import com.hospital.hospital_management.repository.AppointmentRepository;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentRepository repo;

    // ✅ GET ALL APPOINTMENTS
    @GetMapping
    public List<Appointment> getAllAppointments() {
        System.out.println("🔍 getAll() called");
        List<Appointment> appointments = new ArrayList<>();
        try {
            appointments = repo.findAll();
            System.out.println("✅ Found " + appointments.size() + " appointments");
            System.out.println("Appointments: " + appointments);
            
            // Log first appointment
            if (!appointments.isEmpty()) {
                Appointment first = appointments.get(0);
                System.out.println("First appointment: ID=" + first.getId() + ", Patient=" + first.getPatientName() + ", Doctor=" + first.getDoctorName() + ", Status=" + first.getStatus());
            }
        } catch (Exception e) {
            System.err.println("❌ ERROR in getAllAppointments: " + e.getMessage());
            System.err.println("Stack trace:");
            e.printStackTrace();
        }
        System.out.println("🔍 Returning " + appointments.size() + " appointments");
        return appointments;
    }

    // ✅ BOOK APPOINTMENT
    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody Appointment a) {

        // 🔧 default values (avoid null error)
        if (a.getStatus() == null) {
            a.setStatus("ACTIVE");
        }

        if (a.getFees() == 0) {
            a.setFees(500);
        }

        if (a.getQueueNumber() == 0) {
            a.setQueueNumber(1);
        }

        return repo.save(a);
    }

    // ✅ DELETE APPOINTMENT (optional)
    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted Successfully";
    }

    // ✅ COUNT APPOINTMENTS (for dashboard)
    @GetMapping("/count")
    public long getCount() {
        return repo.count();
    }

    // ✅ TOTAL REVENUE
    @GetMapping("/revenue")
    public double getRevenue() {
        return repo.findAll()
                .stream()
                .mapToDouble(a -> a.getFees())
                .sum();
    }
}