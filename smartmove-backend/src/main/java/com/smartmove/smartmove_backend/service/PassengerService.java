package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.ProfileUpdateRequest;
import com.smartmove.smartmove_backend.entity.Passenger;
import com.smartmove.smartmove_backend.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PassengerService {

    @Autowired
    private PassengerRepository passengerRepository;

    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    public Passenger register(Passenger passenger) {
        if (passengerRepository.findByEmail(passenger.getEmail()) != null) {
            throw new IllegalArgumentException("This email is already registered.");
        }
        passenger.setPassengerId(null);
        return passengerRepository.save(passenger);
    }

    @Transactional
    public Passenger updateProfile(ProfileUpdateRequest req) {
        Passenger p = passengerRepository.findById(req.id())
                .orElseThrow(() -> new IllegalArgumentException("Passenger not found."));

        Passenger other = passengerRepository.findByEmail(req.email());
        if (other != null && !other.getPassengerId().equals(p.getPassengerId())) {
            throw new IllegalArgumentException("This email is used by another passenger.");
        }

        p.setFirstName(req.firstName());
        p.setLastName(req.lastName());
        p.setEmail(req.email());
        if (req.password() != null && !req.password().isBlank()) {
            p.setPassword(req.password());
        }
        p.setContactNumbers(req.contactNumbers());
        return passengerRepository.save(p);
    }

    public void deletePassenger(Long id) {
        passengerRepository.deleteById(id);
    }
}