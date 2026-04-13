package com.hospital.hospital_management.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReminderScheduler {

    @Scheduled(fixedRate = 60000) // every 1 minute
    public void sendReminder() {
        System.out.println("Checking appointments for reminders...");
    }
}