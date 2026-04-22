package com.example.app.core;

public sealed interface Result<T> permits Result.Success, Result.Failure {
    static <T> Success<T> ok(T value) { return new Success<>(value); }
    static Failure fail(String code, String message) { return new Failure(code, message); }

    record Success<T>(T value) implements Result<T> { }
    record Failure(String code, String message) implements Result<Object> { }
}
