// 글 목록 페이지
"use client"; 
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../Posts/page.module.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    // 서버에서 데이터 가져오기
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`) // 환경 변수 사용
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.blurBackground}></div>
            <div className={styles.topBar}></div>
            <div className={styles.bottomBar}></div>
            <div className={styles.blogTitle}>
                <Link href="/">HyeonSeo’s BLOG</Link>
            </div>
            
            <div className={styles.write}>
                <Link href="/create">글쓰기</Link>
            </div>
            <div className={styles.postTitle}>
                전체 글
            </div>
            
            <div className={styles.postsContainer}>
                <hr/>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            {/* 게시물 세부 페이지로 이동하도록 수정 */}
                            <Link href={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <img className={styles.icon4} src="/instagram.svg" alt="instagram" />
            <img className={styles.icon5} src="/gmail.svg" alt="gmail" />
            <img className={styles.icon6} src="/github.svg" alt="github" />
        </div>
    );
};

export default Posts;
