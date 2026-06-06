package com.cryptolive.controller;

import com.cryptolive.model.PortfolioItem;
import com.cryptolive.model.User;
import com.cryptolive.repository.PortfolioRepository;
import com.cryptolive.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PortfolioController {

    @Autowired private PortfolioRepository portfolioRepo;
    @Autowired private UserRepository userRepo;

    private User getUser(UserDetails ud) {
        return userRepo.findByEmail(ud.getUsername()).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetails ud) {
        if (ud == null) return ResponseEntity.ok(List.of());
        return ResponseEntity.ok(portfolioRepo.findByUserId(getUser(ud).getId()));
    }

    @PostMapping
    public ResponseEntity<?> add(@AuthenticationPrincipal UserDetails ud,
                                 @RequestBody Map<String, Object> body) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        User user = getUser(ud);
        PortfolioItem item = new PortfolioItem();
        item.setUser(user);
        item.setSymbol((String) body.get("symbol"));
        item.setName((String) body.get("name"));
        item.setType((String) body.getOrDefault("type", "crypto"));
        item.setQuantity(((Number) body.get("quantity")).doubleValue());
        item.setBuyPrice(((Number) body.get("buyPrice")).doubleValue());
        item.setCurrentPrice(((Number) body.get("currentPrice")).doubleValue());
        item.setUnit((String) body.get("unit"));
        return ResponseEntity.ok(portfolioRepo.save(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@AuthenticationPrincipal UserDetails ud,
                                    @PathVariable Long id) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        portfolioRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
