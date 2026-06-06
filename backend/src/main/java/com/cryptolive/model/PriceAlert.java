package com.cryptolive.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "price_alerts")
public class PriceAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String symbol;
    private String condition; // above | below
    private Double targetPrice;
    private Boolean active = true;
    private Boolean triggered = false;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public PriceAlert() {}

    public Long getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSymbol() { return symbol; }
    public void setSymbol(String s) { this.symbol = s; }
    public String getCondition() { return condition; }
    public void setCondition(String c) { this.condition = c; }
    public Double getTargetPrice() { return targetPrice; }
    public void setTargetPrice(Double p) { this.targetPrice = p; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean a) { this.active = a; }
    public Boolean getTriggered() { return triggered; }
    public void setTriggered(Boolean t) { this.triggered = t; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
