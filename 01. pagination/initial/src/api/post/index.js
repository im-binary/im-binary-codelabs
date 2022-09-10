import { POSTS } from "./constant";

export function PostApi(req, res) {
  const { pageNo = 1, pageSize = 5, sortType = "asc" } = req.query;

  // validation
  if (pageNo == null || Number.isNaN(Number(pageNo)) || Number(pageNo) < 1) {
    return res.status(400).json({ message: "pageNo is invalid" });
  }

  if (pageSize == null || Number.isNaN(Number(pageSize)) || Number(pageSize) < 1) {
    return res.status(400).json({ message: "pageSize is invalid" });
  }

  if (sortType == null || !["asc", "desc"].includes(sortType)) {
    return res.status(400).json({ message: "sortType is invalid" });
  }

  const sortedPosts = POSTS.sort((a, b) => {
    if (sortType === "asc") {
      return a.no - b.no;
    } else {
      return b.no - a.no;
    }
  });

  const posts = sortedPosts.slice((pageNo - 1) * pageSize, pageNo * pageSize);

  return res.status(200).json({ posts, totalCount: sortedPosts.length });
}
