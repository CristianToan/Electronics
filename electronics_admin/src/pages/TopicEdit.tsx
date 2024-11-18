import { Helmet } from "react-helmet-async";
import { SETTINGS } from "../constants/settings";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../lib/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

interface TTopic {
  _id?: string;
  topic_name: string;
  thumbnail: string;
  topic_description: string;
  slug: string;
}

const TopicEdit = () => {
  const navigate = useNavigate();
  const [formUpdate] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi] = message.useMessage();
  const { id } = useParams();

  const fetchUpdateTopic = async (id: string) => {
    const url = `${SETTINGS.URL_API}/v1/topics/${id}`;
    const res = await axiosClient.get(url);
    return res.data.data;
  };

  const getTopicById = useQuery({
    queryKey: ["topic", id],
    queryFn: () => fetchUpdateTopic(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    if (getTopicById.data) {
      formUpdate.setFieldsValue({
        ...getTopicById.data,
      });
    }
  }, [getTopicById.data, formUpdate]);

  const updateMutationTopic = useMutation({
    mutationFn: async (payload: TTopic & { id: string }) => {
      const url = `${SETTINGS.URL_API}/v1/topics/${payload.id}`;
      const res = await axiosClient.put(url, payload);
      return res.data;
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật danh mục bài viết thành công",
      });
      navigate(`/topic?msg=update_success`);
    },
    onError: (error) => {
      console.log("Lỗi khi cập nhật danh mục bài viết:", error);
      messageApi.open({
        type: "error",
        content: `Cập nhật lỗi: ${error.message || "Có lỗi xảy ra"}`,
      });
    },
  });

  const onFinish = async (values: TTopic) => {
    if (fileList.length === 0) {
      const info_product = { id: id!, ...values };
      updateMutationTopic.mutate(info_product);
    } else {
      const resulUpload = await handleUpload(fileList[0]);
      if (resulUpload !== null) {
        const info_topic = { id: id!, ...values, thumbnail: resulUpload };
        updateMutationTopic.mutate(info_topic);
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
      setFileList([file]);
      return false;
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
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Electronics - Sửa danh mục bài viết </title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Sửa danh mục" />
      </Helmet>
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Chỉnh sửa danh mục bài viết
          </h2>
          <div className="grid grid-cols-12 md:grid-cols-12 gap-[15px]">
            <div className="col-span-12">
              <Form
                form={formUpdate}
                name="form-update"
                onFinish={onFinish}
                autoComplete="off">
                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Tên danh mục bài viết
                    </span>
                    <Form.Item
                      name="topic_name"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên danh mục bài viết",
                        },
                      ]}>
                      <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                    </Form.Item>
                  </label>
                </div>
                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400 ">
                      Đường dẫn
                    </span>
                    <Form.Item name="slug">
                      <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                    </Form.Item>
                  </label>
                </div>
                <div className="form-group">
                  <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400 ">
                      Mô tả
                    </span>
                    <Form.Item name="topic_description">
                      <Input.TextArea
                        rows={5}
                        className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                        placeholder="Jane Doe"></Input.TextArea>
                    </Form.Item>
                  </label>
                </div>
                <div className="mt-2">
                  <Form.Item
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Ảnh sản phẩm
                      </span>
                    }>
                    <img
                      className="w-[100px] h-[100px] object-cover mb-4 mt-2"
                      src={
                        getTopicById.data?.thumbnail &&
                        getTopicById.data?.thumbnail !== null
                          ? `${SETTINGS.URL_IMAGE}/${getTopicById.data?.thumbnail}`
                          : `/images/noimage.png`
                      }
                      alt={getTopicById.data?.topic_name}
                    />
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                  </Form.Item>
                </div>
                <Form.Item>
                  <button
                    type="submit"
                    className=" mt-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
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

export default TopicEdit;
