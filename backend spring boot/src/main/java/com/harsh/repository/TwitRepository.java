package com.harsh.repository;

import com.harsh.model.Twit;
import com.harsh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TwitRepository extends JpaRepository<Twit, Long> {

    // Only active twits (ignores soft deleted)
    List<Twit> findAllByIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc();

    List<Twit> findByRetwitUserContainsAndDeletedFalseOrUser_IdAndIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc(
            User user, Long userId);

    List<Twit> findByLikesContainingAndDeletedFalseOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Twit t JOIN t.likes l WHERE l.user.id = :userId AND t.deleted = false")
    List<Twit> findByLikesUser_Id(Long userId);

    // 🔥 New query for most liked twits (ignores deleted ones)
    @Query("SELECT t FROM Twit t LEFT JOIN t.likes l " +
            "WHERE t.isTwit = true AND t.deleted = false " +
            "GROUP BY t.id " +
            "ORDER BY COUNT(l) DESC")
    List<Twit> findMostLikedTwits();
}
