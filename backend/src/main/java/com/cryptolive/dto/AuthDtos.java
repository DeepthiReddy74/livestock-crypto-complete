package com.cryptolive.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public static class RegisterRequest {
        @NotBlank @Size(max = 100)
        public String name;
        @NotBlank @Email @Size(max = 150)
        public String email;
        @NotBlank @Size(min = 6, max = 100)
        public String password;
    }

    public static class LoginRequest {
        @NotBlank @Email
        public String email;
        @NotBlank
        public String password;
    }

    public static class AuthResponse {
        public String token;
        public UserDto user;

        public AuthResponse(String token, UserDto user) {
            this.token = token;
            this.user = user;
        }
    }

    public static class UserDto {
        public Long id;
        public String name;
        public String email;

        public UserDto(Long id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }
    }
}
