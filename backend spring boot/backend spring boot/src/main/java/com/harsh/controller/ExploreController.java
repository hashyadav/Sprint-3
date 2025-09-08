package com.harsh.controller;

import com.harsh.dto.TwitDto;
import com.harsh.mapper.TwitDtoMapper;
import com.harsh.model.Twit;
import com.harsh.service.TwitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/explore")
@RequiredArgsConstructor
public class ExploreController {

    private final TwitService twitService;

    // 🚀 Public API, no token required
    @GetMapping("/most-liked")
    public ResponseEntity<List<TwitDto>> getMostLikedTwits() {
        List<Twit> twits = twitService.findMostLikedTwits();
        List<TwitDto> twitDtos = TwitDtoMapper.toTwitDtos(twits, null); // no user context
        return ResponseEntity.ok(twitDtos);
    }
}
