package com.smartmove.smartmove_backend.repository;

import com.smartmove.smartmove_backend.document.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AnnouncementRepository extends MongoRepository<Announcement, String> {

    List<Announcement> findByActive(Boolean active);
}