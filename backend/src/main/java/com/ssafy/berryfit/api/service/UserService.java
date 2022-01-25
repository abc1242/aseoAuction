package com.ssafy.berryfit.api.service;

import java.net.UnknownHostException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.berryfit.api.request.SignUpReq;
import com.ssafy.berryfit.db.entity.User;
import com.ssafy.berryfit.db.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final MailService mailService;
	
	
	@Autowired
    public UserService(UserRepository userRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
	
	@Transactional
    public User signup(final SignUpReq signUpReq) throws MessagingException, UnknownHostException {
     

      
        String authKey = mailService.sendAuthMail(signUpReq.getEmail(), signUpReq.getNickname());
//        int imgNum = (int) (Math.random()*25 + 1);

        User user = User.builder()
                .email(signUpReq.getEmail())
                .password(signUpReq.getPassword())
                .nickname(signUpReq.getNickname())
                .authKey(authKey)
                .authStatus(false)
                .build();

        return userRepository.save(user);
    }
	
	@Transactional
    public User updateAuthStatus(Map<String, String> map) {
        String email = map.get("email");
        String authKey = map.get("authKey");
        User updateUser = userRepository.findUserByEmailAndAuthKey(email, authKey).orElse(null);

//        if (updateUser == null) {
//            throw new UserNotFoundException(email);
//        }

        updateUser.setAuthStatus(true);
        System.out.println(updateUser.getEmail()+ " : 이메일 인증중인 아이디");
        return userRepository.save(updateUser);
    }
}
