import React from "react";
import { useComments } from "../contexts/CommentsContext";

export default function Sorting() {
  const { sort, changeSort, limit, changeLimit } = useComments();

  return (
    <div className="sorting flex items-center gap-4 my-4">
      {/* Sort selection */}
      <label>Sort by:</label>
      <select value={sort} onChange={(e) => changeSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="most_liked">Most Liked</option>
        <option value="most_disliked">Most Disliked</option>
      </select>

      {/* Limit selection */}

        <label style={{ marginLeft: "1rem" }}>Show:</label>
      <select value={limit} onChange={(e) => changeLimit(e.target.value)}>
        <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}