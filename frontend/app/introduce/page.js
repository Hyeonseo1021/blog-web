
import Link from 'next/link'
import styles from '../Introduce/page.module.css';

const Introduce = () => {
  
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.blurBackground}></div>
      <div className={styles.topBar}></div>
      <div className={styles.bottomBar}></div>
      <div className={styles.blogTitle}>
        <Link href="/">HyeonSeo’s BLOG</Link>
      </div>
      <div className={styles.mainContainer}>
        <h1>About me</h1>
        <div className={styles.content}>
          이름: 김현서<p/>
          희망 직무: 풀스택 개발자<p/>
          취미: 독서, 운동, 게임, 음악 듣기<br />
          목표: 매일 매일 즐겁게 보내기
        </div>
      </div>
      <img
        className={styles.icon4}
        src="/instagram.svg"
        alt="instagram"
      />
      <img
        className={styles.icon5}
        src="/gmail.svg"
        alt="gmail"
      />
      <img
        className={styles.icon6}
        src="/github.svg"
        alt="github"
      />
    </div>
    </div>
  );
};

export default Introduce;