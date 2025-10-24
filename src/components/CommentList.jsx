
import React, { useEffect } from 'react';
import { useComments } from '../contexts/CommentsContext';
import CommentItem from './CommentItem';
import Sorting from './Sorting';

export default function CommentList({ contentId }) {
  const { comments, fetchComments } = useComments();

  useEffect(() => {
    if (contentId) {
      fetchComments({ page: 1, contentId });
    }
  }, [contentId, fetchComments]);

  return (
    <section className="comment-list">
      <hr />
      <Sorting />
      {comments.length === 0 && <div className="empty">No comments yet</div>}
      {comments.map((c) => (
        <CommentItem key={c._id} comment={c} />
      ))}
    </section>
  );
}
