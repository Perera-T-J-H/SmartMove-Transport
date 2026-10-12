package com.smartmove.smartmove_backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "DRIVER")
public class Driver {
    @Id
    @Column(name = "EMPLOYEE_ID")
    private Long employeeId;

    @Column(name = "LICENSE_NUM")
    private String licenseNum;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getLicenseNum() {
        return licenseNum;
    }

    public void setLicenseNum(String licenseNum) {
        this.licenseNum = licenseNum;
    }
}