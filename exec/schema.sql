create database aseoAuction_db;
use aseoAuction_db;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '회원번호',
  `nickname` varchar(10) NOT NULL COMMENT '닉네임',
  `email` varchar(50) NOT NULL COMMENT '이메일',
  `password` varchar(200) NOT NULL COMMENT '비밀번호',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '회원 가입 시간',
 # `token` varchar(200) DEFAULT NULL COMMENT '소셜 로그인 토큰',
  `auth_key` varchar(8) NOT NULL COMMENT '인증번호',
  `auth_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '인증여부',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COMMENT='회원';


CREATE TABLE `room` (
  `room_id`  varchar(10) NOT NULL COMMENT  '경매실 번호',
  `room_title` varchar(50) NOT NULL COMMENT '경매실 제목' unique,
  `product` varchar(500) NOT NULL COMMENT '상품 설명',
  `seller` varchar(50) NOT NULL COMMENT '경매사 닉네임',
  `start_price` int NOT NULL COMMENT '시작가격',
  `category` varchar(50) NOT NULL COMMENT '카테고리',
	`mimetype`      varchar(100)	null,
	`data`          longblob       null,
    `original_name` varchar(100)   null,
  `buyer` varchar(50) NOT NULL DEFAULT 'x' COMMENT '낙찰자 닉네임',
  `end_price` int NOT NULL DEFAULT 0 COMMENT '낙찰가격',
  `room_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '경매 상태(진행중1 , 종료0)',
  #`room_status` varchar(10) NOT NULL DEFAULT '진행중' COMMENT '경매 상태(진행중 , 종료)',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '경매실 생성 시간',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='경매실';

CREATE TABLE `entry` (
  `entry_id` int NOT NULL AUTO_INCREMENT COMMENT '참가자목록 번호',
  `room_id` varchar(10)      NOT NULL COMMENT '경매실 제목',
  `nickname` varchar(10) NOT NULL COMMENT '닉네임',
  `role` tinyint(1) NOT NULL DEFAULT '1' COMMENT '역할', 
  PRIMARY KEY (`entry_id`),
  foreign key (`room_id`) references `room` (`room_id`) ON DELETE CASCADE on update cascade
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COMMENT='회원';