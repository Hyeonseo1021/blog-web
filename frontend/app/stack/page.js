
import Link from 'next/link'
import styles from '../Stack/page.module.css';

const Stack = () => {
  
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
        <h1>사용 기술 스택</h1>
        <div className={styles.content}>
          UI : Figma<p/>
          프론트엔드 : Next.js<p />
          백엔드 : Node.js, Express<p/>
          데이터베이스 : PostgreSQL
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

export default Stack;
