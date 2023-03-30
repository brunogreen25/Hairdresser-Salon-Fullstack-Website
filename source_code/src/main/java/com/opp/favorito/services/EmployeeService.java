package com.opp.favorito.services;

import com.opp.favorito.models.Employee;
import com.opp.favorito.models.SalonService;
import com.opp.favorito.models.Location;
import com.opp.favorito.repository.EmployeeRepository;
import com.opp.favorito.services.interfaces.EmployeeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeService implements EmployeeServiceInterface {

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @Override
    public void addEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    @Override
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Optional<Employee> getEmployeeByEmail(String eMail){
        return employeeRepository.findByEmail(eMail);
    }

    @Override
    public void deleteEmployee(Employee employee){
        employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> getEmployeesBySalonServiceAndLocation(SalonService salonService, Location location) {
        return employeeRepository.findBySalonServicesAndLocation(salonService, location);
    }

    @Override
    public void changeSendMail(String employeeUsername, boolean sendMail) {
        int sendMailBit = sendMail ? 1 : 0;
        employeeRepository.updateSendMail(employeeUsername, sendMailBit);
    }

    @Override
    public int checkForMail(String employeeMail) {
        return employeeRepository.checkForMail(employeeMail);
    }

   /* public Set<Location> getAllLocations() {
        return employeeRepository.getAllLocations();
    }

    public List<List<SalonService>> getServicesByLocation(Location location) {
        return employeeRepository.getServicesByLocation(location);
    }*/
}


