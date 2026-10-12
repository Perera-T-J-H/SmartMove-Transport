package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.entity.Route;
import com.smartmove.smartmove_backend.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RouteService {

    @Autowired private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route createRoute(Route route) {
        validate(route);
        route.setRouteId(null);
        return routeRepository.save(route);
    }

    public Route updateRoute(Long id, Route data) {
        validate(data);
        Route r = routeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Route not found."));
        r.setOrigin(data.getOrigin());
        r.setDestination(data.getDestination());
        r.setDistanceKm(data.getDistanceKm());
        return routeRepository.save(r);
    }

    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }

    private void validate(Route r) {
        if (r.getOrigin() == null || r.getOrigin().isBlank() || r.getDestination() == null || r.getDestination().isBlank()) {
            throw new IllegalArgumentException("Origin and destination are required.");
        }
        if (r.getOrigin().trim().equalsIgnoreCase(r.getDestination().trim())) {
            throw new IllegalArgumentException("Origin and destination must be different.");
        }
        if (r.getDistanceKm() == null || r.getDistanceKm() <= 0) {
            throw new IllegalArgumentException("Distance must be more than 0 km.");
        }
    }
}