package com.ssafy.berryfit.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.berryfit.db.entity.Entry;
import com.ssafy.berryfit.db.entity.User;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Integer>{

	//나가기
	Entry findEntryByRoomTitleAndNickname(String roomTitle, String nickname);
	
	
	//참여자 목록 조회
	
	List<Entry> findByRoomTitle(String roomTitle);
	
	
	//경매종료 시 전부삭제
	void deleteAllByRoomTitle(String roomTitle);
}
