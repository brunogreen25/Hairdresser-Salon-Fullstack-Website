package com.opp.favorito.controllers;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Reservation;
import com.opp.favorito.models.SalonService;
import com.opp.favorito.models.dto.RegistrateClientDTO;
import com.opp.favorito.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class MailController {

    @Autowired
    private EmailService emailService;

    public void sendMail(Reservation reservation) {
        int sendMail = reservation.getEmployee().isSendMail();
        if(sendMail == 0) {
            return;
        }

        int timeLongH = reservation.getStartTime().getHours() - 1;
        int timeLongM = reservation.getStartTime().getMinutes();

        int dateInt = reservation.getDate().getDate();
        int monthInt = reservation.getDate().getMonth() + 1;
        int yearInt = reservation.getDate().getYear() + 1900;

        String date = String.valueOf(dateInt) + "/" + String.valueOf(monthInt) + "/" + String.valueOf(yearInt);
        String time = String.valueOf(timeLongH) + ":" + String.valueOf(timeLongM);

        String address = reservation.getEmployee().getLocation().getAddress();
        String city = reservation.getEmployee().getLocation().getCity();

        Employee employee = reservation.getEmployee();
        String employeeName = employee.getName();
        String employeeSurname = employee.getSurname();
        String employeeMail = employee.getEmail();

        Client client = reservation.getClient();
        String clientName = client.getName();
        String clientSurname = client.getSurname();
        String clientMail = client.getEmail();

        //region setting email
        String toEmail = employeeMail;
        String subject = "Nova rezervacija";

        StringBuilder sbMessage = new StringBuilder();
        sbMessage.append("Poštovani " + employeeName + " " + employeeSurname + ",\n");
        sbMessage.append("Klijent " + clientName + " " + clientSurname + " je rezervirao termin " + date + " u " + time + "0.\n");
        sbMessage.append("Klijenta možete kontaktirati na e-mail: " + clientMail + ".\n");
        sbMessage.append("Vidimo se na lokaciji " + address + ", " + city + "!");
        String message = sbMessage.toString();

        emailService.sendMail(toEmail, subject, message);
        //endregion
    }

    public void sendMailToEmployee(Employee employee) {
        String employeeName = employee.getName();
        String employeeSurname = employee.getSurname();
        String employeeUsername = employee.getEmail();
        String employeePassword = employee.getPassword();

        String employeeLoc = employee.getLocation().getAddress() + ", " + employee.getLocation().getCity();
        Set<SalonService> employeeJobs = employee.getSalonServices();
        StringBuilder employeeJobsStr = new StringBuilder();
        for(SalonService s : employeeJobs) {
            employeeJobsStr.append(s.getName());
            employeeJobsStr.append(", ");
        }
        employeeJobsStr.setLength(employeeJobsStr.length() - 2);


        StringBuilder sbMessage = new StringBuilder();
        sbMessage.append("Poštovani " + employeeName + " " + employeeSurname + ",\n");
        sbMessage.append("Upravo vam je otvoren korisnički račun sa usernameom: " + employeeUsername + " i lozinkom: " + employeePassword + ".\n");
        sbMessage.append("Radno mjesto Vam je zabilježeno na lokaciji: " + employeeLoc + ".\n");
        sbMessage.append("Navedeni su Vam poslovi: " + employeeJobsStr.toString() + ".\n");
        sbMessage.append("Lijep pozdrav i ugodan dan!");

        String toEmail = employeeUsername;
        String subject = "Otvoren korisnički račun";
        String message = sbMessage.toString();

        emailService.sendMail(toEmail, subject, message);
    }

    public void sendMailToClient(RegistrateClientDTO registrateClientDTO) {
        String clientUsername = registrateClientDTO.geteMail();
        String clientPassword = registrateClientDTO.getPassword();

        String clientName = registrateClientDTO.getName();
        String clientSurname = registrateClientDTO.getSurname();

        StringBuilder sbMessage = new StringBuilder();
        sbMessage.append("Poštovani " + clientName + " " + clientSurname + ",\n");
        sbMessage.append("Otvoren Vam je korisnički račun sa username-om: " + clientUsername + " i lozinkom: " + clientPassword + ".\n");
        sbMessage.append("Lijep pozdrav i ugodan dan!");

        String message = sbMessage.toString();
        String toEmail = clientUsername;
        String subject = "Otvoren korisnički račun";

        emailService.sendMail(toEmail, subject, message);
    }
}
