import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import "../styles/content.scss";
import api from "../api/fetcher";

export default function ContentPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [content, setContent] = useState(null);

  useEffect(() => {
    api.get(`/contents`).then((res) => setContent(res.data));
  }, [id]);

  if (!content) return <p>Loading...</p>;
  console.log("content",content);
  return (
    <div className="content-page">
      <div className="content-view">
        {content.image && <img src={content.image} alt={content.title} />}
        <h1>{content.title}</h1>
        <p>{content.body}</p>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {user ? (
          <CommentForm contentId={content._id} />
        ) : (
          <p className="login-msg">Please log in to add a comment.</p>
        )}
        <CommentList contentId={content._id} />
      </div>
    </div>
  );
}
