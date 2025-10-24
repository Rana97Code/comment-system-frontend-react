import React from 'react';
import CommentList from '../components/CommentList';
import Sorting from '../components/Sorting';
import Pagination from '../components/Pagination';
import ContentListPage from './ContentListPage';

export default function HomePage(){
return (
<div className="page home">
<h1>Write your Comment</h1>
<ContentListPage />
<Pagination />
</div>
);
}