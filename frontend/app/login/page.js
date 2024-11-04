"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/page.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // 쿠키를 포함하여 세션 처리
      });

      
      if (res.ok) {
        const data = await res.json();
        console.log(data); // 응답 데이터 확인
  
        // 응답 데이터에서 토큰과 이름을 가져와 로컬 스토리지에 저장
        if (data.token && data.name && data.id && data.email) {
          localStorage.setItem('authToken', data.token); // 토큰 저장
          localStorage.setItem('userName', data.name);   // 사용자 이름 저장
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('userId', data.id);
          alert("로그인 성공!");
          router.push('/'); // 메인 페이지로 이동
        } else {
          alert("로그인 응답에 필요한 데이터가 없습니다.");
        }
      } else {
        const errMessage = await res.text();
        alert(`로그인 실패: ${errMessage}`);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.blurBackground}></div>
      <div className={styles.topBar}></div>
      <div className={styles.bottomBar}></div>
      <div className={styles.blogTitle}>
        <Link href="/">
            HyeonSeo’s BLOG
        </Link>
      </div>
 
      <div className={styles.loginContainer}>
            <h2>Login</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>ID</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>PASSWORD</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      autocomplete="new-password"
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
            <Link href='/signin'>
              <div className={styles.goSignin}>Go to sign in</div>
            </Link>
            
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

export default Login;
