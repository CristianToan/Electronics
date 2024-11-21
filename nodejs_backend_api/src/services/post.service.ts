import Post from "../models/post.model";
import createError from "http-errors";

const findAll = async (query: any) => {
  /* Phân trang */
  const page_str = query.page;
  const limit_str = query.limit;
  const page = page_str ? parseInt(page_str as string) : 1;
  const limit = limit_str ? parseInt(limit_str as string) : 10;
  /* Lọc theo từng điều kiện */

  let objectFilters: any = {};
  // Lọc theo chủ đề bài viết
  if (query.topic && query.topic != "") {
    objectFilters = { ...objectFilters, topic: query.topic };
  }

  if (query.keyword && query.keyword != "") {
    objectFilters = {
      ...objectFilters,
      post_name: new RegExp(query.keyword, "i"),
    };
  }

  /* Sắp xếp */
  let objSort: any = {};
  const sortBy = query.sort || "createdAt"; // Mặc định sắp xếp theo ngày tạo giảm dần
  const orderBy = query.order && query.order == "ASC" ? 1 : -1;
  objSort = { ...objSort, [sortBy]: orderBy }; // Thêm phần tử sắp xếp động vào object {}

  const offset = (page - 1) * limit;

  //Đếm tổng số record hiện có của collection Product
  const totalRecords = await Post.countDocuments(objectFilters);

  /* Select * FROM product */
  const posts = await Post.find({
    ...objectFilters,
  })
    .select("-__v -id")
    .populate("topic", "topic_name")
    .sort(objSort)
    .skip(offset)
    .limit(limit)
    .lean({ virtuals: true });
  return {
    posts_list: posts,
    sorts: objSort,
    filters: objectFilters,
    // {
    //   post_name: query.keyword || null,
    // },
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalRecords / limit), //tổng số trang
      totalRecords,
    },
  };
};

const findById = async (id: string) => {
  const post = await Post.findById(id, "-__v -id").populate(
    "topic",
    "topic_name"
  );

  if (!post) {
    throw createError(400, "Post not found");
  }
  return post;
};

const updateById = async (id: string, payload: any) => {
  const post = await findById(id);
  Object.assign(post, payload);
  await post.save();
  return post;
};

const deleteById = async (id: string) => {
  const post = await findById(id);
  await Post.deleteOne({ _id: post._id });
  return post;
};

const createDocument = async (body: any) => {
  const payloads = {
    post_name: body.post_name,
    content: body.content,
    thumbnail: body.thumbnail,
    topic: body.topic,
    isShowHome: body.isShowHome,
    comments: body.comments,
    slug: body.slug,
    post_description: body.post_description,
  };
  const post = await Post.create(payloads);
  return post;
};

export default {
  findAll,
  findById,
  updateById,
  deleteById,
  createDocument,
};
