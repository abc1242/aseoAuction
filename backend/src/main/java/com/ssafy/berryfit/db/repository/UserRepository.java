package com.ssafy.berryfit.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.berryfit.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findUserByEmailAndAuthKey(String email, String authKey);
	Optional<User> findUserByEmail(String email);
	
}
