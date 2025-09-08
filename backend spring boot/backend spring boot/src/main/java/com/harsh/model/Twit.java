package com.harsh.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Twit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();

    // Self-referencing relationship for replies
    @OneToMany(mappedBy = "replyFor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Twit> replyTwits = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "reply_for_id")
    @JsonBackReference
    private Twit replyFor;

    @ManyToMany
    private List<User> retwitUser = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Soft delete flag
    @Column(nullable = false)
    private boolean deleted = false;

    private String image;
    private String video;

    private boolean isReply;
    private boolean isTwit;
    private boolean is_liked = false;
    private boolean is_retwit = false;
}
