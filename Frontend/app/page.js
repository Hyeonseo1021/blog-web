import Link from 'next/link'
import styles from './page.module.css';

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.blurBackground}></div>
      <div className={styles.topBar}></div>
      <div className={styles.bottomBar}></div>
      <div className={styles.navBar}>
        <div className={styles.navUnderline}></div>
        <div className={styles.navItem}>Project</div>
        <div className={styles.navItem}>Skills</div>
        <div className={styles.navItem}>About me</div>
        <div className={styles.navItem}>Study</div>
      </div>
      <div className={styles.blogTitle}>
        <div>HyeonSeo’s BLOG</div>
      </div>
      <div className={styles.authButtons}>
        <div className={styles.signInButton}>
          <Link href="/signin">
          <div className={styles.link}>Sign in</div>
          </Link>
        </div>
        <div className={styles.loginButton}>
          <Link href="/login">
          <div className={styles.link}>login</div>
          </Link>
        </div>
      </div>
      <div className={styles.mainContent}></div>
      
      <div className={styles.welcomeText}>
        Welcome, I’m Hyeonseo kim.<br />
        I’m a full stack developer!
      </div>
      <img
        className={styles.icon1}
        src="/desktop-outline.svg"
        alt="Code Monitor"
      />
      <img
        className={styles.icon2}
        src="/logo-html5.svg"
        alt="CSS Icon"
      />
      <img
        className={styles.icon3}
        src="/server-outline.svg"
        alt="Widget"
      />
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
  );
};

export default Main;
