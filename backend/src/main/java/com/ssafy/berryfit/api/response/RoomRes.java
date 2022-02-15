package com.ssafy.berryfit.api.response;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RoomRes {

	private int roomId;
	private String roomTitle;
	private String product;
	private int startPrice;
	private String seller;
	
	private String category;
	private String imgUrl;
	private String buyer;
	private int endPrice;
	private boolean roomStatus;
	private Timestamp createdAt;
}
