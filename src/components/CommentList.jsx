import React from 'react';
import { useComments } from '../contexts/CommentsContext';
import CommentItem from './CommentItem';
// import CommentForm from './CommentForm';
import Sorting from './Sorting';


export default function CommentList(){
const { comments } = useComments();
return (
<section className="comment-list">
{/* <CommentForm /> */}
<hr></hr>
<Sorting />
{comments.length === 0 && <div className="empty">No comments yet</div>}
{comments.map(c => (
<CommentItem key={c._id} comment={c} />
))}
</section>
);
}