package com.ssafy.berryfit.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CloseRoomReq {

	private String	roomTitle;
	private String	buyer	;
	private int		endPrice;
}
