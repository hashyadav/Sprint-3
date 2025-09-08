package com.harsh.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Where(clause = "deleted = false") // auto-ignore deleted twits
public class Twit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "replyFor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Twit> replyTwits = new ArrayList<>();

    @ManyToMany
    private List<User> retwitUser = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "reply_for_id")
    private Twit replyFor;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private boolean deleted = false; // soft delete flag

    @Column(name = "is_deleted", nullable = false)
    private boolean is_deleted = false;

    private String image;
    private String video;

    private boolean isReply;
    private boolean isTwit;
    private boolean is_liked = false;
    private boolean is_retwit = false;
}
