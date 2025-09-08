// src/main/java/com/harsh/mapper/TwitDtoMapper.java
package com.harsh.mapper;

import java.util.ArrayList;
import java.util.List;

import com.harsh.dto.TwitDto;
import com.harsh.dto.UserDto;
import com.harsh.model.Twit;
import com.harsh.model.User;
import com.harsh.util.TweetUtil;

public class TwitDtoMapper {

    public static TwitDto toTwitDto(Twit twit, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(twit.getUser());

        boolean isLiked = TweetUtil.isLikedByReqUser(reqUser, twit);
        boolean isRetwited = TweetUtil.isRetwitedByReqUser(reqUser, twit);

        List<Long> retwitUserId = new ArrayList<>();
        for (User user1 : twit.getRetwitUser()) {
            retwitUserId.add(user1.getId());
        }

        TwitDto twitDto = new TwitDto();
        twitDto.setId(twit.getId());
        twitDto.setContent(twit.getContent());
        twitDto.setCreatedAt(twit.getCreatedAt());
        twitDto.setImage(twit.getImage());
        twitDto.setTotalLikes(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwits().size());
        twitDto.setTotalRetweets(twit.getRetwitUser().size());
        twitDto.setUser(user);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwited);
        twitDto.setRetwitUsersId(retwitUserId);
        // IMPORTANT: set nested replies using the same mapping (recursive)
        twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwits(), reqUser));
        twitDto.setVideo(twit.getVideo());

        return twitDto;
    }

    // Use the full toTwitDto for each element so replyTwits are included
    public static List<TwitDto> toTwitDtos(List<Twit> twits, User reqUser) {
        List<TwitDto> twitDtos = new ArrayList<>();
        if (twits == null) return twitDtos;
        for (Twit twit : twits) {
            TwitDto twitDto = toTwitDto(twit, reqUser);
            twitDtos.add(twitDto);
        }
        return twitDtos;
    }

    // Keep the reply-specific version (optional) but ensure it also sets replyTwits if you use it
    public static TwitDto toReplyTwitDto(Twit twit, User reqUser) {
        // This method is optional; if you use it ensure it sets replyTwits too.
        // For safety, we'll delegate to toTwitDto so reply chain is consistent.
        return toTwitDto(twit, reqUser);
    }
}
