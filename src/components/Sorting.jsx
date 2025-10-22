import React from 'react';
import { useComments } from '../contexts/CommentsContext';


export default function Sorting(){
const { sort, changeSort } = useComments();
return (
<div className="sorting">
<label>Sort:</label>
<select value={sort} onChange={e=>changeSort(e.target.value)}>
<option value="newest">Newest</option>
<option value="most_liked">Most Liked</option>
<option value="most_disliked">Most Disliked</option>
</select>
</div>
);
}