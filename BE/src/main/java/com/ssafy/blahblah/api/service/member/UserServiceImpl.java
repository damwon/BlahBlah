package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.api.request.member.UserInfoPostReq;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


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
	public Optional<User> isUserByEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		return user;
	}


	@Override
	public User createUser(UserInfoPostReq userRegisterInfo) {
		User user = new User();
		String email = userRegisterInfo.getEmail();
		if (email.isBlank()) {
			return null;
		}
		user.setEmail(email);

		String name = userRegisterInfo.getName();
		if (name.isBlank()) {
			return null;
		}
		user.setName(name);

		Integer gender  = userRegisterInfo.getGender();
		if (gender == null) {
			return null;
		}
		user.setGender(gender);

		Integer age = userRegisterInfo.getAge();
		if (age == null) {
			return null;
		}
		user.setAge(age);

		String description = userRegisterInfo.getDescription();
		if (description.isBlank()) {
			description = null;
		}
		user.setDescription(description);

		String profileImg = userRegisterInfo.getProfileImg();
		if (profileImg.isBlank()) {
			profileImg = null;
		}
		user.setProfileImg(profileImg);
		user.setAuthority("user");
		user.setCreatedAt(LocalDateTime.now());
		user.setExpiredAt(LocalDateTime.now());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		return userRepository.save(user);
	}

	@Override
	public void saveUser(User user) {
		userRepository.save(user);
	};

	@Override
	public User getUserByEmail(String email) {
		 //디비에 유저 정보 조회 (email을 통한 조회).
		User user = userRepository.findByEmail(email).get();
		return user;
	}

	@Override
	public List<User> getUserTable() {
		return userRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
	}
}
