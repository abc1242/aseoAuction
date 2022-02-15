import React from "react";
import styles from "./SectionHow.module.css";
import step01Img from "../../images/steps/app-screen-1.png";

const SectionHow = () => {
  return (
    <section className={styles.sectionHow}>
      <div className="container">
        <span className="subheading">HOW IT WORKS</span>
        <h2 className="headingSecondary">
          경매장을 개설하고 중고거래를 시작해봐요
        </h2>
      </div>

      <div
        className={`${styles.grid} container grid grid--2--cols grid-center-v`}
      >
        <div className={styles.stepImgBox}>
          <img
            className={styles.stepImg}
            src={step01Img}
            alt="실제 경매하는 화면"
          />
        </div>
        <div className={styles.stepTextBox}>
          <p className={styles.stepNumber}>01</p>
          <p className="headingTertiary">경매실 개설하기</p>
          <p className={styles.stepDescription}>
            경매를 시작하기 위해선 먼저 경매실을 개설해야 되요. 경매 참여율을
            높이기 위해서는 물품 정보를 자세하게 입력하고 시작 가격을 낮추면
            됩니다!
          </p>
        </div>

        <div className={styles.stepTextBox}>
          <p className={styles.stepNumber}>02</p>
          <p className="headingTertiary">제품 홍보</p>
          <p className={styles.stepDescription}>
            경매가 시작되기전 제품을 열심히 홍보해야 되요. 제품 정보를 상세하게
            전달할 수록 높은 가격에 낙찰된답니다.
          </p>
        </div>
        <div className={styles.stepImgBox}>
          <img
            className={styles.stepImg}
            src={step01Img}
            alt="실제 경매하는 화면"
          />
        </div>

        <div className={styles.stepImgBox}>
          <img
            className={styles.stepImg}
            src={step01Img}
            alt="실제 경매하는 화면"
          />
        </div>
        <div className={styles.stepTextBox}>
          <p className={styles.stepNumber}>03</p>
          <p className="headingTertiary">경매 시작</p>
          <p className={styles.stepDescription}>
            판매자가 설정한 가격에서 시작해요. 판매 가격에 비례해서 호가가 낮아
            집니다. 입찰자가 나타나는 순간 경매는 종료됩니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionHow;
