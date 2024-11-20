import { Button, Form, Input, message, Pagination, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SETTINGS } from "../../constants/settings";
import { axiosClient } from "../../lib/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";

interface TTopic {
  _id?: string;
  topic_name: string;
  thumbnail: string;
  topic_description: string;
  slug: string;
}
const TopicList = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [formSearch] = Form.useForm();
  const [params] = useSearchParams();
  const msg = params.get("msg");
  const messageShownRef = useRef(false);
  const page_str = params.get("page");
  const page = page_str ? parseInt(page_str) : 1;
  const keyword_str = params.get("keyword");
  const keyword = keyword_str ? keyword_str : null;

  useEffect(() => {
    if (page === 1 && !params.has("msg") && !params.has("keyword")) {
      navigate("/topic");
    }
  }, [page, navigate, params]);

  const fetchTopic = async () => {
    const limit = 10;
    let url = `${SETTINGS.URL_API}/v1/topics?`;
    if (keyword) {
      url += `keyword=${keyword}&`;
    }
    url += `page=${page}&limit=${limit}`;

    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const getAllTopic = useQuery({
    queryKey: ["topics", page, keyword],
    queryFn: fetchTopic,
  });

  //================== SEARCH ==============//
  const onFinishSearch = (values: { keyword?: string }) => {
    const { keyword } = values;
    const queryString = [keyword ? `keyword=${keyword.trim()}` : ""]
      .filter(Boolean)
      .join("&");
    navigate(`/topic${queryString ? `?${queryString}` : ""}`);
  };

  //================== DELETE ==============//
  const queryClient = useQueryClient();

  const fetchDeleteProduct = async (id: string) => {
    const url = `${SETTINGS.URL_API}/v1/topics/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  };

  const deleteMutationTopic = useMutation({
    mutationFn: fetchDeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["topics", page],
      });
      messageApi.open({
        type: "success",
        content: "Xóa danh mục bài viết thành công",
      });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa danh mục bài viết :", error);
      messageApi.open({
        type: "error",
        content: "Xóa danh mục bài viết  thất bại",
      });
    },
  });
  const handleDeleteTopic = (id: string) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa danh mục bài viết  này không?")
    ) {
      deleteMutationTopic.mutate(id);
    }
  };

  useEffect(() => {
    if (msg && !messageShownRef.current) {
      const messageContent = {
        success: "Thêm mới thành công",
        update_success: "Cập nhật thành công",
      }[msg];

      if (messageContent) {
        messageApi.success(messageContent);
        messageShownRef.current = true;
      }
    }
  }, [msg, messageApi]);

  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setCurrentPage(page);
  }, [page, params]);

  return (
    <>
      {contextHolder}
      {getAllTopic.isLoading ? (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs text-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <div className="col-span-12 md:col-span-7">
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              {/* Search Form  */}
              <Form
                form={formSearch}
                name="form-search"
                onFinish={onFinishSearch}
                autoComplete="off">
                <div className="grid grid-cols-10 md:grid-cols-4 gap-[15px]">
                  <Form.Item name="keyword">
                    <Input placeholder="Nhập tên danh mục bài viết..." />
                  </Form.Item>
                  <Button
                    className="w-[120px] my-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    type="primary"
                    htmlType="submit">
                    Lọc
                  </Button>
                </div>
              </Form>
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Ảnh</th>
                    <th className="px-4 py-3">Danh mục</th>
                    <th className="px-4 py-3">Mô tả</th>
                    <th className="px-4 py-3">Đường dẫn</th>
                    <th className="px-4 py-3">Hành động</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {getAllTopic.data?.topic_list.length > 0 ? (
                    getAllTopic.data?.topic_list.map((topic: TTopic) => {
                      return (
                        <tr
                          key={topic._id}
                          className="text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8  mr-3 rounded-full md:block">
                                <div className="object-cover w-full h-full rounded-md flex items-center">
                                  <img
                                    loading="lazy"
                                    className="w-[40px] h-[40px] object-cover"
                                    src={`${SETTINGS.URL_IMAGE}/${topic.thumbnail}`}
                                    alt={topic.topic_name}
                                  />
                                </div>
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"></div>
                              </div>
                              <div></div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {topic.topic_name}
                          </td>
                          <td className="line-clamp-2 mt-3 text-sm">
                            {topic.topic_description}
                          </td>

                          <td className="px-4 py-3 text-sm ">{topic.slug}</td>

                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <button
                                onClick={() => navigate(`/topic/${topic._id}`)}
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
                                onClick={() => handleDeleteTopic(topic._id!)}
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete">
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
                  {getAllTopic?.data?.pagination.totalRecords >
                    getAllTopic?.data?.pagination.limit && (
                    <Pagination
                      className="inline-flex items-center"
                      current={currentPage}
                      onChange={(page) => {
                        setCurrentPage(page);
                        navigate(`/topic?page=${page}`);
                      }}
                      total={getAllTopic?.data?.pagination.totalRecords || 0}
                      pageSize={getAllTopic?.data?.pagination.limit || 10}
                    />
                  )}
                </nav>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicList;
