package com.hospital.hospital_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String patientName;
    private String patientContact;

    private String doctorName;

    private String date;
    private String time;

    private Integer queueNumber;

    private String status;

    private double fees;

    // ✅ CONSTRUCTORS
    public Appointment() {}

    public Appointment(String patientName, String patientContact, String doctorName, 
                     String date, String time, Integer queueNumber, String status, double fees) {
        this.patientName = patientName;
        this.patientContact = patientContact;
        this.doctorName = doctorName;
        this.date = date;
        this.time = time;
        this.queueNumber = queueNumber;
        this.status = status;
        this.fees = fees;
    }

    // ✅ GETTERS & SETTERS

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getPatientContact() { return patientContact; }
    public void setPatientContact(String patientContact) { this.patientContact = patientContact; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public Integer getQueueNumber() { return queueNumber; }
    public void setQueueNumber(Integer queueNumber) { this.queueNumber = queueNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getFees() { return fees; }
    public void setFees(double fees) { this.fees = fees; }
}