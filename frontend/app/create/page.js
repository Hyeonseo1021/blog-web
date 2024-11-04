"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // `next/navigation` 대신 `next/router`를 사용
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from '../Create/page.module.css';

// ReactQuill을 동적으로 임포트
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image',
  'color', 'background', 'align',
];

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null); // 에러 상태 추가
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };

    try {
      // 환경 변수로 API URL 가져오기
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('글 작성에 실패했습니다.');
      }

      router.push('/posts'); // 글 목록 페이지로 이동
    } catch (err) {
      console.error(err);
      setError('글 작성 중 오류가 발생했습니다.'); // 에러 상태 업데이트
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.blurBackground}></div>
      <div className={styles.topBar}></div>
      <div className={styles.bottomBar}></div>
      <div className={styles.blogTitle}>
        <Link href="/">HyeonSeo's BLOG</Link>
      </div>

      <div className={styles.createContainer}>
        {error && <div className={styles.error}>{error}</div>} {/* 에러 메시지 표시 */}
        <form onSubmit={handleSubmit}>
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
          />
          
          <div className={styles.editorContainer}>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="여기에 내용을 입력하세요"
            />
          </div>
          
          <button className={styles.saveButton} type="submit">저장</button>
        </form>
      </div>

      <img className={styles.icon4} src="/instagram.svg" alt="instagram" />
      <img className={styles.icon5} src="/gmail.svg" alt="gmail" />
      <img className={styles.icon6} src="/github.svg" alt="github" />
    </div>
  );
};

export default Create;
