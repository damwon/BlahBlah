package com.ssafy.blahblahcall.api.service.member;



import com.ssafy.blahblahcall.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User getUserByEmail(String userId);
}
