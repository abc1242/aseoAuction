package com.ssafy.berryfit.db.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "entry")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Entry {
	
	 	@Id
	    @Column(name = "entry_id")
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer entryId;

	 	@JoinColumn(name ="room_id")
	 	@Column(name = "room_id")
	    private String roomId;

	    @Column(name = "nickname")
	    private String nickname;

	    @Column(name = "role")
	    private Integer role;
}
