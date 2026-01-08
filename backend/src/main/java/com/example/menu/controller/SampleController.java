package com.example.menu.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/samples")
public class SampleController {

    @GetMapping("/fruits")
    public List<String> getFruits(){
        // In a real app, this might come from a DB or service
        return Arrays.asList("Apple", "Banana", "Cherry", "Grape", "Mango", "Orange", "Strawberry", "Watermelon");
    }
}
