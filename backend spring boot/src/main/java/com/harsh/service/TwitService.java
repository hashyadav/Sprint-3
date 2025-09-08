package com.harsh.service;

import java.util.List;

import com.harsh.exception.TwitException;
import com.harsh.exception.UserException;
import com.harsh.model.Twit;
import com.harsh.model.User;
import com.harsh.request.TwitReplyRequest;
import org.springframework.data.jpa.repository.Query;

public interface TwitService {
	
	
	public Twit createTwit(Twit req,User user)throws UserException, TwitException;
	
	public List<Twit> findAllTwit();
	
	public Twit retwit(Long twitId, User user) throws UserException, TwitException;
	
	public Twit findById(Long twitId) throws TwitException;
	
	public void deleteTwitById(Long twitId,Long userId) throws TwitException, UserException;
	
	public Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException;
	
	public Twit createReply(TwitReplyRequest req,User user) throws TwitException;
	
	public List<Twit> getUsersTwit(User user);
	
	public List<Twit> findByLikesContainsUser(User user);

    public List<Twit> findMostLikedTwits();

}
