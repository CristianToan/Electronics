import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SETTINGS } from "../constants/settings";
import { axiosClient } from "../lib/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Pagination, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

interface TPost {
  _id?: string;
  post_name: string;
  content: string;
  thumbnail: string;
  topic: {
    _id: string;
    topic_name: string;
  };
  isShowHome: {
    type: boolean;
    required: false;
    default: false;
  };
  comment: Array<{
    _id?: string;
    user: string;
    createAt: Date;
  }>;
  slug: string;
  post_description: string;
}

interface TTopic {
  _id?: string;
  topic_name: string;
}

const { Option } = Select;

const ProductPage = () => {
  const navigate = useNavigate();
  const [formSearch] = Form.useForm();
  const [params] = useSearchParams();
  const [messageApi, contextHolder] = message.useMessage();
  const msg = params.get("msg");
  const messageShownRef = useRef(false);

  const page_str = params.get("page");
  const page = page_str ? parseInt(page_str) : 1;

  const topic_str = params.get("topic");
  const topic_id = topic_str ? topic_str : null;

  const keyword_str = params.get("keyword");
  const keyword = keyword_str ? keyword_str : null;

  const fetchPost = async () => {
    const limit = 10;
    let url = `${SETTINGS.URL_API}/v1/posts?`;

    if (topic_id) {
      url += `topic=${topic_id}&`;
    }

    if (keyword) {
      url += `keyword=${keyword}&`;
    }

    url += `page=${page}&limit=${limit}`;

    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const getAllPost = useQuery({
    queryKey: ["posts", page, topic_id, keyword],
    queryFn: fetchPost,
  });

  // Search
  const onFinishSearch = (values: { keyword?: string; topic?: string }) => {
    // console.log(values);
    const { keyword, topic } = values;

    const queryString = [
      keyword ? `keyword=${keyword.trim()}` : "",
      topic ? `topic=${topic}` : "",
    ]
      .filter(Boolean)
      .join("&");

    navigate(`/post${queryString ? `?${queryString}` : ""}`);
  };

  //================== DELETE ==============//
  const queryClient = useQueryClient();

  const fetchDeletePost = async (id: string) => {
    const url = `${SETTINGS.URL_API}/v1/posts/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  };

  const deleteMutationTopic = useMutation({
    mutationFn: fetchDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", page],
      });
      messageApi.open({
        type: "success",
        content: "Xóa bài viết thành công",
      });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa bài viết:", error);
      messageApi.open({
        type: "error",
        content: "Xóa bài viết thất bại",
      });
    },
  });

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      deleteMutationTopic.mutate(id);
    }
  };

  // fetch topics
  const [topics, setTopics] = useState<TTopic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axiosClient.get(`${SETTINGS.URL_API}/v1/topics`);
        setTopics(res.data.data.topics_list || []);
      } catch (error) {
        console.error("Lỗi khi lấy chủ đề:", error);
        setTopics([]);
      }
    };
    fetchTopics();
  }, []);
  useEffect(() => {
    if (msg && !messageShownRef.current) {
      const messageContent = {
        success: "Thêm mới thành công",
        update_success: "Cập nhật thành công",
      }[msg];

      if (messageContent) {
        // Hiển thị thông báo thành công
        messageApi.success(messageContent);
        messageShownRef.current = true;
      }
    }
  }, [msg, messageApi]);
  // Khởi tạo state cho trang hiện tại
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    // Cập nhật currentPage khi giá trị của 'page' thay đổi trong URL
    setCurrentPage(page);
  }, [page, params]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Electronics - Bài viết </title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Bài viết" />
      </Helmet>
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Bài viết
          </h2>
          <Link
            to="/post/add"
            className="w-[120px] my-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            Thêm mới <span className="ml-2">+</span>
          </Link>
          <Form
            form={formSearch}
            name="form-search"
            onFinish={onFinishSearch}
            autoComplete="off"
            layout="vertical"
            className="frm-search">
            <div className="grid gid-cols-12 md:grid-cols-4 gap-[15px]">
              <Form.Item name="keyword">
                <Input placeholder="Nhập tên bài viết" />
              </Form.Item>
              <Form.Item className="fr-search" name="topic">
                <Select
                  className="w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  placeholder="Chọn chủ đề"
                  allowClear>
                  {topics.length > 0 ? (
                    topics.map((topic: TTopic) => (
                      <Option key={topic._id} value={topic._id}>
                        {topic.topic_name}
                      </Option>
                    ))
                  ) : (
                    <Option value="">Chủ đề không có...</Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  className="w-[120px] my-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  type="primary"
                  htmlType="submit">
                  Lọc
                </Button>
              </Form.Item>
            </div>
          </Form>
          {contextHolder}
          {getAllPost.isLoading ? (
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs text-center">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </div>
          ) : (
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th className="px-4 py-3">Hình ảnh</th>
                      <th className="px-4 py-3">Tên bài viết</th>
                      <th className="px-4 py-3">Nội dung</th>
                      <th className="px-4 py-3">Danh mục</th>
                      <th className="px-4 py-3">Mô tả</th>
                      <th className="px-4 py-3">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {getAllPost?.data?.posts_list.length > 0 ? (
                      getAllPost?.data?.posts_list.map((post: TPost) => {
                        return (
                          <tr
                            key={post._id}
                            className="text-gray-700 dark:text-gray-400">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                  <img
                                    loading="lazy"
                                    className="w-[40px] h-[40px] object-cover"
                                    src={`${SETTINGS.URL_IMAGE}/${post.thumbnail}`}
                                    alt={post.post_name}
                                  />
                                  <div
                                    className="absolute inset-0 rounded-full shadow-inner"
                                    aria-hidden="true"></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {post.post_name}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {post.content}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {
                                (
                                  post.topic as {
                                    topic_name?: string;
                                  }
                                )?.topic_name
                              }
                            </td>

                            <td className="px-4 py-3 text-sm">
                              {post.post_description || "No desc"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  onClick={() => navigate(`/post/${post._id}`)}
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Edit">
                                  <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(post._id!)}
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Edit">
                                  <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"></path>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-gray-700 dark:text-gray-400">
                        <td colSpan={7} className="text-center py-3">
                          {keyword != null
                            ? "Không tìm thấy"
                            : "Dữ liệu đang được cập nhật"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span className="flex col-span-9 mt-2 sm:mt-auto sm:justify-end">
                  <nav aria-label="Table navigation">
                    {getAllPost?.data?.pagination.totalRecords >
                      getAllPost?.data?.pagination.limit && (
                      <Pagination
                        className="inline-flex items-center"
                        current={currentPage}
                        onChange={(page) => {
                          navigate(`/post?page=${page}`);
                        }}
                        total={getAllPost?.data?.pagination.totalRecords || 0}
                        pageSize={getAllPost?.data?.pagination.limit || 10}
                      />
                    )}
                  </nav>
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductPage;
