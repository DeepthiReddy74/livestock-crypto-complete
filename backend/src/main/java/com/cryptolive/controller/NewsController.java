package com.cryptolive.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class NewsController {

    @GetMapping
    public ResponseEntity<?> getNews() {
        List<Map<String, Object>> news = List.of(
            Map.of("id", 1, "title", "Bitcoin surges past $67,000 as institutional demand grows",
                   "source", "CoinDesk", "time", "2h ago", "tag", "BTC",
                   "summary", "Bitcoin reached a new monthly high as ETF inflows accelerated, signaling renewed institutional confidence."),
            Map.of("id", 2, "title", "Ethereum network upgrades boost transaction speeds",
                   "source", "CryptoSlate", "time", "4h ago", "tag", "ETH",
                   "summary", "The latest Ethereum upgrade has reduced gas fees significantly and improved throughput."),
            Map.of("id", 3, "title", "Livestock markets steady as feed costs decline",
                   "source", "AgriNews", "time", "5h ago", "tag", "CATTLE",
                   "summary", "Live cattle futures held steady as declining corn prices reduced input costs for ranchers."),
            Map.of("id", 4, "title", "Solana DeFi volume hits record $4.2B monthly",
                   "source", "The Block", "time", "6h ago", "tag", "SOL",
                   "summary", "Solana's decentralized finance ecosystem saw explosive growth with a new monthly record."),
            Map.of("id", 5, "title", "Pork belly futures dip on seasonal demand shift",
                   "source", "CME Group", "time", "8h ago", "tag", "HOGS",
                   "summary", "Lean hog futures saw moderate selling pressure as summer BBQ season winds down."),
            Map.of("id", 6, "title", "SEC opens new regulatory framework for digital assets",
                   "source", "Reuters", "time", "10h ago", "tag", "REGULATION",
                   "summary", "The SEC announced a new regulatory framework for digital assets providing clearer guidance."),
            Map.of("id", 7, "title", "Global beef demand rises 8% year-over-year",
                   "source", "USDA", "time", "1d ago", "tag", "CATTLE",
                   "summary", "USDA data shows global beef consumption increased 8% compared to the same period last year.")
        );
        return ResponseEntity.ok(news);
    }
}
