package com.findJob.datn_be.service;

import com.findJob.datn_be.util.Translator;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public static String getMessage(String code) {
        return Translator.toLocale(code);
    }
}
