package com.cryptolive.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolio")
public class PortfolioItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String symbol;
    private String name;
    private String type; // crypto | livestock
    private Double quantity;
    private Double buyPrice;
    private Double currentPrice;
    private String unit; // optional e.g. "lb"

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public PortfolioItem() {}

    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSymbol() { return symbol; }
    public void setSymbol(String s) { this.symbol = s; }
    public String getName() { return name; }
    public void setName(String n) { this.name = n; }
    public String getType() { return type; }
    public void setType(String t) { this.type = t; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double q) { this.quantity = q; }
    public Double getBuyPrice() { return buyPrice; }
    public void setBuyPrice(Double b) { this.buyPrice = b; }
    public Double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(Double c) { this.currentPrice = c; }
    public String getUnit() { return unit; }
    public void setUnit(String u) { this.unit = u; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public Double getPnl() {
        if (buyPrice == null || currentPrice == null || quantity == null) return 0.0;
        return (currentPrice - buyPrice) * quantity;
    }

    public Double getPnlPercent() {
        if (buyPrice == null || buyPrice == 0) return 0.0;
        return ((currentPrice - buyPrice) / buyPrice) * 100;
    }
}
