import React from 'react';
import { useComments } from '../contexts/CommentsContext';


export default function Pagination(){
const { page, total, limit, changePage } = useComments();
const pages = Math.ceil(total / limit) || 1;
return (
<div className="pagination">
<button disabled={page===1} onClick={()=>changePage(page-1)}>Prev</button>
<span>{page} / {pages}</span>
<button disabled={page===pages} onClick={()=>changePage(page+1)}>Next</button>
</div>
);
}