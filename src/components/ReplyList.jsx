import React from 'react';
import CommentItem from './CommentItem';


export default function ReplyList({ replies }){
return (
<div className="replies">
{replies.map(r => <CommentItem key={r._id} comment={r} />)}
</div>
);
}