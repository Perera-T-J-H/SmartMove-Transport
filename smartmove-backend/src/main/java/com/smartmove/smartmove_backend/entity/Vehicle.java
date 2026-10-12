package com.smartmove.smartmove_backend.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "VEHICLE")
public class Vehicle {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VEHICLE_ID")
    private Long vehicleId;

    @Column(name = "REGISTRATION_NUM")
    private String registrationNum;

    @Column(name = "VEHICLE_TYPE")
    private String vehicleType;

    @Column(name = "MANU_YEAR")
    private Integer manuYear;

    @Column(name = "MODEL")
    private String model;

    @Column(name = "STATUS")
    private String status = "Active";

    @Column(name = "CAPACITY")
    private Integer capacity;

    @Column(name = "FUEL_TYPE")
    private String fuelType;

    @Column(name = "AC_TYPE")
    private String acType;

    @Column(name = "ROUTE_TYPE")
    private String routeType;

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getRegistrationNum() {
        return registrationNum;
    }

    public void setRegistrationNum(String registrationNum) {
        this.registrationNum = registrationNum;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getManuYear() {
        return manuYear;
    }

    public void setManuYear(Integer manuYear) {
        this.manuYear = manuYear;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getAcType() {
        return acType;
    }

    public void setAcType(String acType) {
        this.acType = acType;
    }

    public String getRouteType() {
        return routeType;
    }

    public void setRouteType(String routeType) {
        this.routeType = routeType;
    }
}
