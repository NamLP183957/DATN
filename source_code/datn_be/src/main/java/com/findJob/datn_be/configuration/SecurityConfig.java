package com.findJob.datn_be.configuration;

import com.findJob.datn_be.security.jwt.JwtConfigurer;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.authentication.AuthenticationManager;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConfigurer jwtConfigurer;
//    private final OAuthSuccessHandler oAuthSuccessHandler;
//    private final CustomOAuth2UserService oAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable().authorizeRequests()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/registration/**",
                        "/api/v1/auth/login",
                        "/api/v1/perfumes/**",
                        "/api/v1/users/cart",
                        "/api/v1/users/order/**",
                        "/api/v1/users/review/**",
                        "/websocket", "/websocket/**",
                        "/file/**")
                .permitAll()
                .antMatchers("/oauth2/**", "/auth/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .authorizationEndpoint().baseUri("/oauth2/authorize")
                .and()
//                .userInfoEndpoint().userService(oAuth2UserService)
                .and()
//                .successHandler(oAuthSuccessHandler)
//                .and()
                .apply(jwtConfigurer);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
