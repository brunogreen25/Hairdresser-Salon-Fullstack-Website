package com.opp.favorito.repository;

import com.opp.favorito.models.Employee;
import com.opp.favorito.models.SalonService;
import com.opp.favorito.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String eMail);

    @Query("select e from Employee e where :salonService member of e.salonServices and e.location = :location ")
    List<Employee> findBySalonServicesAndLocation(@Param("salonService") SalonService salonService, @Param("location") Location location);

    @Transactional
    @Modifying
    @Query("update Employee e set e.sendMail = :sendMailBit where e.email = :employeeUsername")
    void updateSendMail(@Param("employeeUsername") String employeeUsername, @Param("sendMailBit") int sendMailBit);

    @Query("select e.sendMail from Employee e where e.email = :email")
    int checkForMail(@Param("email") String email);

/*    @Query("select e.location from Employee e")
    Set<Location> getAllLocations();

    @Query("select e.service from Employee e where e.location = :location")
    List<List<SalonService>> getServicesByLocation(@Param("location") Location location);*/
/*
    @Query("select e from Employee e where :favour member of e.salonServices and e.location = :location ")
    List<Employee> findBySalonServicesAndLocation(@Param("favour") SalonService salonService, @Param("location") Location location);

*/
}
