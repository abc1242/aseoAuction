package com.ssafy.berryfit.api.service;

import java.util.ArrayList;
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
import com.ssafy.berryfit.api.request.SearchCategory;
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
				.roomId(makeRoomReq.getRoomId())
				.roomTitle(makeRoomReq.getRoomTitle())
				.product(makeRoomReq.getProduct())
				.seller(makeRoomReq.getSeller())
				.startPrice(makeRoomReq.getStartPrice())
				.category(makeRoomReq.getCategory())
				.mimetype(makeRoomReq.getMimetype())
				.original_name(makeRoomReq.getOriginal_name())
				.data(makeRoomReq.getData())
				.buyer("")
				.endPrice(0)
				.roomStatus(true)
				.build();
		roomRepository.save(room);
		//경매사 참가
		Entry entry = Entry.builder()
				
				.roomId(makeRoomReq.getRoomId())
				.nickname(makeRoomReq.getSeller())
				.role(1)
			
				.build();

		
		
		
		return entryRepository.save(entry);
	}
	
	//경매실 정보 조회
	
	@Transactional
	public RoomRes informRoom(final String roomId){
	
		
		
		Room room = roomRepository.findRoomByRoomId(roomId);
		
		if(room == null) {return null;}
		String img = serverAddress+"/api/room/informImg/"+room.getRoomId();
		List<Entry> entryList = entryRepository.findByRoomId(room.getRoomId());
		List<String> participantList = new ArrayList<String>();
		for (Entry entry : entryList) {
			
			participantList.add(entry.getNickname());
		}
		
		RoomRes roomres = new RoomRes(room.getRoomId(), room.getRoomTitle(), room.getProduct(), room.getStartPrice(), room.getSeller(), room.getCategory(),img,participantList,room.getBuyer(), room.getEndPrice(), room.isRoomStatus(), room.getCreatedAt());
		
		
		
		
		//System.out.println(roomTitle +" : 정보조회중");
		return roomres;
	}
	
	@Transactional
	public List<RoomRes>  categoryRoom(final SearchCategory searchCategory){
		String category = searchCategory.getCategory();
		
		List<Room> roomlist = roomRepository.findRoomByCategory(category);
		
		List<RoomRes> roomreslist = new ArrayList<RoomRes>();
		
		//room을 roomlist로 바꾸기
		for (Room room : roomlist) {
			String img = serverAddress+"/room/informImg/"+room.getRoomId();
			List<Entry> entryList = entryRepository.findByRoomId(room.getRoomId());
			List<String> participantList = new ArrayList<String>();
			for (Entry entry : entryList) {
				
				participantList.add(entry.getNickname());
			}
			
			roomreslist.add(new RoomRes(room.getRoomId(), room.getRoomTitle(), room.getProduct(), room.getStartPrice(), room.getSeller(), room.getCategory(),img,participantList,room.getBuyer(), room.getEndPrice(), room.isRoomStatus(), room.getCreatedAt()));
			
		}
		System.out.println(" : 카테고리조회중");
		return roomreslist;
	}
	
	@Transactional
	public Room informRoomImg(final String roomId){
		
//		String text = searchRoomReq.getRoomTitle();
		
//		System.out.println(text +" : 이미지조회중");
		return roomRepository.findRoomByRoomId(roomId);
	}

	
	//경매실 정보 수정
	@Transactional
	public Room editRoom(final EditRoomReq editRoomReq){
		String roomid = editRoomReq.getRoomId();
		Room editRoom = roomRepository.findRoomByRoomId(roomid);
		
		editRoom.setRoomTitle(editRoomReq.getRoomTitle());
		editRoom.setProduct(editRoomReq.getProduct());
		editRoom.setStartPrice(editRoomReq.getStartPrice());
		
		System.out.println(roomid +" : 경매실 정보 수정중");
		
		return roomRepository.save(editRoom);
	}
	
	
	//경매실 검색
	@Transactional
	public List<RoomRes>  searchRoom(final SearchRoomReq searchRoomReq){
		
		String text = searchRoomReq.getRoomTitle();
		List<Room> roomlist = roomRepository.findRoomByRoomTitleContaining(text);
		List<RoomRes> roomreslist = new ArrayList<RoomRes>();
		//room을 roomlist로 바꾸기
				for (Room room : roomlist) {
					String img = serverAddress+"/room/informImg/"+room.getRoomId();
					List<Entry> entryList = entryRepository.findByRoomId(room.getRoomId());
					List<String> participantList = new ArrayList<String>();
					for (Entry entry : entryList) {
						
						participantList.add(entry.getNickname());
					}
					
					roomreslist.add(new RoomRes(room.getRoomId(), room.getRoomTitle(), room.getProduct(), room.getStartPrice(), room.getSeller(),room.getCategory(),img,participantList, room.getBuyer(), room.getEndPrice(), room.isRoomStatus(), room.getCreatedAt()));
					
				}
		
		System.out.println(text +" : 검색중");
		return roomreslist;
	}
	
	//경매실 종료
	@Transactional
	public Room closeRoom(final CloseRoomReq closeRoomReq){
		String text = closeRoomReq.getRoomId();
		Room closeRoom = roomRepository.findRoomByRoomId(text);
		
		closeRoom.setBuyer(closeRoomReq.getBuyer());
		closeRoom.setEndPrice(closeRoomReq.getEndPrice());
		closeRoom.setRoomStatus(false);
		
		System.out.println(text +" : 경매종료중");
		
		//엔트리 삭제
		
		
		
		
		entryRepository.deleteAllByRoomId(text);
		
		
		return roomRepository.save(closeRoom);
	}

	
	//경매실 참가
	@Transactional
	public Entry joinRoom(final JoinRoomReq joinRoomReq) {
		
		Entry entry = Entry.builder()
				
					.roomId(joinRoomReq.getRoomId())
					.nickname(joinRoomReq.getNickname())
					.role(0)
				
					.build();

		return entryRepository.save(entry);
	}
	
	//경매실 나가기
	@Transactional
	public void leaveRoom(final JoinRoomReq joinRoomReq) {
		String roomId = joinRoomReq.getRoomId();
		String nickname = joinRoomReq.getNickname();
		
		Entry leaveEntry = entryRepository.findEntryByRoomIdAndNickname(roomId,nickname);
		
		entryRepository.delete(leaveEntry);
	}
	
}
