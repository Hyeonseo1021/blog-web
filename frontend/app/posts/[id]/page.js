"use client";
import { useParams } from 'next/navigation'; // useParams 사용
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const PostDetail = () => {
  const { id } = useParams();  // useParams로 id 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
  const [editedComment, setEditedComment] = useState(''); // 수정할 댓글 내용
  
  // 포스트 및 댓글 데이터 가져오기
  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((err) => console.error(err));
    }

    // 로그인 상태 확인
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [id]);

  // 댓글 작성 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment) return;

    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // 인증 토큰 추가
        },
        body: JSON.stringify({ post_id: id, content: newComment }),
      });

      if (res.ok) {
        const addedComment = await res.json();
        setComments((prevComments) => [...comments, addedComment]); // 새로운 댓글 추가
        setNewComment(''); // 입력창 비우기
      } else {
        console.error('Failed to add comment');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.content);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${editingCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editedComment }),
      });

      if (res.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingCommentId ? { ...comment, content: editedComment } : comment
          )
        );
        setEditingCommentId(null);
        setEditedComment('');
      } else {
        console.error('Failed to edit comment');
      }
    } catch (err) {
      console.error(err);
      }
    };

  const handleDeleteClick = async (commentId) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment');
      }
    } catch (err) {
      console.error(err);
      }
    };
  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.blurBackground}></div>
        <div className={styles.topBar}></div>
        <div className={styles.bottomBar}></div>
        <div className={styles.blogTitle}>
          <Link href="/">HyeonSeo’s BLOG</Link>
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
        <div className={styles.mainContainer}>
          <div className={styles.content}>
            <h1>{post.title}</h1>
            
            <br/>
            <p>{post.content}</p>
            <br/>
            <hr/>
          </div>

          {/* 댓글 목록 */}
          <div className={styles.commentsSection}>
            <h3>댓글</h3>
            <ul>
              {/* 로그인한 사용자만 댓글 작성 가능 */}
            {isLoggedIn ? (
              <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                <textarea 
                  className={styles.commentArea}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                />
                <button type="submit" className={styles.confirm}>댓글 달기</button>
              </form>
            ) : (
              <p>로그인 후 댓글을 작성할 수 있습니다.</p>
            )}

              {comments.map((comment) => (
                <li key={comment.id}>
                  {editingCommentId === comment.id ? (
                    <form onSubmit={handleEditSubmit}>
                      <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                      />
                      <button type="submit">수정 완료</button>
                      <button type="button" onClick={() => setEditingCommentId(null)}>취소</button>
                    </form>
                  ) : (
                    <>
                      <p>{comment.content}</p>
                      {isLoggedIn && (
                        <>         
                            <button onClick={() => handleEditClick(comment)} className={styles.editButton}>수정</button>
                            <button onClick={() => handleDeleteClick(comment.id)} className={styles.deleteButton}>삭제</button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
