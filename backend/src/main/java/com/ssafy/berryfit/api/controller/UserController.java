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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.berryfit.api.request.EmailReq;
import com.ssafy.berryfit.api.request.SignUpReq;
import com.ssafy.berryfit.api.request.UserLoginPostReq;
import com.ssafy.berryfit.api.response.BaseResponseBody;
import com.ssafy.berryfit.api.response.UserLoginPostRes;
import com.ssafy.berryfit.api.service.UserService;
import com.ssafy.berryfit.db.entity.User;

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
	 
	 @Autowired
		PasswordEncoder passwordEncoder;
	 
	 
	//유저 컨트롤러 
    @PostMapping("/signup")
	public ResponseEntity signup(@Valid @RequestBody SignUpReq signUpReq) throws UnknownHostException, MessagingException {
     	System.out.println("회원가입 페이지 로딩");
   
        userService.signup(signUpReq);
        
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입 성공"));
	}
//
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
	
	@DeleteMapping("/delete")
	public  ResponseEntity delete(@RequestBody EmailReq email) {
		System.out.println("회원탈퇴: ");
		userService.deleteUser(email);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원탈퇴 성공"));
	}

	
	@PutMapping("/mypage")
	public ResponseEntity getmypage(@RequestBody UserLoginPostReq loginreq) {
		System.out.println("마이페이지호출");
		//req 정보
		String email = loginreq.getEmail();
		String password = loginreq.getPassword();
		
		User realUser = userService.getUserByEmail(email);
		//req와 db 비교하기
		
		System.out.println(password);
		System.out.println(realUser.getPassword());
		
		if(passwordEncoder.matches(password, realUser.getPassword())) { 
			//비밀번호가 일치할경우
			 return ResponseEntity.ok(realUser);
			
		}else {
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "비밀번호가 틀렸습니다.", null));
		}
		
		
	}
	
	@PutMapping("/editmypage")
	public ResponseEntity getmypage(@RequestBody SignUpReq signUpReq) {
		userService.updateUser(signUpReq);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "마이페이지 수정 성공"));
	}



}
