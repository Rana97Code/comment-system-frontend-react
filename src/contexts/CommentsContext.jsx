import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import api from '../api/fetcher';
import { useAuth } from './AuthContext';


const CommentsContext = createContext();


export const CommentsProvider = ({ children }) => {
const { user } = useAuth();
const [comments, setComments] = useState([]);
const [page, setPage] = useState(1);
const [limit] = useState(10); // fixed unused setter warning
const [total, setTotal] = useState(0);
const [sort, setSort] = useState('newest');
const wsRef = useRef(null);


const fetchComments = useCallback(async (opts = {}) => {
const p = opts.page || page;
const s = opts.sort || sort;
const res = await api.get('/comments', { params: { page: p, limit, sort: s } });
setComments(res.data.comments);
setTotal(res.data.total);
setPage(p);
}, [page, limit, sort]);

useEffect(() => { fetchComments({ page: 1 }); }, [fetchComments]);


useEffect(() => {
const wsUrl = process.env.REACT_APP_WS_URL;
if (!wsUrl) return;
const ws = new WebSocket(wsUrl);
wsRef.current = ws;
ws.onmessage = (ev) => {
try {
const payload = JSON.parse(ev.data);
if (payload.type === 'comment_created') {
setComments(prev => [payload.comment, ...prev]);
} else if (payload.type === 'comment_updated') {
setComments(prev => prev.map(c => c._id === payload.comment._id ? payload.comment : c));
} else if (payload.type === 'comment_deleted') {
setComments(prev => prev.filter(c => c._id !== payload.commentId));
}
} catch (e) { console.error(e); }
};
return () => ws.close();
}, []);


const addComment = async (text, parentId = null) => {
if (!user) throw new Error('Not authenticated');
const res = await api.post('/comments', { text, parentId });
setComments(prev => [res.data.comment, ...prev]);
};


const editComment = async (id, text) => {
const res = await api.patch(`/comments/${id}`, { text });
setComments(prev => prev.map(c => c._id === id ? res.data.comment : c));
};


const deleteComment = async (id) => {
await api.delete(`/comments/${id}`);
setComments(prev => prev.filter(c => c._id !== id));
};

const vote = async (id, type) => {
    if (!user) throw new Error('Not authenticated');
    const res = await api.post(`/comments/${id}/vote`, { type });
    setComments(prev => prev.map(c => c._id === id ? res.data.comment : c));
    };
    
    
    const changePage = (p) => fetchComments({ page: p });
    const changeSort = (s) => { setSort(s); fetchComments({ page: 1, sort: s }); };
    
    
    return (
    <CommentsContext.Provider value={{ comments, page, total, sort, fetchComments, addComment, editComment, deleteComment, vote, changePage, changeSort }}>
    {children}
    </CommentsContext.Provider>
    );
    };
    
    
    export const useComments = () => useContext(CommentsContext);