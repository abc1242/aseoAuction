package com.ssafy.berryfit.api.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.berryfit.api.request.CloseRoomReq;
import com.ssafy.berryfit.api.request.EditRoomReq;
import com.ssafy.berryfit.api.request.JoinRoomReq;
import com.ssafy.berryfit.api.request.MakeRoomReq;
import com.ssafy.berryfit.api.request.SearchCategory;
import com.ssafy.berryfit.api.request.SearchRoomReq;
import com.ssafy.berryfit.api.response.BaseResponseBody;
import com.ssafy.berryfit.api.response.RoomRes;
import com.ssafy.berryfit.api.service.RoomService;
import com.ssafy.berryfit.db.entity.Room;

@RestController
@CrossOrigin(origins = "http://localhost:3000") //해당 리액트 포트 번호
@RequestMapping("/room")
public class RoomController {

	private final RoomService roomService;
	
	@Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
      
    }
	
	//경매실 생성
		@PostMapping("/open")
		public ResponseEntity openRoom(
				@RequestParam("roomTitle") String roomTitle,
				@RequestParam("product") String product,
				@RequestParam("seller") String seller,
				@RequestParam("startPrice") int startPrice,
				@RequestParam("category") String category,
				@RequestParam("img") MultipartFile img) throws IOException
				 {

			
			roomService.makeRoom(new MakeRoomReq(roomTitle,product,seller,startPrice,category,
					img.getContentType(), img.getOriginalFilename(), img.getBytes() ));
			System.out.println("경매실 생성");
			
			
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 생성 성공"));
		}
	
//	//경매실 생성
//	@PostMapping("/open")
//	public ResponseEntity openRoom(@RequestBody MakeRoomReq makeRoomReq) {
//		
//		roomService.makeRoom(makeRoomReq);
//		System.out.println("경매실 생성");
//		
//		
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 생성 성공"));
//	}
	
	//경매실 상세 정보 조회 
	@GetMapping("/inform/{roomId}")
	public ResponseEntity informRoom(@PathVariable(name = "roomId") int roomId) {
		//"roomTitle" : "팝니다"
		
		RoomRes roomres = roomService.informRoom(roomId);

		if(roomres ==null) {
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "경매실이 없습니다."));
		}
		
		return new ResponseEntity(roomres,HttpStatus.OK);

	}
	
	
	//카테고리로조회
	@GetMapping("/category/{category}")
	public ResponseEntity categoryRoom(@PathVariable(name = "category") String category) {
		SearchCategory searchCategory = new SearchCategory();
		searchCategory.setCategory(category);
		List<RoomRes>  roomreslist = roomService.categoryRoom(searchCategory);

		
		return new ResponseEntity(roomreslist,HttpStatus.OK);

	}
	 
	//경매실 정보 이미지 조회
		@GetMapping("/informImg/{roomId}")
		public ResponseEntity informImgRoom(@PathVariable(name = "roomId") int roomId) {
			
//			SearchRoomReq searchRoomReq = new SearchRoomReq();
//			searchRoomReq.setRoomTitle(roomTitle);
			
			Room room = roomService.informRoomImg(roomId);
			
			HttpHeaders headers = new HttpHeaders();
	        headers.add("Content-Type", room.getMimetype());
	        headers.add("Content-Length", String.valueOf(room.getData().length));
			
			
//			return new ResponseEntity(room,HttpStatus.OK);
			return new ResponseEntity<byte[]>(room.getData(), headers, HttpStatus.OK);
		}
	
	
	//경매실 정보 수정
	@PutMapping("/edit")
	public ResponseEntity editRoom(@RequestBody EditRoomReq editRoomReq ) {
		
		roomService.editRoom(editRoomReq);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 정보 수정 성공"));
	}
	
	//경매실 검색
	@GetMapping("/search/{roomTitle}")
	public ResponseEntity searchRoom(@PathVariable(name = "roomTitle") String roomTitle) {
		SearchRoomReq searchRoomReq = new SearchRoomReq();
		searchRoomReq.setRoomTitle(roomTitle);
		
		return new ResponseEntity(roomService.searchRoom(searchRoomReq),HttpStatus.OK);
	}
	@GetMapping("/search/")
	public ResponseEntity searchRoom2() {
		SearchRoomReq searchRoomReq = new SearchRoomReq();
		searchRoomReq.setRoomTitle("");
		System.out.println("전체검색");
		return new ResponseEntity(roomService.searchRoom(searchRoomReq),HttpStatus.OK);
	}
	
//	//경매실 검색
//		@GetMapping("/search")
//		public ResponseEntity searchRoom(@RequestBody SearchRoomReq searchRoomReq) {
//			
//			
//			return new ResponseEntity(roomService.searchRoom(searchRoomReq),HttpStatus.OK);
//		}

	
	
	//경매실 종료
	@PutMapping("/close")
	public ResponseEntity closeRoom(@RequestBody CloseRoomReq closeRoomReq ) {
		
		roomService.closeRoom(closeRoomReq);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 종료"));
	}
	
	
	//경매실 참가
	@PostMapping("/join")
	public ResponseEntity joinRoom(@RequestBody JoinRoomReq joinRoomReq) {
		
		roomService.joinRoom(joinRoomReq);
		System.out.println("경매실 참가");
		
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 참가 성공"));
	}

	
	
	//경매실 나가기
	
	@DeleteMapping("/leave")
	public ResponseEntity leaveRoom(@RequestBody JoinRoomReq joinRoomReq) {
		
		roomService.leaveRoom(joinRoomReq);
		System.out.println("경매실 나가기");
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 나가기 성공"));
	}

	
}
