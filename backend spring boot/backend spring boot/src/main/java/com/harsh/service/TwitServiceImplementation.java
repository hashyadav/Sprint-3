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
import com.harsh.request.TwitRequest;

@Service
public class TwitServiceImplementation implements TwitService {

    private final TwitRepository twitRepository;

    public TwitServiceImplementation(TwitRepository twitRepository) {
        this.twitRepository = twitRepository;
    }

    // ✅ Create Twit (from TwitRequest)
    @Override
    public Twit createTwit(TwitRequest req, User user) throws UserException, TwitException {
        if (user == null) {
            throw new UserException("User not found!");
        }

        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(req.getCreatedAt() != null ? req.getCreatedAt() : LocalDateTime.now());
        twit.setImage(req.getImage());
        twit.setUser(user);
        twit.setReply(req.isReply());
        twit.setTwit(req.isTwit());
        twit.setDeleted(false);

        if (req.getReplyFor() != null) {
            Twit parent = findById(req.getReplyFor());
            twit.setReplyFor(parent);
            twit.setReply(true);
        }

        return twitRepository.save(twit);
    }

    // ✅ Retweet / Remove Retweet
    @Override
    public Twit retwit(Long twitId, User user) throws TwitException {
        Twit twit = findByIdIncludeDeleted(twitId);
        if (twit.getRetwitUser().contains(user)) {
            twit.getRetwitUser().remove(user);
        } else {
            twit.getRetwitUser().add(user);
        }
        return twitRepository.save(twit);
    }

    // ✅ Find active twit by ID
    @Override
    public Twit findById(Long twitId) throws TwitException {
        Twit twit = twitRepository.findById(twitId)
                .orElseThrow(() -> new TwitException("Twit Not Found With Id " + twitId));
        if (twit.isDeleted()) {
            throw new TwitException("Twit has been deleted");
        }
        return twit;
    }

    // ✅ Find twit including soft-deleted ones
    @Override
    public Twit findByIdIncludeDeleted(Long twitId) throws TwitException {
        return twitRepository.findById(twitId)
                .orElseThrow(() -> new TwitException("Twit Not Found With Id " + twitId));
    }

    // ✅ Soft delete
    @Override
    public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException {
        Twit twit = findByIdIncludeDeleted(twitId);
        if (!twit.getUser().getId().equals(userId)) {
            throw new UserException("You can't delete another user's twit");
        }
        twit.setDeleted(true);
        twitRepository.save(twit);
    }

    // ✅ Restore soft-deleted twit
    @Override
    public Twit restoreTwitById(Long twitId, Long userId) throws TwitException, UserException {
        Twit twit = findByIdIncludeDeleted(twitId);
        if (!twit.getUser().getId().equals(userId)) {
            throw new UserException("You can't restore another user's twit");
        }
        if (!twit.isDeleted()) {
            throw new TwitException("Twit is not deleted");
        }
        twit.setDeleted(false);
        return twitRepository.save(twit);
    }

    // ✅ Remove from retweet
    @Override
    public Twit removeFromRetwit(Long twitId, User user) throws TwitException {
        Twit twit = findByIdIncludeDeleted(twitId);
        twit.getRetwitUser().remove(user);
        return twitRepository.save(twit);
    }

    // ✅ Create reply
    @Override
    public Twit createReply(TwitReplyRequest req, User user) throws TwitException {
        Twit parentTwit = findByIdIncludeDeleted(req.getTwitId());

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

    // ✅ Get all active twits
    @Override
    public List<Twit> findAllTwit() {
        return twitRepository.findAllByIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc();
    }

    // ✅ Get user's active twits
    @Override
    public List<Twit> getUsersTwit(User user) {
        return twitRepository.findByRetwitUserContainsAndDeletedFalseOrUser_IdAndIsTwitTrueAndDeletedFalseOrderByCreatedAtDesc(
                user, user.getId());
    }

    // ✅ Get all user's twits (including deleted)
    @Override
    public List<Twit> getAllUsersTwitIncludeDeleted(User user) {
        return twitRepository.findAllByUserOrderByCreatedAtDesc(user);
    }

    // ✅ Find twits liked by user
    @Override
    public List<Twit> findByLikesContainsUser(User user) {
        return twitRepository.findByLikesUser_Id(user.getId());
    }

    // ✅ Most liked twits
    @Override
    public List<Twit> findMostLikedTwits() {
        return twitRepository.findMostLikedTwits();
    }
}
