package com.cryptolive.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@RestController
@RequestMapping("/api/market")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class MarketController {

    @Value("${coingecko.base-url}")
    private String coinGeckoBaseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    private HttpHeaders headers() {
        HttpHeaders h = new HttpHeaders();
        h.set("Accept", "application/json");
        h.set("User-Agent", "CryptoLive/1.0");
        return h;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String query) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(coinGeckoBaseUrl + "/search")
                    .queryParam("query", query).toUriString();
            ResponseEntity<Map> resp = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers()), Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", "Market API unavailable", "message", e.getMessage()));
        }
    }

    @GetMapping("/prices")
    public ResponseEntity<?> prices(@RequestParam String ids,
                                    @RequestParam(defaultValue = "usd") String vs_currency) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(coinGeckoBaseUrl + "/simple/price")
                    .queryParam("ids", ids)
                    .queryParam("vs_currencies", vs_currency)
                    .queryParam("include_24hr_change", true)
                    .queryParam("include_market_cap", true)
                    .toUriString();
            ResponseEntity<Map> resp = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers()), Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", "Market API unavailable"));
        }
    }

    @GetMapping("/chart/{id}")
    public ResponseEntity<?> chart(@PathVariable String id,
                                   @RequestParam(defaultValue = "7") String days) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(coinGeckoBaseUrl + "/coins/" + id + "/market_chart")
                    .queryParam("vs_currency", "usd")
                    .queryParam("days", days)
                    .toUriString();
            ResponseEntity<Map> resp = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers()), Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", "Chart data unavailable"));
        }
    }

    @GetMapping("/trending")
    public ResponseEntity<?> trending() {
        try {
            String url = coinGeckoBaseUrl + "/search/trending";
            ResponseEntity<Map> resp = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers()), Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", "Trending data unavailable"));
        }
    }

    @GetMapping("/global")
    public ResponseEntity<?> global() {
        try {
            String url = coinGeckoBaseUrl + "/global";
            ResponseEntity<Map> resp = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers()), Map.class);
            return ResponseEntity.ok(resp.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of("error", "Global data unavailable"));
        }
    }
}
