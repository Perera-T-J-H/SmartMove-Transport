package com.smartmove.smartmove_backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "TRIP")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRIP_ID")
    private Long tripId;

    @Column(name = "BASE_PRICE")
    private BigDecimal basePrice;

    @Column(name = "DEPA_DATETIME")
    private LocalDateTime depaDatetime;

    @Column(name = "ARRIVAL_DATETIME")
    private LocalDateTime arrivalDatetime;

    @Column(name = "STATUS")
    private String status = "Scheduled";

    @Column(name = "ROUTE_ID")
    private Long routeId;

    @Column(name = "VEHICLE_ID")
    private Long vehicleId;

    @Column(name = "DRIVER_ID")
    private Long driverId;

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public LocalDateTime getDepaDatetime() {
        return depaDatetime;
    }

    public void setDepaDatetime(LocalDateTime depaDatetime) {
        this.depaDatetime = depaDatetime;
    }

    public LocalDateTime getArrivalDatetime() {
        return arrivalDatetime;
    }

    public void setArrivalDatetime(LocalDateTime arrivalDatetime) {
        this.arrivalDatetime = arrivalDatetime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }
}