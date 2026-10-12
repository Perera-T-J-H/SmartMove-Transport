package com.smartmove.smartmove_backend.repository;
import com.smartmove.smartmove_backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}