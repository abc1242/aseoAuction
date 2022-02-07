import React from "react";
import styles from "./SectionHero.module.css";
import bidImg from "../../images/bid.png";

const SectionHero = () => {
  return (
    <section className={styles.sectionHero}>
      <div className={styles.hero}>
        <div className={styles.heroTextBox}>
          <h1 className="headingPrimary">
            이젠 경매를 통해 빠르게 중고거래를 해보세요
          </h1>
          <p className={styles.heroDescription}>
            몇시간, 몇일 동안 거래 상대방과 가격 흥정하는 데 지치셨나요? 이젠
            10분간의 경매를 통해 중고거래를 신속하게 끝내보세요!
          </p>
          <a href="#" className="btn">
            회원가입
          </a>
        </div>

        <div className={styles.heroImgBox}>
          {/* 나중에 이미지 교체해야 함 */}
          <img className={styles.heroImg} src={bidImg} alt="온라인 경매"></img>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
