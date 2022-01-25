package com.ssafy.berryfit.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter

public class SignUpReq {
	
	
	private String email;
	private String password;
	private String nickname;
}
