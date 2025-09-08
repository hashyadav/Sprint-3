package com.harsh.repository;

import com.harsh.model.Twit;
import com.harsh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TwitRepository extends JpaRepository<Twit, Long> {

    // Only active twits (feed)
    List<Twit> findAllByIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc();

    // Active user's twits (normal feed)
    List<Twit> findByRetwitUserContainsAndDeletedFalseOrUser_IdAndIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc(
            User user, Long userId);

    // Twits liked by user (active)
    @Query("SELECT t FROM Twit t JOIN t.likes l WHERE l.user.id = :userId AND t.deleted = false")
    List<Twit> findByLikesUser_Id(Long userId);

    // Most liked (active)
    @Query("SELECT t FROM Twit t LEFT JOIN t.likes l " +
            "WHERE t.isTwit = true AND t.deleted = false " +
            "GROUP BY t.id " +
            "ORDER BY COUNT(l) DESC")
    List<Twit> findMostLikedTwits();

    // ✅ Get all twits by user (including deleted) for profile
    // TwitRepository.java
    List<Twit> findAllByUserOrderByCreatedAtDesc(User user);

}
