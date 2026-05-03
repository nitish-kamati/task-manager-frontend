# Backend Environment Setup Guide

## 🎯 Purpose
Make your Spring Boot backend work both locally and online without code changes.

## 📁 Files to Update in Your Backend

### 1. Replace `src/main/resources/application.properties`
```properties
# Common Configuration
spring.application.name=task-manager

# Database Configuration - Using environment variables
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://nitish_db_user:nitish%401231@task-manager-cluster.ggcoxrj.mongodb.net/taskdb}
spring.data.mongodb.database=${MONGODB_DATABASE:taskdb}

# Server Configuration
server.port=${PORT:8080}

# CORS Configuration
cors.allowed.origins=${CORS_ALLOWED_ORIGINS:http://localhost:5173,https://task-manager-frontend-drab-one.vercel.app,https://*.vercel.app}

# Logging
logging.level.com.nitish.task_manager=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

### 2. Update `src/main/java/com/nitish/task_manager/config/CorsConfig.java`
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

## 🚀 Deployment Instructions

### Local Development
```bash
# Run locally (uses default values)
mvn spring-boot:run

# Or with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

### Production (Render)
Set these environment variables in Render dashboard:
```
MONGODB_URI=mongodb+srv://nitish_db_user:nitish%401231@task-manager-cluster.ggcoxrj.mongodb.net/taskdb
MONGODB_DATABASE=taskdb
PORT=8080
CORS_ALLOWED_ORIGINS=https://task-manager-frontend-drab-one.vercel.app,https://*.vercel.app
```

## 🌟 Benefits
- ✅ **Local**: Uses `http://localhost:8080` and local CORS
- ✅ **Production**: Uses Render port and production CORS
- ✅ **No Code Changes**: Environment-based configuration
- ✅ **Secure**: Sensitive data in environment variables

## 📱 Testing
- **Local**: `http://localhost:8080`
- **Online**: `https://task-manager-backend-1-8c2v.onrender.com`
