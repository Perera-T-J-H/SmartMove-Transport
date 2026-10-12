package com.smartmove.smartmove_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ROUTE")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROUT_ID")
    private Long routeId;

    @Column(name = "ORIGIN")
    private String origin;

    @Column(name = "DESTINATION")
    private String destination;

    @Column(name = "DISTANCE_KM")
    private Integer distanceKm;

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Integer distanceKm) {
        this.distanceKm = distanceKm;
    }
}