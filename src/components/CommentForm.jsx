import React, { useState } from 'react';
import { useComments } from '../contexts/CommentsContext';
import { useAuth } from '../contexts/AuthContext';



export default function CommentForm({ contentId, parentId = null, onDone }) {
  const { addComment } = useComments();
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e && e.preventDefault();
    if (!user) { setError('You must be logged in to comment.'); return; }
    if (!text.trim()) { setError('Comment cannot be empty'); return; }

    try {
      await addComment(text.trim(), parentId, contentId);
      setText('');
      setError(null);
      onDone && onDone();
    } catch (err) {
      setError(err.message || 'Failed');
    }
  };

  return (
    <form className="comment-form" onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={parentId ? 'Write a reply...' : 'Write a comment...'}
      />
      <div className="form-actions">
        <button type="submit">Post</button>
      </div>
    </form>
  );
}
