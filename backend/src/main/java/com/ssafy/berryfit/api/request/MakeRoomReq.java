package com.ssafy.berryfit.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@AllArgsConstructor
public class MakeRoomReq {
	private String roomId;
	private String	roomTitle;
	private String	product;
	private String	seller	;
	private int		startPrice;
	private String category;
	//img
	 private String mimetype;
	 private String original_name;
	 private byte[] data;

	
}
