package com.harsh.service;

import java.util.List;

import com.harsh.exception.LikeException;
import com.harsh.exception.TwitException;
import com.harsh.exception.UserException;
import com.harsh.model.Like;
import com.harsh.model.User;

public interface LikesService {
	
	public Like likeTwit(Long twitId, User user) throws UserException, TwitException;
	
	public Like unlikeTwit(Long twitId, User user) throws UserException, TwitException, LikeException;
	
	public List<Like> getAllLikes(Long twitId) throws TwitException;

}
