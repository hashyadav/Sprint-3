package com.harsh.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.harsh.dto.TwitDto;
import com.harsh.exception.TwitException;
import com.harsh.exception.UserException;
import com.harsh.mapper.TwitDtoMapper;
import com.harsh.model.Twit;
import com.harsh.model.User;
import com.harsh.request.TwitReplyRequest;
import com.harsh.request.TwitRequest;
import com.harsh.response.ApiResponse;
import com.harsh.service.TwitService;
import com.harsh.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/twits")
@Tag(name = "Twit Management", description = "Endpoints for managing twits")
public class TwitController {

    private final TwitService twitService;
    private final UserService userService;

    public TwitController(TwitService twitService, UserService userService) {
        this.twitService = twitService;
        this.userService = userService;
    }

    // ✅ Create a new twit
    @PostMapping("/create")
    public ResponseEntity<TwitDto> createTwit(@RequestBody TwitRequest req,
                                              @RequestHeader("Authorization") String jwt)
            throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);
        Twit savedTwit = twitService.createTwit(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(savedTwit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    // ✅ Reply to a twit
    @PostMapping("/reply")
    public ResponseEntity<TwitDto> replyTwit(@RequestBody TwitReplyRequest req,
                                             @RequestHeader("Authorization") String jwt)
            throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);
        Twit savedReply = twitService.createReply(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(savedReply, user);

        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    // ✅ Retwit
    @PutMapping("/{twitId}/retwit")
    public ResponseEntity<TwitDto> retwit(@PathVariable Long twitId,
                                          @RequestHeader("Authorization") String jwt)
            throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.retwit(twitId, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    // ✅ Find twit by ID
    @GetMapping("/{twitId}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable Long twitId,
                                                @RequestHeader("Authorization") String jwt)
            throws TwitException, UserException {

        User user = userService.findUserProfileByJwt(jwt);
        Twit twit = twitService.findById(twitId);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    // ✅ Soft delete twit
    @DeleteMapping("/{twitId}")
    public ResponseEntity<ApiResponse> deleteTwitById(@PathVariable Long twitId,
                                                      @RequestHeader("Authorization") String jwt)
            throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);
        twitService.deleteTwitById(twitId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Twit deleted successfully (soft delete)");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // ✅ Restore soft-deleted twit
    @PutMapping("/{twitId}/restore")
    public ResponseEntity<ApiResponse> restoreTwitById(@PathVariable Long twitId,
                                                       @RequestHeader("Authorization") String jwt)
            throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);
        Twit restoredTwit = twitService.restoreTwitById(twitId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Twit restored successfully");
        res.setStatus(true);
        res.setData(TwitDtoMapper.toTwitDto(restoredTwit, user));

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // ✅ Get all active twits
    @GetMapping("/")
    public ResponseEntity<List<TwitDto>> findAllTwits(@RequestHeader("Authorization") String jwt)
            throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        List<Twit> twits = twitService.findAllTwit();
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, user);

        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }

    // ✅ Get all twits of a user (including soft-deleted)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUsersTwits(@PathVariable Long userId,
                                                       @RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = userService.findUserProfileByJwt(jwt);
        User user = userService.findUserById(userId);
        List<Twit> twits = twitService.getAllUsersTwitIncludeDeleted(user);
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, reqUser);

        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }

    // ✅ Get twits liked by a user
    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikesContainsUser(@PathVariable Long userId,
                                                                     @RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = userService.findUserProfileByJwt(jwt);
        User user = userService.findUserById(userId);
        List<Twit> twits = twitService.findByLikesContainsUser(user);
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, reqUser);

        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }
}
