package com.opp.favorito.controllers;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import com.opp.favorito.HashPassword;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.SalonService;
import com.opp.favorito.models.Location;
import com.opp.favorito.models.dto.*;
import com.opp.favorito.services.EmployeeService;
import com.opp.favorito.services.SalonServiceService;
import com.opp.favorito.services.LocationService;
import com.opp.favorito.services.interfaces.EmployeeServiceInterface;
import org.hibernate.event.spi.SaveOrUpdateEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/employee")
public class EmployeeController {
    private int employeePasswordLength = 10;
    private final String employeePasswordAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    @Autowired
    EmployeeServiceInterface employeeService;

    @GetMapping("")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/email:{eMail}")
    public ResponseEntity<Employee> getEmployeeByEmail(@PathVariable String eMail) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(eMail);
        if(!employee.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee.get());
    }

    @Autowired
    MailController mailController;

    @PostMapping("")
    public ResponseEntity<Void> addEmployee(@RequestBody Employee employee) {
        System.out.println(employee);
        mailController.sendMailToEmployee(employee);

        String hashedPassword = HashPassword.hashPassword(employee.getPassword());
        employee.setPassword(hashedPassword);
        employeeService.addEmployee(employee);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/salonservices/{id}")
    public ResponseEntity<Set<SalonService>> listSalonServices(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (!employee.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(employee.get().getSalonServices());
    }

    @PostMapping("/login")
    public ResponseEntity<Void> checkLogin(@RequestBody LoginDTO employeeLogin) {
        //TODO: odkomentirat ovo posli
        String eMail = employeeLogin.geteMail();
        String password = HashPassword.hashPassword(employeeLogin.getPassword());

        Optional<Employee> employeeOptional = employeeService.getEmployeeByEmail(eMail);
        if(!employeeOptional.isPresent()) {
            return ResponseEntity.notFound().build();
            //bitno da frontend vidi ovu poruku, pa da ju moze displayat
        }

        Employee employee = employeeOptional.get();
        if(!employee.getPassword().equals(password)) {
            return ResponseEntity.badRequest().build();
            //frontend ce ovo prikazat u displayju
        }
        return ResponseEntity.ok().build();

        //ako frontend nije dobio error, onda je login uspjesan (bitno koristit .catch() u implementaciji Fetch API-ja za ovu metodu)
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteEmployeeByEmail(@PathVariable Long employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId).orElse(null);

        if(employee == null) {
            return ResponseEntity.notFound().build();
        }//frontendu kaze da nemoze nac tog employee-a
        employeeService.deleteEmployee(employee);

        //check if delete was successful
        Optional<Employee> shouldBeNull = employeeService.getEmployeeById(employeeId);
        if(shouldBeNull.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    public String parseLocation(String location) {
        location = location.replaceAll("&", " ");
        String address = location.split(",")[0];
        String city = location.split(",")[1].substring(1);

        String returnValue = address + ';' + city;
        return returnValue;
    }

    @GetMapping("/services-by-location:{locationParam}")
    public ResponseEntity<Set<SalonService>> getSaloonServicesByLocation(@PathVariable String locationParam) {
        Map<String, Set<SalonService>> servicesByLocation = new HashMap<String, Set<SalonService>>();
        Set<SalonService> services;

        List<Employee> employees = employeeService.getAllEmployees();

        Set<String> locations = new HashSet<String>();
        for(Employee emp:employees) {
            System.out.println(emp.getSalonServices().isEmpty());
            locations.add(emp.getLocation().getAddress() + ";" + emp.getLocation().getCity());
        }

        for(String location:locations) {
            services = new HashSet<SalonService>();

            String address = location.split(";")[0];
            String city = location.split(";")[1];

            for(Employee emp:employees) {
                if(emp.getLocation().getAddress().equals(address) && emp.getLocation().getCity().equals(city)) {

                    for(SalonService service: emp.getSalonServices()) {
                        services.add(service);
                    }
                }
            }
            servicesByLocation.put(location, services);
        }

        String parsedLocation = this.parseLocation(locationParam);

        services = servicesByLocation.get(parsedLocation);

        return ResponseEntity.ok(services);
    }

    @GetMapping("/services")
    public ResponseEntity<Map<String, Set<String>>> getEmployeeServicesByLocation() {
        Map<String, Set<String>> servicesByLocation = new HashMap<String, Set<String>>();
        Set<String> services;

        List<Employee> employees = employeeService.getAllEmployees();

        Set<String> locations = new HashSet<String>();
        for(Employee emp:employees) {
            System.out.println(emp.getSalonServices().isEmpty());
            locations.add(emp.getLocation().getAddress() + ";" + emp.getLocation().getCity());
        }

        for(String location:locations) {
            services = new HashSet<String>();

            String address = location.split(";")[0];
            String city = location.split(";")[1];

            for(Employee emp:employees) {
                if(emp.getLocation().getAddress().equals(address) && emp.getLocation().getCity().equals(city)) {

                    for(SalonService service: emp.getSalonServices()) {
                        services.add(service.getName());
                    }
                }
            }
            servicesByLocation.put(location, services);
        }

        return ResponseEntity.ok(servicesByLocation);
    }

    @GetMapping("/employees-by-loc-service:{locationParam}/{serviceId}")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByLocationAndService(@PathVariable String locationParam, @PathVariable Long serviceId) {
        SalonService salonService = salonServiceService.getFavourById(serviceId).orElse(null);
        if(salonService == null) {
            return ResponseEntity.notFound().build();
        }

        String location = this.parseLocation(locationParam);
        String address = location.split(";")[0];
        String city = location.split(";")[1];

        Location locationObj = locationService.getLocationByAddressAndCity(address, city);
        if(locationObj==null) {
            return ResponseEntity.notFound().build();
        }

        List<Employee> employeeList = employeeService.getEmployeesBySalonServiceAndLocation(salonService, locationObj);
        List<EmployeeDTO> employeeDTOList = new LinkedList<EmployeeDTO>();
        EmployeeDTO employeeDTO;

        for(Employee employee:employeeList) {
            employeeDTO = new EmployeeDTO();
            employeeDTO.setId(employee.getId());
            employeeDTO.setEmail(employee.getEmail());
            employeeDTO.setLocation(employee.getLocation());
            employeeDTO.setSalonServices(employee.getSalonServices());
            employeeDTO.setName(employee.getName());
            employeeDTO.setSurname(employee.getSurname());
            employeeDTO.setSendMail(employee.isSendMail());

            employeeDTOList.add(employeeDTO);
        }

        return ResponseEntity.ok(employeeDTOList);
    }

    /*//TODO: ode nesto nevalja, post i vraca??
    @PostMapping("/preferenced")
    public ResponseEntity<List<Employee>> getEmployeesByFavourAndLoc(@RequestBody SalonServiceLocationDTO salonServiceLocationDTO) {
        String favourName = salonServiceLocationDTO.getSalonServiceName();
        SalonService salonService = salonServiceService.getSalonServiceByName(favourName);
        if(salonService == null) {
            return ResponseEntity.badRequest().build();
        }

        String address = salonServiceLocationDTO.getLocationAddress();
        Location location = locationService.getLocationByAddress(address);
        if (location == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(employeeService.getEmployeesBySalonServiceAndLocation(salonService, location));
    }*/

    //TODO: provjerit mogu li imat ove service ovdje
    @Autowired
    SalonServiceService salonServiceService;

    @Autowired
    LocationService locationService;

   /* //TODO: u 176. liniji dodat i servise za salone
    @PostMapping("/registration")
    public ResponseEntity<Void> registrateEmployee(@RequestBody RegistrateEmployeeDTO registrateEmployeeDTO) {
        Employee employee = new Employee();

        employee.setEmail(registrateEmployeeDTO.getEmail());
        employee.setName(registrateEmployeeDTO.getName());
        employee.setSurname(registrateEmployeeDTO.getSurname());
        employee.setSalonServices(null);
        employee.setSendMail(0);

        //dobij lokaciju iz adrese
        Location location = locationService.getLocationByAddress(registrateEmployeeDTO.getAddress());
        Assert.notNull(location, "Location doesn't exist for the given address");
        if (location == null) {
            return ResponseEntity.badRequest().build();
        }   //nek frontend provjeri za HTTP response status Enum
        employee.setLocation(location);

        //generiraj lozinku
        String password = HashPassword.hashPassword(this.generatePassword());
        employee.setPassword(password);

        employeeService.addEmployee(employee);

        return ResponseEntity.ok().build();
    }
*//*

    public String generatePassword() {
        Random random = new Random();
        StringBuilder sbPassword = new StringBuilder();
        int upperConstraint = this.employeePasswordAlphabet.length() - 1;
        int index;
        String letter;

        for (int i=0; i<this.employeePasswordLength; i++) {
            index = random.nextInt(upperConstraint);
            letter = this.employeePasswordAlphabet.substring(index, index + 1);
            sbPassword.append(letter);
        }

        return sbPassword.toString();
    }*/

    @GetMapping("/generatePassword/{passwordLength}")
    public ResponseEntity<PasswordDTO> getGeneratedPassword(@PathVariable Long passwordLength) {
        Random random = new Random();
        StringBuilder sbPassword = new StringBuilder();
        int upperConstraint = this.employeePasswordAlphabet.length() - 1;
        int index;
        String letter;

        for(int i=0; i<passwordLength;i++) {
            index = random.nextInt(upperConstraint);
            letter = this.employeePasswordAlphabet.substring(index, index + 1);
            sbPassword.append(letter);
        }

        PasswordDTO passwordDTO = new PasswordDTO(sbPassword.toString());
        return ResponseEntity.ok(passwordDTO);
    }

    @PostMapping("/changeMail")
    public ResponseEntity<Void> changeSendMail(@RequestBody ChangeMailDTO changeMailDTO) {
        employeeService.changeSendMail(changeMailDTO.getEmployeeUsername(), changeMailDTO.isSendMail());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/checkForMail:{employeeMail}")
    public ResponseEntity<Integer> changeSendMail(@PathVariable String employeeMail) {
        int check = employeeService.checkForMail(employeeMail);
        return ResponseEntity.ok(check);
    }
}
