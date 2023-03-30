package com.opp.favorito.services;

import com.opp.favorito.models.Admin;
import com.opp.favorito.repository.AdminRepository;
import com.opp.favorito.services.interfaces.AdminServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService implements AdminServiceInterface {
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public void addAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public void removeAdmin(Long id) {
        Optional<Admin> toBeDeleted = adminRepository.findById(id);
        Assert.isTrue(toBeDeleted.isPresent(), "Cannot find admin with id");
        adminRepository.delete(toBeDeleted.get());
    }

    @Override
    public Optional<Admin> getAdminByEmail(String eMail) {
        return adminRepository.findByAdminEmail(eMail);
    }
}