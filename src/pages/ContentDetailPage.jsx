import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import api from "../api/fetcher";
import "../styles/contentListPage.scss";

export default function ContentDetailPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Wrap loadContent in useCallback
  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/contents/${id}`);
      setContent(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Safe useEffect with loadContent
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleLike = async () => {
    try {
      const res = await api.put(
        `/contents/${content._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent((prev) => ({
        ...prev,
        likes: Array(res.data.likesCount).fill(""),
        dislikes: Array(res.data.dislikesCount).fill(""),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await api.put(
        `/contents/${content._id}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent((prev) => ({
        ...prev,
        likes: Array(res.data.likesCount).fill(""),
        dislikes: Array(res.data.dislikesCount).fill(""),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!content) return <p>Loading...</p>;

  const liked = user && content.likes?.includes(user.id);
  const disliked = user && content.dislikes?.includes(user.id);

  return (
    <div className="content-detail-page">
      <div className="content-header">
        <h1>{content.title}</h1>

        <div className="content-meta">
          <button
            className={`like-btn ${liked ? "active" : ""}`}
            onClick={handleLike}
            disabled={loading}
          >
            ❤️ {content.likes?.length || 0}
          </button>

          <button
            className={`dislike-btn ${disliked ? "active" : ""}`}
            onClick={handleDislike}
            disabled={loading}
          >
            👎 {content.dislikes?.length || 0}
          </button>

          <span>💬 {content.comments?.length || 0}</span>
        </div>
      </div>

      {content.image && (
        <img
          className="content-image"
          src={`http://localhost:4000${content.image}`}
          alt={content.title}
          style={{ height: "300px" }}
        />
      )}

      <p className="content-body">{content.body}</p>

      <div className="comments-section">
        <h2>Comments</h2>
        {user ? (
          <CommentForm contentId={content._id} />
        ) : (
          <p className="login-msg">Please log in to comment.</p>
        )}
        <CommentList contentId={content._id} pagination sortable />
      </div>
    </div>
  );
}
