import { PostCard } from "../../components/PostCard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function HomePage() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  const [pageNo, setPageNo] = useState();
  const [pageSize, setPageSize] = useState();
  const [sortType, setSortType] = useState();

  const sortTypeButtons = ["asc", "desc"];

  const pageSizeButtons = [5, 10, 20, 30];

  const handlePageNumberButtonClick = (pageNo) => {
    router.push(`?pageNo=${pageNo}&pageSize=${pageSize}&sortType=${sortType}`);
  };

  const handlePageSizeButtonClick = (pageSize) => {
    router.push(`?pageNo=1&pageSize=${pageSize}&sortType=${sortType}`);
  };

  const handleSortTypeButtonClick = (sortType) => {
    router.push(`?pageNo=1&pageSize=${pageSize}&sortType=${sortType}`);
  };

  useEffect(() => {
    if (pageNo == null || pageSize == null || sortType == null) {
      return;
    }

    (async () => {
      const res = await fetch(`/api/post?pageNo=${pageNo}&pageSize=${pageSize}&sortType=${sortType}`);
      const { posts, totalCount } = await res.json();

      setPosts(posts);
      setTotalCount(totalCount);
    })();
  }, [pageNo, pageSize, sortType]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setPageNo(router.query.pageNo ?? 1);
    setPageSize(router.query.pageSize ?? 5);
    setSortType(router.query.sortType ?? "asc");
  }, [router]);

  return (
    <>
      <div>
        {(posts ?? []).map((post) => (
          <PostCard key={post.no} post={post} />
        ))}
      </div>

      {/* 페이지네이션을 만들어주세요 */}
      <div>
        {Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => (
          <button key={`button-${i}`} onClick={() => handlePageNumberButtonClick(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* sortType 버튼 */}
      <div>
        {sortTypeButtons.map((sortTypeButton) => (
          <button
            key={`${sortTypeButtons} -${sortTypeButton} `}
            onClick={() => handleSortTypeButtonClick(sortTypeButton)}
          >
            {sortTypeButton}
          </button>
        ))}
      </div>

      {/* pageSize 버튼 */}
      <div>
        {pageSizeButtons.map((pageSizeButton) => (
          <button
            key={`${pageSizeButtons}-${pageSizeButton}`}
            onClick={() => handlePageSizeButtonClick(pageSizeButton)}
          >
            {pageSizeButton}
          </button>
        ))}
      </div>
    </>
  );
}
