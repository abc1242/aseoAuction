package com.ssafy.berryfit.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.berryfit.api.request.CloseRoomReq;
import com.ssafy.berryfit.api.request.EditRoomReq;
import com.ssafy.berryfit.api.request.JoinRoomReq;
import com.ssafy.berryfit.api.request.MakeRoomReq;
import com.ssafy.berryfit.api.request.SearchRoomReq;
import com.ssafy.berryfit.api.response.BaseResponseBody;
import com.ssafy.berryfit.api.service.RoomService;

@RestController
@RequestMapping("/room")
public class RoomController {

	private final RoomService roomService;
	
	@Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
      
    }
	
	//경매실 생성
	@PostMapping("/open")
	public ResponseEntity openRoom(@RequestBody MakeRoomReq makeRoomReq) {
		
		roomService.makeRoom(makeRoomReq);
		System.out.println("경매실 생성");
		
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "경매실 생성 성공"));
	}
	
	//경매실 정보 조회
	@GetMapping("/inform")
	public ResponseEntity informRoom(@RequestBody SearchRoomReq searchRoomReq) {
		
		
		return new ResponseEntity(roomService.informRoom(searchRoomReq),HttpStatus.OK);
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
