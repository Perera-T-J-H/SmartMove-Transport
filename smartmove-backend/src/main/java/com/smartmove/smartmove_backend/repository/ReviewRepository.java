package com.smartmove.smartmove_backend.repository;

import com.smartmove.smartmove_backend.document.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByRouteId(Long routeId);

    List<Review> findByCommentContainingIgnoreCase(String keyword);

    boolean existsByPassengerIdAndTripId(Long passengerId, Long tripId);
}