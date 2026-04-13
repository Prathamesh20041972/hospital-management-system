package com.hospital.hospital_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.hospital_management.model.Appointment;
import com.hospital.hospital_management.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repo;

    public Appointment save(Appointment a) {
        a.setStatus("ACTIVE");
        a.setFees(500);
        return repo.save(a);
    }
    public int getQueueCount(String doctorName, String date) {
    return repo.countByDoctorNameAndDateAndStatus(
        doctorName,
        date,
        "ACTIVE"
    );
}
}