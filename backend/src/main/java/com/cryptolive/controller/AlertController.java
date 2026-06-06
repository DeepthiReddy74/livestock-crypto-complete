package com.cryptolive.controller;

import com.cryptolive.model.PriceAlert;
import com.cryptolive.model.User;
import com.cryptolive.repository.AlertRepository;
import com.cryptolive.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AlertController {

    @Autowired private AlertRepository alertRepo;
    @Autowired private UserRepository userRepo;

    private User getUser(UserDetails ud) {
        return userRepo.findByEmail(ud.getUsername()).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<?> getAll(@AuthenticationPrincipal UserDetails ud) {
        if (ud == null) return ResponseEntity.ok(List.of());
        return ResponseEntity.ok(alertRepo.findByUserId(getUser(ud).getId()));
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal UserDetails ud,
                                    @RequestBody Map<String, Object> body) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        User user = getUser(ud);
        PriceAlert alert = new PriceAlert();
        alert.setUser(user);
        alert.setSymbol((String) body.get("symbol"));
        alert.setCondition((String) body.get("condition"));
        alert.setTargetPrice(((Number) body.get("price")).doubleValue());
        return ResponseEntity.ok(alertRepo.save(alert));
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggle(@AuthenticationPrincipal UserDetails ud,
                                    @PathVariable Long id) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        PriceAlert alert = alertRepo.findById(id).orElseThrow();
        alert.setActive(!alert.getActive());
        return ResponseEntity.ok(alertRepo.save(alert));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal UserDetails ud,
                                    @PathVariable Long id) {
        if (ud == null) return ResponseEntity.status(401).body("Unauthorized");
        alertRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
