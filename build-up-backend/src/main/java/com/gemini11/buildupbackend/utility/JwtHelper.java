package com.gemini11.buildupbackend.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Objects;

public class JwtHelper {

    private static final String SECRET_KEY = "your-secret-key";
    private static final long EXPIRATION_TIME = 3600 * 1_000;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public boolean verifyToken(String subject, String token) {
        try {
            Jws<Claims> jws = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token);

            Claims claims = jws.getBody();

            long currentTimeMillis = System.currentTimeMillis();
            if (claims.getExpiration().getTime() < currentTimeMillis) {
                return false;
            }

            if (!Objects.equals(subject, claims.getSubject())) {
                return false;
            }
        } catch (Exception error) {
            return false;
        }

        return true;
    }

    public String extractUsernameFromToken(String token) {
        String subject = null;
        try {
            Claims decodedClaims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            subject = decodedClaims.getSubject();
        } catch (Exception ignored) {
        }

        return subject;
    }
}
