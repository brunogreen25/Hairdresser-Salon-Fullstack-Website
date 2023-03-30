package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminServiceInterface {

    public List<Admin> getAllAdmins();

    public void addAdmin(Admin admin);

    public Optional<Admin> getAdminById(Long id);

    public void removeAdmin(Long id);

    public Optional<Admin> getAdminByEmail(String eMail);
}
