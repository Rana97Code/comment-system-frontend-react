import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/fetcher";
import "../styles/contentListPage.scss";

export default function ContentListPage() {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

useEffect(() => {
  api.get(`/contents?page=${page}&limit=5`)
    .then((res) => {
      if (Array.isArray(res.data)) {
        setContents(res.data);
        setTotalPages(1);
      } else {
        setContents(res.data.contents || []);
        setTotalPages(res.data.totalPages || 1);
      }
    })
    .catch((err) => {
      console.error("Error loading contents:", err);
      setContents([]);
    });
}, [page]);


  const handleCardClick = (id) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="content-list-page">
      <h1 className="page-title">Explore Contents</h1>

      <div className="content-grid">
        {contents.map((item) => (
          <div key={item._id} className="content-card" onClick={() => handleCardClick(item._id)}>
            <div className="card-image">
            <img
              src={`http://localhost:4000${item.image}`}
              alt={item.title}
              style={{ width: "auto", height: "300px" }}
            />

            </div>
            <div className="card-body">
              <h3>{item.title}</h3>
              <p>{item.body.slice(0, 100)}...</p>
            </div>
            <div className="card-footer">
              <span>❤️ {item.likes?.length || 0}</span>
              <span>💬 {item.commentsCount || 0}</span>
              <span>👎 {item.dislikes?.length || 0}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
