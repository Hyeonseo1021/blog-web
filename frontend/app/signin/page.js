"use client"; 
import {useState} from 'react';
import Link from 'next/link'
import styles from '../signin/page.module.css';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const user = { username, email, password };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const data = await res.json();
        alert("회원가입이 완료되었습니다.");
        router.push("/login");
      } else {
        const errMessage = await res.text();
        alert(`회원가입 실패: ${errMessage}`);
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류로 회원가입에 실패했습니다.");
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

      <div class={styles.registerContainer}>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div class={styles.inputGroup}>
                    <label htmlFor="username">Name</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='more 4'
                      required
                    />
                </div>
                <div class={styles.inputGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Please input collect e-mail.'
                      required
                    />
                </div>
                <div class={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='more 8 english/number/special number'
                      required
                      autocomplete="new-password"
                    />
                </div>
                <div class={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder='Please input password one more.'
                      required
                      autocomplete="new-password"
                    />
                    
                </div>
                <button class={styles.registerButton} type="submit">Sign in</button>
            </form>
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

export default Signin;
