package com.ssafy.berryfit.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditRoomReq {
	private String 	roomId;
	private String	roomTitle;
	private String	product;
	private int		startPrice;
	
}
