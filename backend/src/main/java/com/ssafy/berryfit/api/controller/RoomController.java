package com.ssafy.berryfit.api.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.ssafy.berryfit.api.request.SearchRoomReq;
import com.ssafy.berryfit.api.response.BaseResponseBody;
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
				@RequestParam("img") MultipartFile img) throws IOException
				 {

			
			roomService.makeRoom(new MakeRoomReq(roomTitle,product,roomTitle,startPrice,
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
	
	//경매실 정보 조회
	@GetMapping("/inform")
	public ResponseEntity informRoom(@RequestBody SearchRoomReq searchRoomReq) {
		
		Room room = roomService.informRoom(searchRoomReq);

		
		return new ResponseEntity(room,HttpStatus.OK);

	}
	
	//경매실 정보 이미지 조회
		@GetMapping("/informImg")
		public ResponseEntity informImgRoom(@RequestBody SearchRoomReq searchRoomReq) {
			
			Room room = roomService.informRoom(searchRoomReq);
			
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
	@GetMapping("/search")
	public ResponseEntity searchRoom(@RequestBody SearchRoomReq searchRoomReq) {
		
		
		return new ResponseEntity(roomService.searchRoom(searchRoomReq),HttpStatus.OK);
	}
	
	
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
