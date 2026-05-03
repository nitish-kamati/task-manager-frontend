# Backend Fix Instructions

## 🚨 Current Issue
Backend is returning 500 Internal Server Error due to configuration issues.

## 🔧 Fix Steps

### 1. Update Backend Repository Files

#### Replace `src/main/resources/application.properties`:
```properties
# Spring Boot Configuration
spring.application.name=task-manager

# Database Configuration
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://nitish_db_user:nitish%401231@task-manager-cluster.ggcoxrj.mongodb.net/taskdb}
spring.data.mongodb.database=${MONGODB_DATABASE:taskdb}

# Server Configuration
server.port=${PORT:8080}

# CORS Configuration
cors.allowed.origins=${CORS_ALLOWED_ORIGINS:http://localhost:5173,https://task-manager-frontend-drab-one.vercel.app,https://*.vercel.app}

# Actuator for health checks
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=when-authorized

# Logging
logging.level.com.nitish.task_manager=INFO
logging.level.org.springframework.web=INFO
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n

# Security Configuration
spring.security.enabled=false
```

#### Update `src/main/java/com/nitish/task_manager/config/CorsConfig.java`:
```java
package com.nitish.task_manager.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;
import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed.origins:http://localhost:5173,https://task-manager-frontend-drab-one.vercel.app,https://*.vercel.app}")
    private String allowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        
        // Parse origins from environment variable
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        config.setAllowedOrigins(origins);
        
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
```

### 2. Render Environment Variables

In Render Dashboard → Backend Service → Environment:
```
MONGODB_URI=mongodb+srv://nitish_db_user:nitish%401231@task-manager-cluster.ggcoxrj.mongodb.net/taskdb
MONGODB_DATABASE=taskdb
PORT=8080
SPRING_PROFILES_ACTIVE=production
CORS_ALLOWED_ORIGINS=https://task-manager-frontend-drab-one.vercel.app,https://*.vercel.app
```

### 3. Deploy Backend

1. Push changes to backend repository
2. Render will auto-deploy
3. Check logs for any errors

### 4. Test Backend

Health check: https://task-manager-backend-1-8c2v.onrender.com/actuator/health
Should return: `{"status":"UP"}`

### 5. Remove Mock Mode

Once backend is working, remove mock code from frontend:
```javascript
// Remove this section from axiosInstance.js
if (error.response?.status >= 500 || error.code === "NETWORK_ERROR") {
  // Mock response code
}
```

## 🎯 Expected Result

- Backend returns 200 OK for all endpoints
- Frontend connects to real backend
- Real authentication flow works
- No more "Invalid token" errors
