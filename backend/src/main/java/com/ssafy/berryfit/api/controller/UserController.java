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

import com.ssafy.berryfit.api.request.EmailReq;
import com.ssafy.berryfit.api.request.SignUpReq;
import com.ssafy.berryfit.api.service.UserService;

@CrossOrigin(origins = "http://localhost:3000") //해당 리액트 포트 번호
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
     	System.out.println("회원가입 ");
   
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
	
	@DeleteMapping
	public  ResponseEntity delete(@RequestBody EmailReq email) {
		System.out.println("회원탈퇴: ");
		userService.deleteUser(email);

		return new ResponseEntity(HttpStatus.OK);
	}
	
	@GetMapping("/mypage")
	public ResponseEntity getmypage(@RequestBody EmailReq emailreq) {
			String email = emailreq.getEmail();
		 return ResponseEntity.ok(userService.getUserByEmail(email));
	}
	
	@PutMapping("mypage")
	public ResponseEntity getmypage(@RequestBody SignUpReq signUpReq) {
		userService.updateUser(signUpReq);
		
		return new ResponseEntity(HttpStatus.OK);
	}


}
