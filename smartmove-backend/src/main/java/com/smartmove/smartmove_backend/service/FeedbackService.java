package com.smartmove.smartmove_backend.service;
import com.smartmove.smartmove_backend.entity.Feedback;
import com.smartmove.smartmove_backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired private FeedbackRepository feedbackRepository;
    public List<Feedback> getAllFeedbacks() { return feedbackRepository.findAll(); }
    public Feedback createFeedback(Feedback feedback) { return feedbackRepository.save(feedback); }
    public Feedback updateFeedback(Long id, Feedback feedback) {
        feedback.setFeedbackId(id);
        return feedbackRepository.save(feedback);
    }
    public void deleteFeedback(Long id) { feedbackRepository.deleteById(id); }
}