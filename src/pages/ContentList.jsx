import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/fetcher";
import "../styles/contentList.scss";

export default function ContentList() {
  const { user, token } = useAuth();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContents = async () => {
    try {
      const res = await api.get("/contents");
      setContents(res.data);
    } catch (err) {
      console.error("Error fetching contents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") return;
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    await api.delete(`/contents/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContents();
  };

  useEffect(() => {
    fetchContents();
  }, []);

  if (loading) return <p className="loading">Loading contents...</p>;

  return (
    <div className="content-list-page">
      <h1>All Contents</h1>

      <div className="content-grid">
        {contents.length === 0 && <p className="no-content">No contents available.</p>}

        {contents.map((item) => (
          <div key={item._id} className="content-card">
            {item.image && <img
                src={`http://localhost:4000${item.image}`}
                alt={item.title}
                style={{ width: "auto", height: "300px" }}
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.style.display = "none";
                }}
              />
              }
            <div className="info">
              <h3>{item.title}</h3>
              <p>{item.body?.slice(0, 120)}...</p>
              <div className="meta">
                <span>🕓 {new Date(item.createdAt).toLocaleDateString()}</span>
                {user?.role === "admin" && (
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
