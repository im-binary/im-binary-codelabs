import React from "react";

export function PostCard({ post }) {
  const { no, title, author, createdAt } = post;

  return (
    <div>
      <span>{no}</span>
      <h2>{title}</h2>
      <span>{author}</span>
      <span>{createdAt}</span>
    </div>
  );
}
