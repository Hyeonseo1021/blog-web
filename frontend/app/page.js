"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // 사용자 상태 관리
  const [profilePic, setProfilePic] = useState('/profile-icon.svg');
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // localStorage에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('userName'); // 로그인 시 저장한 userName
    const storedProfilePic = localStorage.getItem('profilePic')
    if (storedUser) {
      setUser({ name: storedUser }); // 사용자 정보 설정
    }

    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);


  return (
    
    <div className={styles.container}>
      <div className={styles.blurBackground}></div>
      <div className={styles.topBar}></div>
      <div className={styles.bottomBar}></div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        <img src="/menu-outline.svg" alt="Menu Icon" />
      </div>
      <div className={`${styles.navBar} ${isMenuOpen ? styles.navBarOpen : ''}`}>
        <Link href={"/posts"}><div className={styles.navItem}>Project</div></Link>
        <Link href={"/stack"}><div className={styles.navItem}>Skill Stack</div></Link>
        <Link href={"/introduce"}><div className={styles.navItem}>About me</div></Link>
      </div>
      <div className={styles.blogTitle}>
        <div>HyeonSeo’s BLOG</div>
      </div>

      {/* 로그인 상태에 따른 버튼 표시 */}
      <div className={!user ? styles.authButtons : ''}>
        {!user ? (
          // 비로그인 상태에서는 Sign in과 Login 버튼만 표시
          <>
            <div className={styles.signInButton}>
              <Link href="/signin">
                <div className={styles.link}>Sign in</div>
              </Link>
            </div>
            <div className={styles.loginButton}>
              <Link href="/login">
                <div className={styles.link}>Login</div>
              </Link>
            </div>
          </>
        ) : (
          // 로그인된 상태에서는 프로필 아이콘과 로그아웃 버튼 표시
          <>
            <div className="profileButton">
              <Link href="/profile">
                <div className={styles.userInfo}>
                  <img src={profilePic} alt="Profile" className={styles.profileIcon} />
                </div>
                <span className={styles.userName}>{user.name}</span> {/* 사용자 이름 표시 */}
              </Link>
            </div>
          </>
        )}
      </div>


      {/* 메인 콘텐츠는 로그인 여부와 관계없이 항상 표시 */}
      <div>
        <div className={styles.welcomeText}>
          Hello! My name is Hyeonseo Kim.
          <br />
          I will be full-stack developer.
        </div>
        <div className={styles.mainContent}>
          <br />Sign up and log in to post comments!
          <br />Inappropriate or offensive comments may be deleted.
        </div>
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
