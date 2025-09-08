package com.harsh.util;

import com.harsh.model.Like;
import com.harsh.model.Twit;
import com.harsh.model.User;

public class TweetUtil {

    public static boolean isLikedByReqUser(User reqUser, Twit twit) {
        if (reqUser == null) return false; // public explore API case
        if (twit.getLikes() == null) return false;

        for (Like like : twit.getLikes()) {
            if (like.getUser() != null && like.getUser().getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }

    public static boolean isRetwitedByReqUser(User reqUser, Twit twit) {
        if (reqUser == null) return false;
        if (twit.getRetwitUser() == null) return false;

        for (User user : twit.getRetwitUser()) {
            if (user != null && user.getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }
}
