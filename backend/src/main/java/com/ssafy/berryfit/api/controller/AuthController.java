package com.ssafy.berryfit.api.controller;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.berryfit.api.request.UserLoginPostReq;
import com.ssafy.berryfit.api.response.BaseResponseBody;
import com.ssafy.berryfit.api.response.UserLoginPostRes;
import com.ssafy.berryfit.api.service.UserService;
import com.ssafy.berryfit.common.util.JwtTokenUtil;
import com.ssafy.berryfit.db.entity.User;
//import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@CrossOrigin(origins = "*", allowedHeaders = "*") //해당 리액트 포트 번호
@RestController
@RequestMapping("/api/user")
public class AuthController {
	@Autowired
	UserService userService;
	
	@Autowired
    private RedisTemplate<String, String> redisTemplate;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String email = loginInfo.getEmail();
		String password = loginInfo.getPassword();
		System.out.println("로그인 시도");
		User user = userService.getUserByEmail(email);
		
		if(user ==null) {
			return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "없는 아이디 입니다.", null));
		}
		
		//이메일 인증안하고 로그인 하면 돌려보내기
		if(!user.isAuthStatus()) {
			System.out.println(user.isAuthStatus()+"0d이다");
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "이메일 인증 해주세요", null));
		}
		 
		
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getPassword())) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, user.getNickname(), "Bearer "+JwtTokenUtil.getToken(email)));
		}
	
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "비밀번호가 틀렸습니다.", null));
	}
	
	@PostMapping("/logout")
    @Transactional
    public ResponseEntity logout(@RequestHeader String Authorization) {
		
		 String token = Authorization.split(" ")[1];	//앞에 bearer 없애기
//		 System.out.println("로그아웃"+token);	//잘 받아왔는지 출력 테스트
		//redis에 추가
		ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
		String key = "accessToken";
		
		//key : accessToken, value: "logout" ,1 일동안 redis에 저장
		valueOperations.set(token, "logout", 1, TimeUnit.DAYS);
//		System.out.println("로그아웃, redis에 추가완료");
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "로그아웃 성공"));
	}
	
	
}
