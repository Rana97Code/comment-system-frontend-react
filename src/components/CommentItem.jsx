

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useComments } from '../contexts/CommentsContext';
import ReplyList from './ReplyList';
import CommentForm from './CommentForm';
import ConfirmModal from './ConfirmModal';
import LoginRequiredModal from './LoginRequiredModal'; 

export default function CommentItem({ comment }) {
  const { user } = useAuth();
  const { editComment, deleteComment, vote } = useComments();

  const [editing, setEditing] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [localText, setLocalText] = useState(comment.text);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ new state

  const isOwner = user && comment.authorId === user._id;

  const handleDelete = () => setShowConfirm(true);

  const confirmDelete = async () => {
  try {
    await deleteComment(comment._id);
    setShowConfirm(false);
  } catch (error) {
    console.error("Delete failed:", error);
    alert("You don't have authority to delete this comment.");
  }
};


  // ✅ Helper function for login check
  const requireLogin = () => {
    if (!user) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  // ✅ Handle like/dislike
  const handleVote = (type) => {
    if (!requireLogin()) return;
    vote(comment._id, type);
  };

  // ✅ Handle reply toggle
  const handleReplyToggle = () => {
    if (!requireLogin()) return;
    setShowReply((prev) => !prev);
  };

  return (
    <article className="comment-card">
      <header className="comment-header">
        <div>
          <strong>{comment.authorName || 'Anonymous'}</strong>
          <span className="timestamp">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      </header>

      {editing ? (
        <textarea
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
        />
      ) : (
        <p className="comment-text">{comment.text}</p>
      )}

      <footer className="comment-actions">
        <button
          onClick={() => handleVote('like')}
          disabled={comment.userVote === 'like'}
        >
          👍 {comment.likes}
        </button>
        <button
          onClick={() => handleVote('dislike')}
          disabled={comment.userVote === 'dislike'}
        >
          👎 {comment.dislikes}
        </button>
        <button onClick={handleReplyToggle}>
          {showReply ? 'Cancel' : 'Reply'}
        </button>

        {isOwner && !editing && (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        {isOwner && editing && (
          <button
            onClick={() => {
              editComment(comment._id, localText);
              setEditing(false);
            }}
          >
            Save
          </button>
        )}
        {isOwner && (
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        )}
      </footer>

      {/* ✅ Reply form */}
      {showReply && (
        <CommentForm  parentId={comment._id}  contentId={comment.contentId} 
         onDone={() => setShowReply(false)}/>
      )}

      {/* ✅ Replies list */}
      {comment.replies && comment.replies.length > 0 && (
        <ReplyList replies={comment.replies} />
      )}

      {/* ✅ Confirm delete modal */}
      {showConfirm && (
        <ConfirmModal
          message="Delete this comment?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* ✅ Show Login Required Modal */}
      {showLoginModal && (
        <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
      )}
    </article>
  );
}
