import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { SETTINGS } from "../constants/settings";
import { axiosClient } from "../lib/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TPost {
  _id?: string;
  post_name: string;
  content: string;
  thumbnail: string;
  topic: {
    _id?: string;
    topic_name: string;
  };
  isShowHome: {
    type: boolean;
    required: false;
    default: false;
  };
  isDelete: {
    type: boolean;
    require: false;
    default: false;
  };
  comment: Array<{
    _id?: string;
    user: string;
    createAt: Date;
  }>;
  post_description: string;
}

interface TTopic {
  _id?: string;
  topic_name: string;
}

const PostEdit = () => {
  const navigate = useNavigate();
  const [formUpdate] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi] = message.useMessage();
  const { id } = useParams();

  /* ============= Update bài viết================ */
  const fetchUpdatePost = async (id: string) => {
    const url = `${SETTINGS.URL_API}/v1/posts/${id}`;
    const res = await axiosClient.get(url);
    return res.data.data;
  };
  const getPostById = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchUpdatePost(id as string),
    enabled: !!id,
  });
  useEffect(() => {
    if (getPostById.data) {
      formUpdate.setFieldsValue({
        ...getPostById.data,
        topic: getPostById.data.topic._id,
      });
    }
  }, [getPostById.data, formUpdate]);
  const updateMutationPost = useMutation({
    mutationFn: async (payload: TPost & { id: string }) => {
      const url = `${SETTINGS.URL_API}/v1/posts/${payload.id}`;
      const res = await axiosClient.put(url, payload);
      return res.data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật bài viết thành công",
      });
      navigate(`/post?msg=update_success`);
    },
    onError: (error) => {
      console.log("Lỗi khi cập nhật bài viết:", error);
      messageApi.open({
        type: "error",
        content: `Cập nhật lỗi: ${error.message || "Có lỗi xảy ra"}`,
      });
    },
  });
  const onFinish = async (values: TPost) => {
    if (fileList.length === 0) {
      const info_product = { id: id!, ...values };
      updateMutationPost.mutate(info_product);
    } else {
      const resulUpload = await handleUpload(fileList[0]);
      if (resulUpload !== null) {
        const info_post = { id: id!, ...values, thumbnail: resulUpload };
        updateMutationPost.mutate(info_post);
      }
    }
  };
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]); // Chỉ chọn một file, nếu cần nhiều file thì sử dụng `setFileList([...fileList, file])`
      return false; // Tắt upload tự động
    },
    fileList,
  };
  const handleUpload = async (file: UploadFile) => {
    const formData = new FormData();
    formData.append("file", file as unknown as File);
    try {
      const response = await axiosClient.post(
        `${SETTINGS.URL_API}/v1/upload/single-handle`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.statusCode === 200) {
        return response.data.data.link;
      } else {
        return null;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.data.statusCode;
        if (statusCode === 400) {
          messageApi.open({
            type: "error",
            content: "Dung lượng ảnh không lớn hơn 2MB",
          });
        } else {
          messageApi.open({
            type: "error",
            content:
              "Chỉ dược upload hình .png, .gif, .jpg, webp, and .jpeg format allowed!",
          });
        }
        return null;
      } else {
        console.log("Unexpected error:", error);
        return null;
      }
    }
  };

  // Fetch Topic
  const fetchTopics = async () => {
    const url = `${SETTINGS.URL_API}/v1/topics`;
    const res = await axiosClient.get(url);
    return res.data.data;
  };
  const queryTopics = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Electronics - Chỉnh sửa bài viết</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Chỉnh sửa bài viết" />
      </Helmet>

      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Chỉnh sửa
          </h2>
          <div className="grid grid-cols-12 md:grid-cols-12 gap-[15px]">
            <div className="col-span-12">
              <Form form={formUpdate} onFinish={onFinish}>
                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Tên bài viết
                    </span>
                    <Form.Item
                      name="post_name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên bài viết",
                        },
                      ]}>
                      <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                    </Form.Item>
                  </label>
                </div>
                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Chủ đề bài viết
                    </span>
                    <Form.Item
                      className="mg-top"
                      name="topic"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn chủ đề",
                        },
                      ]}>
                      <Select
                        className="w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        placeholder="Chọn chủ đề"
                        options={queryTopics.data?.topics_list.map(
                          (topic: TTopic) => ({
                            value: topic._id,
                            label: topic.topic_name,
                          })
                        )}
                      />
                    </Form.Item>
                  </label>
                </div>
                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Nội dung
                    </span>
                    <Form.Item name="content">
                      <Input.TextArea
                        rows={5}
                        className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                      />
                    </Form.Item>
                  </label>
                </div>

                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Mô tả
                    </span>
                    <Form.Item name="post_description">
                      <Input.TextArea
                        rows={5}
                        className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"></Input.TextArea>
                    </Form.Item>
                  </label>
                </div>

                <div>
                  <Form.Item name="isShowHome" valuePropName="checked">
                    <Checkbox name="isShowHome" className="text-white">
                      Hiển thị trang chủ
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className="mt-2">
                   <img
                    className="w-[100px] h-[100px] object-cover mb-2"
                    src={
                      getPostById.data?.thumbnail &&
                      getPostById.data?.thumbnail !== null
                        ? `${SETTINGS.URL_IMAGE}/${getPostById.data?.thumbnail}`
                        : `/images/noimage.png`
                    }
                    alt={getPostById.data?.product_name}
                  />
                  <Form.Item
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Ảnh sản phẩm
                      </span>
                    }>
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  </Form.Item>
                </div>

                <Form.Item>
                  <button
                    type="submit"
                    className="mt-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                    Cập nhật
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostEdit;
