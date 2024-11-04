"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../Profile/page.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [profilePic, setProfilePic] = useState('/profile-placeholder.svg'); // 프로필 이미지 상태 추가
  const router = useRouter();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedUserId = localStorage.getItem('userId');
    const storedProfilePic = localStorage.getItem('profilePic'); // 프로필 이미지 가져오기

    if (storedUserId && storedUser && storedEmail) {
      setUserId(storedUserId);
      setUser({ name: storedUser, email: storedEmail });
      setUsername(storedUser);
      setEmail(storedEmail);
      if (storedProfilePic) {
        setProfilePic(storedProfilePic); // 저장된 프로필 이미지 설정
      }
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // 이미지 상태 업데이트
        localStorage.setItem('profilePic', reader.result); // localStorage에 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ 
          name: username, 
          email, 
          currentPassword, 
          newPassword,
          profilePic // 프로필 이미지 URL 추가
        }),
      });

      if (res.ok) {
        alert("정보가 성공적으로 업데이트되었습니다.");
        localStorage.setItem('userName', username);
        localStorage.setItem('profilePic', profilePic); // 프로필 이미지도 저장
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowPasswordFields(false);
      } else {
        const errMessage = await res.text();
        alert(`${errMessage}`);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('profilePic'); // 프로필 이미지 삭제
    setUser(null);
    router.push('/login');
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowPasswordFields(false);
  };

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
          <h1>Profile Update</h1>
          <div className={styles.profilePicContainer}>
            <img src={profilePic} alt="Profile" className={styles.profilePic} />
            <button 
              type="button" 
              className={styles.changePic} 
              onClick={() => document.getElementById('fileInput').click()} // 버튼 클릭 시 파일 입력 필드를 클릭하도록 연결
            >
              Change
            </button>
            <input 
              id="fileInput" // 파일 입력 필드에 id 추가
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className={styles.uploadButton} 
              style={{ display: 'none' }} // 파일 입력 필드를 숨김
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="text" 
                value={email}
                readOnly
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            {!showPasswordFields ? (
              <button 
                type="button" 
                onClick={() => setShowPasswordFields(true)} 
                className={styles.showPasswordButton}>
                Change password
              </button>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required 
                    autoComplete="current-password"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    autoComplete="new-password"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required 
                    autoComplete="new-password"
                  />
                </div>
                <div>
                <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                </div>
              </>
            )}
            <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>Save</button>
            </div>
          </form>
          <div className={styles.buttonGroup}>
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
