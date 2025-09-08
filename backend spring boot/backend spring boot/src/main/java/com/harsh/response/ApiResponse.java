package com.harsh.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApiResponse {

    private String message;
    private boolean status;
    private Object data; // optional data payload

    // Constructor without data for backward compatibility
    public ApiResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}
