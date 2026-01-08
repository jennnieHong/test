package com.example.menu.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * MyBatis configuration.
 */
@Configuration
@MapperScan("com.example.menu.mapper")
public class MyBatisConfig {
}
