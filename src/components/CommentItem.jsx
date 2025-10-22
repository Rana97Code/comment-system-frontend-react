import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useComments } from '../contexts/CommentsContext';
import ReplyList from './ReplyList';
import CommentForm from './CommentForm';
import ConfirmModal from './ConfirmModal';


export default function CommentItem({ comment }) {
const { user } = useAuth();
const { editComment, deleteComment, vote } = useComments();
const [editing, setEditing] = useState(false);
const [showReply, setShowReply] = useState(false);
const [localText, setLocalText] = useState(comment.text);
const [showConfirm, setShowConfirm] = useState(false);


const isOwner = user && comment.authorId === user._id;


const handleDelete = () => setShowConfirm(true);
const confirmDelete = async () => { await deleteComment(comment._id); setShowConfirm(false); };


return (
<article className="comment-card">
<header className="comment-header">
<div>
<strong>{comment.authorName || 'Anonymous'}</strong>
<span className="timestamp">{new Date(comment.createdAt).toLocaleString()}</span>
</div>
</header>


{editing ? (
<textarea value={localText} onChange={(e) => setLocalText(e.target.value)} />
) : (
<p className="comment-text">{comment.text}</p>
)}


<footer className="comment-actions">
<button onClick={() => vote(comment._id, 'like')} disabled={comment.userVote === 'like'}>👍 {comment.likes}</button>
<button onClick={() => vote(comment._id, 'dislike')} disabled={comment.userVote === 'dislike'}>👎 {comment.dislikes}</button>
<button onClick={() => setShowReply((p) => !p)}>{showReply ? 'Cancel' : 'Reply'}</button>
{isOwner && !editing && <button onClick={() => setEditing(true)}>Edit</button>}
{isOwner && editing && <button onClick={() => { editComment(comment._id, localText); setEditing(false); }}>Save</button>}
{isOwner && <button className="danger" onClick={handleDelete}>Delete</button>}
</footer>


{showReply && <CommentForm parentId={comment._id} onDone={() => setShowReply(false)} />}
{comment.replies && comment.replies.length > 0 && <ReplyList replies={comment.replies} />}
{showConfirm && <ConfirmModal message="Delete this comment?" onConfirm={confirmDelete} onCancel={() => setShowConfirm(false)} />}
</article>
);
}