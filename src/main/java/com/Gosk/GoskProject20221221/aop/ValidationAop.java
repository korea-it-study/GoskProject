package com.Gosk.GoskProject20221221.aop;

import com.Gosk.GoskProject20221221.exception.CustomValidationException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Aspect
@Component
public class ValidationAop {
    @Pointcut("@annotation(com.Gosk.GoskProject20221221.aop.annotation.ValidAspect)")
    private void pointCut() {};

    @Before("pointCut()")
    public void before(JoinPoint jointPoint) throws Throwable{
        Object[] args = jointPoint.getArgs();

        BeanPropertyBindingResult bindingResult = null;

        for(Object arg : args) {
            if(arg.getClass() == BeanPropertyBindingResult.class) {
                bindingResult = (BeanPropertyBindingResult) arg;
                break;
            }
        }

        if(bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            bindingResult.getFieldErrors().forEach(error -> {
                errorMap.put(error.getField(), error.getDefaultMessage());
            });

            throw new CustomValidationException("Validation failed : ", errorMap);
        }


    }
    @AfterReturning(value = "pointCut()", returning = "returnObj")
    public void afterReturning(JoinPoint jointPoint, Object returnObj) {
        log.info("Validation success : {}", returnObj);
    }
}
