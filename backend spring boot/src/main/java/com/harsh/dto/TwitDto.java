package com.harsh.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TwitDto {
	
	private Long id;

	private String content;
	
	private String image;
	
	private String video;
	
	private UserDto user;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime createdAt;
	
	private int totalLikes;
	
	private int totalReplies;
	
	private int totalRetweets;
	
    private boolean isLiked;
    
    private boolean isRetwit;
    
    private List<Long> retwitUsersId;
    
    private List<TwitDto> replyTwits;
	
}
