package com.ssafy.berryfit.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.berryfit.db.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, String>{

	//정보 조회
	Room findRoomByRoomTitle(String roomTitle);
	
	//정보 수정
	Room findRoomByRoomId(int roomId);
	
	
	//검색
	List<Room> findRoomByRoomTitleContaining(String roomTitle);

	
	//카테고리
	List<Room> findRoomByCategory(String category);
}
