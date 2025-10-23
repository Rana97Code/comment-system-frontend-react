import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/content.scss";
import api from "../api/fetcher";

export default function ContentAdd({ onAdded }) {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ title: "", slug: "", body: "", image: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user || user.role !== "admin") {
    return <p className="no-access">Access denied — Admins only.</p>;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));

      await api.post("/contents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      onAdded?.();
      setForm({ title: "", slug: "", body: "", image: null });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-form-container">
      <h2>Create New Content</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="content-form">
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Slug
          <input name="slug" value={form.slug} onChange={handleChange} required />
        </label>

        <label>
          Body
          <textarea name="body" value={form.body} onChange={handleChange} rows={5} />
        </label>

        <label className="upload">
          Image
          <input type="file" name="image" onChange={handleChange} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Add Content"}
        </button>
      </form>
    </div>
  );
}
