package com.harsh.service;

import java.util.List;
import com.harsh.exception.TwitException;
import com.harsh.exception.UserException;
import com.harsh.model.Twit;
import com.harsh.model.User;
import com.harsh.request.TwitReplyRequest;
import com.harsh.request.TwitRequest;

public interface TwitService {

    Twit createTwit(TwitRequest req, User user) throws UserException, TwitException; // ✅ now accepts DTO

    List<Twit> findAllTwit();

    Twit retwit(Long twitId, User user) throws TwitException;

    Twit findById(Long twitId) throws TwitException;

    Twit findByIdIncludeDeleted(Long twitId) throws TwitException;

    void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException;

    Twit restoreTwitById(Long twitId, Long userId) throws TwitException, UserException;

    Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException;

    Twit createReply(TwitReplyRequest req, User user) throws TwitException; // ✅ already using DTO

    List<Twit> getUsersTwit(User user);

    List<Twit> getAllUsersTwitIncludeDeleted(User user);

    List<Twit> findByLikesContainsUser(User user);

    List<Twit> findMostLikedTwits();
}
