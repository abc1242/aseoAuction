package com.ssafy.berryfit.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MakeRoomReq {
	private int 	roomId;
	private String	roomTitle;
	private String	product;
	private String	seller	;
	private int		startPrice;

	
}
