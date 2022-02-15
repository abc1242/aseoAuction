package com.ssafy.berryfit.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.ssafy.berryfit.api.request.CloseRoomReq;
import com.ssafy.berryfit.api.request.EditRoomReq;
import com.ssafy.berryfit.api.request.JoinRoomReq;
import com.ssafy.berryfit.api.request.MakeRoomReq;
import com.ssafy.berryfit.api.request.SearchRoomReq;
import com.ssafy.berryfit.api.response.RoomRes;
import com.ssafy.berryfit.db.entity.Entry;
import com.ssafy.berryfit.db.entity.Room;
import com.ssafy.berryfit.db.repository.EntryRepository;
import com.ssafy.berryfit.db.repository.RoomRepository;

@Service
public class RoomService {
	private final RoomRepository roomRepository;
	private final EntryRepository entryRepository;
	
	@Autowired
    public RoomService(RoomRepository roomRepository, EntryRepository entryRepository) {
        this.roomRepository = roomRepository;
        this.entryRepository = entryRepository;
    }
	 @Value("${custom.host}")
	    private String serverAddress;
	//경매실 생성
	@Transactional
	public Entry makeRoom(final MakeRoomReq makeRoomReq) {
		//경매실생성
		Room room = Room.builder()

				.roomTitle(makeRoomReq.getRoomTitle())
				.product(makeRoomReq.getProduct())
				.seller(makeRoomReq.getSeller())
				.startPrice(makeRoomReq.getStartPrice())
				.mimetype(makeRoomReq.getMimetype())
				.original_name(makeRoomReq.getOriginal_name())
				.data(makeRoomReq.getData())
				.buyer("")
				.endPrice(0)
				.roomStatus("진행중")
				.build();
		roomRepository.save(room);
		//경매사 참가
		Entry entry = Entry.builder()
				
				.roomTitle(makeRoomReq.getRoomTitle())
				.nickname(makeRoomReq.getSeller())
				.role(1)
			
				.build();

		
		
		
		return entryRepository.save(entry);
	}
	
	//경매실 정보 조회
	
	@Transactional
	public RoomRes informRoom(final SearchRoomReq searchRoomReq){
		
		String text = searchRoomReq.getRoomTitle();
		
		
		Room room = roomRepository.findRoomByRoomTitle(text);
		String img = serverAddress+"/room/informImg/"+room.getRoomTitle();
		
		RoomRes roomres = new RoomRes(room.getRoomId(), room.getRoomTitle(), room.getProduct(), room.getStartPrice(),img, room.getBuyer(), room.getEndPrice(), room.getRoomStatus(), room.getCreatedAt());
		
		
		
		
		System.out.println(text +" : 정보조회중");
		roomRepository.findRoomByRoomTitle(text);
		return roomres;
	}
	
	@Transactional
	public Room informRoomImg(final SearchRoomReq searchRoomReq){
		
		String text = searchRoomReq.getRoomTitle();
		
		System.out.println(text +" : 이미지조회중");
		return roomRepository.findRoomByRoomTitle(text);
	}

	
	//경매실 정보 수정
	@Transactional
	public Room editRoom(final EditRoomReq editRoomReq){
		int roomid = editRoomReq.getRoomId();
		Room editRoom = roomRepository.findRoomByRoomId(roomid);
		
		editRoom.setRoomTitle(editRoomReq.getRoomTitle());
		editRoom.setProduct(editRoomReq.getProduct());
		editRoom.setStartPrice(editRoomReq.getStartPrice());
		
		System.out.println(roomid +" : 경매실 정보 수정중");
		
		return roomRepository.save(editRoom);
	}
	
	
	//경매실 검색
	@Transactional
	public List<Room> searchRoom(final SearchRoomReq searchRoomReq){
		
		String text = searchRoomReq.getRoomTitle();
		
		
		System.out.println(text +" : 검색중");
		return roomRepository.findRoomByRoomTitleContaining(text);
	}
	
	//경매실 종료
	@Transactional
	public Room closeRoom(final CloseRoomReq closeRoomReq){
		String text = closeRoomReq.getRoomTitle();
		Room closeRoom = roomRepository.findRoomByRoomTitle(text);
		
		closeRoom.setBuyer(closeRoomReq.getBuyer());
		closeRoom.setEndPrice(closeRoomReq.getEndPrice());
		closeRoom.setRoomStatus("경매종료");
		
		System.out.println(text +" : 경매종료중");
		
		//엔트리 삭제
		
		
		
		
		entryRepository.deleteAllByRoomTitle(text);
		
		
		return roomRepository.save(closeRoom);
	}

	
	//경매실 참가
	@Transactional
	public Entry joinRoom(final JoinRoomReq joinRoomReq) {
		
		Entry entry = Entry.builder()
				
					.roomTitle(joinRoomReq.getRoomTitle())
					.nickname(joinRoomReq.getNickname())
					.role(0)
				
					.build();

		return entryRepository.save(entry);
	}
	
	//경매실 나가기
	@Transactional
	public void leaveRoom(final JoinRoomReq joinRoomReq) {
		String roomTitle = joinRoomReq.getRoomTitle();
		String nickname = joinRoomReq.getNickname();
		
		Entry leaveEntry = entryRepository.findEntryByRoomTitleAndNickname(roomTitle,nickname);
		
		entryRepository.delete(leaveEntry);
	}
	
}
