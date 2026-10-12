package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.entity.Route;
import com.smartmove.smartmove_backend.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    @Autowired private RouteService routeService;

    @GetMapping
    public List<Route> getAllRoutes() { return routeService.getAllRoutes(); }

    @PostMapping
    public Route createRoute(@RequestBody Route route) { return routeService.createRoute(route); }

    @PutMapping("/{id}")
    public Route updateRoute(@PathVariable Long id, @RequestBody Route route) { return routeService.updateRoute(id, route); }

    @DeleteMapping("/{id}")
    public void deleteRoute(@PathVariable Long id) { routeService.deleteRoute(id); }
}