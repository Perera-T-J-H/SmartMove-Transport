package com.smartmove.smartmove_backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "MAINTENANCE")
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MAIN_ID")
    private Long mainId;

    @Column(name = "COST")
    private BigDecimal cost;

    @Column(name = "REPAIRED_DATE")
    private LocalDate repairedDate;

    @Column(name = "SERVICE_TYPE")
    private String serviceType;

    @Column(name = "EMPLOYEE_ID")
    private Long employeeId;

    @Column(name = "VEHICLE_ID")
    private Long vehicleId;

    public Long getMainId() {
        return mainId;
    }

    public void setMainId(Long mainId) {
        this.mainId = mainId;
    }

    public LocalDate getRepairedDate() {
        return repairedDate;
    }

    public void setRepairedDate(LocalDate repairedDate) {
        this.repairedDate = repairedDate;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }
}