package com.smartmove.smartmove_backend.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "MECHANIC")
public class Mechanic {
    @Id
    @Column(name = "EMPLOYEE_ID")
    private Long employeeId;

    @Column(name = "EXPERTISE_AREA")
    private String expertiseArea;

    public String getExpertiseArea() {
        return expertiseArea;
    }

    public void setExpertiseArea(String expertiseArea) {
        this.expertiseArea = expertiseArea;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
}