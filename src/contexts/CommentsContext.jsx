
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import api from "../api/fetcher";
import { useAuth } from "./AuthContext";

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
//   const [limit] = useState(5);
  const [limit, setLimit] = useState(5);

  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("newest");
  const wsRef = useRef(null);

// const fetchComments = useCallback(
//   async (opts = {}) => {
//     const p = opts.page || page;
//     const s = opts.sort || sort;
//     const cid = opts.contentId || (opts.contentId ?? window.currentContentId); 

//     if (!cid) {
//       console.error("fetchComments: contentId is missing");
//       return;
//     }

//     const res = await api.get("/comments", {
//       params: { page: p, limit, sort: s, contentId: cid },
//     });

//     setComments(res.data.comments);
//     setTotal(res.data.total);
//     setPage(p);
//   },
//   [page, limit, sort]
// );

const fetchComments = useCallback(
  async (opts = {}) => {
    const p = opts.page ?? page;
    const s = opts.sort ?? sort;
    const l = opts.limit ?? limit;
    const cid = opts.contentId ?? window.currentContentId;

    if (!cid) {
      console.error("fetchComments: contentId is missing");
      return;
    }

    try {
      const res = await api.get("/comments", {
        params: { page: p, limit: l, sort: s, contentId: cid },
      });

      setComments(res.data.comments);
      setTotal(res.data.total);
      setPage(p);
      setSort(s);
      setLimit(l);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  },
  [page, limit, sort]
);


  useEffect(() => {
    fetchComments({ page: 1 });
  }, [fetchComments]);

  useEffect(() => {
    const wsUrl = process.env.REACT_APP_WS_URL;
    if (!wsUrl) return;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      try {
        const payload = JSON.parse(ev.data);
        if (payload.type === "comment_created") {
          setComments((prev) => [payload.comment, ...prev]);
        } else if (payload.type === "comment_updated") {
          setComments((prev) =>
            prev.map((c) => (c._id === payload.comment._id ? payload.comment : c))
          );
        } else if (payload.type === "comment_deleted") {
          setComments((prev) => prev.filter((c) => c._id !== payload.commentId));
        }
      } catch (e) {
        console.error(e);
      }
    };
    return () => ws.close();
  }, []);

  // ✅ FIXED addComment to include contentId + authorName
  const addComment = async (text, parentId = null, contentId) => {
    if (!user) throw new Error("Not authenticated");

    const res = await api.post(`/comments/${contentId}`, {
    text,
    parentId,
    authorName: user.name || user.username || "Anonymous",
    });


    setComments((prev) => [res.data.comment, ...prev]);
  };

  // ✅ Edit comment — only owner can
  const editComment = async (id, text) => {
    const res = await api.patch(`/comments/${id}`, { text });
    setComments((prev) => prev.map((c) => (c._id === id ? res.data.comment : c)));
  };

  // ✅ Delete comment — only owner can
  const deleteComment = async (id) => {
    await api.delete(`/comments/${id}`);
    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  // ✅ Like/dislike — one per user enforced server-side
  const vote = async (id, type) => {
    if (!user) throw new Error("Not authenticated");
    const res = await api.post(`/comments/${id}/vote`, { type });
    setComments((prev) => prev.map((c) => (c._id === id ? res.data.comment : c)));
  };

const changePage = async (newPage) => {
  if (newPage < 1) return;
  await fetchComments({ page: newPage, sort, limit });
};

const changeLimit = async (newLimit) => {
  const numericLimit = Number(newLimit);
  setLimit(numericLimit);
  setPage(1);
  await fetchComments({ page: 1, limit: numericLimit, sort });
};

const changeSort = async (newSort) => {
  setSort(newSort);
  setPage(1);
  await fetchComments({ page: 1, limit, sort: newSort });
};


  return (
    <CommentsContext.Provider
      value={{
        comments,
        page,
        total,
        sort,
        limit,
        fetchComments,
        addComment,
        editComment,
        deleteComment,
        vote,
        changePage,
        changeSort,
        changeLimit,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);
