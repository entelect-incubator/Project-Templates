package com.example.app.core;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private static final long WINDOW_MS = Long.parseLong(System.getenv().getOrDefault("RATE_LIMIT_WINDOW_MS", "60000"));
    private static final int MAX_REQUESTS = Integer.parseInt(System.getenv().getOrDefault("RATE_LIMIT_MAX", "100"));

    private final Map<String, Counter> requestCounters = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        applyHeaders(response);

        var clientKey = request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr();
        if (isRateLimited(clientKey)) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write("{\"code\":\"rate_limited\",\"message\":\"Too many requests\"}");
            return;
        }

        var apiKey = System.getenv("API_KEY");
        if (apiKey != null && !apiKey.isBlank() && !"GET".equalsIgnoreCase(request.getMethod())) {
            var incoming = request.getHeader("x-api-key");
            if (!apiKey.equals(incoming)) {
                response.setStatus(401);
                response.setContentType("application/json");
                response.getWriter().write("{\"code\":\"unauthorized\",\"message\":\"Missing or invalid API key\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private void applyHeaders(HttpServletResponse response) {
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setHeader("X-Frame-Options", "DENY");
        response.setHeader("Referrer-Policy", "no-referrer");
        response.setHeader("X-XSS-Protection", "0");
    }

    private boolean isRateLimited(String key) {
        var now = Instant.now().toEpochMilli();
        var counter = requestCounters.computeIfAbsent(key, ignored -> new Counter(0, now + WINDOW_MS));

        synchronized (counter) {
            if (now > counter.resetAt) {
                counter.count = 0;
                counter.resetAt = now + WINDOW_MS;
            }

            counter.count += 1;
            return counter.count > MAX_REQUESTS;
        }
    }

    private static class Counter {
        private int count;
        private long resetAt;

        private Counter(int count, long resetAt) {
            this.count = count;
            this.resetAt = resetAt;
        }
    }
}
