package com.harsh.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.harsh.exception.TwitException;
import com.harsh.exception.UserException;
import com.harsh.model.Twit;
import com.harsh.model.User;
import com.harsh.repository.TwitRepository;
import com.harsh.request.TwitReplyRequest;

@Service
public class TwitServiceImplementation implements TwitService {

    private final TwitRepository twitRepository;

    public TwitServiceImplementation(TwitRepository twitRepository) {
        this.twitRepository = twitRepository;
    }

    @Override
    public Twit createTwit(Twit req, User user) {
        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(LocalDateTime.now());
        twit.setImage(req.getImage());
        twit.setVideo(req.getVideo());
        twit.setUser(user);
        twit.setReply(false);
        twit.setTwit(true);
        twit.setDeleted(false);
        return twitRepository.save(twit);
    }

    @Override
    public Twit retwit(Long twitId, User user) throws TwitException {
        Twit twit = findById(twitId);

        if (twit.getRetwitUser().contains(user)) {
            twit.getRetwitUser().remove(user);
        } else {
            twit.getRetwitUser().add(user);
        }

        return twitRepository.save(twit);
    }

    @Override
    public Twit findById(Long twitId) throws TwitException {
        Twit twit = twitRepository.findById(twitId)
                .orElseThrow(() -> new TwitException("Twit Not Found With Id " + twitId));

        if (twit.isDeleted()) {
            throw new TwitException("Twit has been deleted");
        }

        return twit;
    }

    @Override
    public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException {
        Twit twit = findById(twitId);

        if (!twit.getUser().getId().equals(userId)) {
            throw new UserException("You can't delete another user's twit");
        }

        twit.setDeleted(true); // soft delete
        twitRepository.save(twit);
    }

    @Override
    public Twit removeFromRetwit(Long twitId, User user) throws TwitException {
        Twit twit = findById(twitId);
        twit.getRetwitUser().remove(user);
        return twitRepository.save(twit);
    }

    @Override
    public Twit createReply(TwitReplyRequest req, User user) throws TwitException {
        Twit parentTwit = findById(req.getTwitId());

        Twit reply = new Twit();
        reply.setContent(req.getContent());
        reply.setCreatedAt(LocalDateTime.now());
        reply.setImage(req.getImage());
        reply.setUser(user);
        reply.setReplyFor(parentTwit);
        reply.setReply(true);
        reply.setTwit(false);
        reply.setDeleted(false);

        Twit savedReply = twitRepository.save(reply);

        parentTwit.getReplyTwits().add(savedReply);
        twitRepository.save(parentTwit);

        return savedReply;
    }

    @Override
    public List<Twit> findAllTwit() {
        return twitRepository.findAllByIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc();
    }

    @Override
    public List<Twit> getUsersTwit(User user) {
        return twitRepository.findByRetwitUserContainsAndDeletedFalseOrUser_IdAndIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc(
                user, user.getId());
    }

    @Override
    public List<Twit> findByLikesContainsUser(User user) {
        return twitRepository.findByLikesUser_Id(user.getId());
    }

    // 🔥 new method for Explore
    @Override
    public List<Twit> findMostLikedTwits() {
        return twitRepository.findMostLikedTwits();
    }
}
