package com.ssafy.blahblahchat.api.service.member;

import com.ssafy.blahblahchat.db.entity.User;
import com.ssafy.blahblahchat.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User getUserByEmail(String email) {
		 //디비에 유저 정보 조회 (email을 통한 조회).
		User user = userRepository.findByEmail(email).get();
		return user;
	}
}
