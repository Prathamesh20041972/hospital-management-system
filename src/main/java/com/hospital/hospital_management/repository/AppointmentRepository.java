package com.hospital.hospital_management.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.hospital_management.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    int countByDoctorNameAndDateAndStatus(String doctorName, String date, String status);
}