import { PostCard } from "../../components/PostCard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";

export function HomePage() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  // FIXME
  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState();
  const [sortType, setSortType] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/post?pageNo=${pageNo}&pageSize=${pageSize}&sortType=${sortType}`);
      const { posts, totalCount } = await res.json();

      setPosts(posts);
      // totalCount
    })();
  }, [pageNo, pageSize, sortType]);

  // FIXME
  useEffect(() => {
    setPageNo(router.query.pageNo ?? 1);
    setPageSize(router.query.pageSize ?? 5);
    setSortType(router.query.sortType ?? "asc");
  }, [router.query.pageNo, router.query.pageSize, router.query.sortType]);

  return (
    <div>
      <div
        css={css`
          border: 1px solid #000;
          width: 500px;
          padding: 10px;
          margin: 10px;
        `}
      >
        <div>
          <label>Page No</label>
          <input
            type='number'
            value={pageNo}
            onChange={(e) => {
              router.push("/?pageNo=" + e.target.value + "&pageSize=" + pageSize + "&sortType=" + sortType);
            }}
          />
        </div>
        <div>
          <label>Page Size</label>
          <input
            type='number'
            value={pageSize}
            onChange={(e) => {
              router.push("/?pageNo=" + pageNo + "&pageSize=" + e.target.value + "&sortType=" + sortType);
            }}
          />
        </div>
        <div>
          <label>Sort Type</label>
          <select
            value={sortType}
            onChange={(e) => {
              router.push("/?pageNo=" + pageNo + "&pageSize=" + pageSize + "&sortType=" + e.target.value);
            }}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>
      <div>
        <label>Total Count</label>
        <span>{totalCount}</span>
      </div>

      <div>
        {(posts ?? []).map((post) => (
          <PostCard key={post.no} post={post} />
        ))}
      </div>

      {/* 페이지네이션을 만들어주세요 */}
    </div>
  );
}
