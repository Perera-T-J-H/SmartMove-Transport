package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.TicketView;
import com.smartmove.smartmove_backend.entity.Ticket;
import com.smartmove.smartmove_backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired private TicketService ticketService;

    @PostMapping
    public Ticket book(@RequestBody Ticket ticket) { return ticketService.book(ticket); }

    @GetMapping
    public List<TicketView> getTickets(@RequestParam(required = false) Long passengerId) {
        return ticketService.getTickets(passengerId);
    }
}