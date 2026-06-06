package com.cryptolive.controller;

import com.cryptolive.model.User;
import com.cryptolive.model.WatchlistItem;
import com.cryptolive.repository.UserRepository;
import com.cryptolive.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class WatchlistController {

    @Autowired private WatchlistRepository watchlistRepo;
    @Autowired private UserRepository userRepo;

    private User getUser(UserDetails ud) {
        return userRepo.findByEmail(ud.getUsername()).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetails ud) {
        if (ud == null) return ResponseEntity.ok(List.of());
        List<WatchlistItem> items = watchlistRepo.findByUserId(getUser(ud).getId());
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<?> add(@AuthenticationPrincipal UserDetails ud,
                                 @RequestBody Map<String, Object> body) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        User user = getUser(ud);
        String symbol = (String) body.get("symbol");

        if (watchlistRepo.findByUserIdAndSymbol(user.getId(), symbol).isPresent()) {
            return ResponseEntity.badRequest().body("Already in watchlist");
        }

        WatchlistItem item = new WatchlistItem();
        item.setUser(user);
        item.setSymbol(symbol);
        item.setName((String) body.get("name"));
        item.setType((String) body.getOrDefault("type", "crypto"));
        item.setCurrentPrice(body.get("currentPrice") != null ? ((Number) body.get("currentPrice")).doubleValue() : null);
        item.setPriceChangePercent(body.get("priceChangePercent") != null ? ((Number) body.get("priceChangePercent")).doubleValue() : null);
        return ResponseEntity.ok(watchlistRepo.save(item));
    }

    @DeleteMapping("/{symbol}")
    public ResponseEntity<?> remove(@AuthenticationPrincipal UserDetails ud,
                                    @PathVariable String symbol) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        watchlistRepo.deleteByUserIdAndSymbol(getUser(ud).getId(), symbol);
        return ResponseEntity.ok(Map.of("message", "Removed"));
    }
}
