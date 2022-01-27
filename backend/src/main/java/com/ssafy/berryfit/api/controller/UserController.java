package com.ssafy.berryfit.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.berryfit.api.request.SignUpReq;
import com.ssafy.berryfit.api.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	 private final UserService userService;
	 
	 @Value("${custom.host}")
	 private String serverAddress;
	 
	 @Autowired
	    public UserController(UserService userService) {
	        this.userService = userService;
	      
	    }
	 
	 
	//유저 컨트롤러 
    @PostMapping("/signup")
	public ResponseEntity signup(@Valid @RequestBody SignUpReq signUpReq) throws UnknownHostException, MessagingException {
     	System.out.println("회원가입 페이지 로딩");
//    	SignUpReq test = new SignUpReq("a@a.a","pw","nick");
   
//        userService.signup(test);
        userService.signup(signUpReq);
        
		return new ResponseEntity(HttpStatus.OK);
	}

	@GetMapping("/signup/confirm")
	public ResponseEntity confirmEmail(@RequestParam Map<String, String> map) throws URISyntaxException {
		// email, authKey가 일치할 경우 authStatus 업데이트
		System.out.println("회원가입 메일 인증");
		userService.updateAuthStatus(map);

		URI redirectUri = new URI(serverAddress + "/emailconfirmed");
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(redirectUri);

		return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
	}
	


}
