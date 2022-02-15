package com.ssafy.berryfit.db.entity;

import java.sql.Timestamp;

import javax.annotation.Nullable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "room")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {

    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @Column(name = "room_title", length = 50)
    private String roomTitle;
    

    @Column(name = "product", length = 500)
    private String product;
    
    @Column(name = "seller", length = 50)
    private String seller;

    
    @Column(name = "start_price")
    private Integer startPrice;
    
    //img
    @Column(name = "mimetype")
    private String mimetype;
    
    @Column(name = "original_name")
	private String original_name;
    
    @Column(name = "data")
	private byte[] data;
    
    @Column(name = "buyer", length = 50)
    private String buyer;

    @Column(name = "end_price")
    private Integer endPrice;

   
    @Column(name = "room_status", length = 10)
    private boolean roomStatus;


    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;


}
