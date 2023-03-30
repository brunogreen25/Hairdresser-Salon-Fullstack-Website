package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Location;
import com.opp.favorito.models.SalonService;
import com.opp.favorito.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface EmployeeServiceInterface {

    public List<Employee> getAllEmployees();

    public void addEmployee(Employee employee);

    public Optional<Employee> getEmployeeById(Long id);

    public Optional<Employee> getEmployeeByEmail(String eMail);

    public void deleteEmployee(Employee employee);

    public List<Employee> getEmployeesBySalonServiceAndLocation(SalonService salonService, Location location);

    public void changeSendMail(String employeeUsername, boolean sendMail);

    public int checkForMail(String employeeMail);
}


