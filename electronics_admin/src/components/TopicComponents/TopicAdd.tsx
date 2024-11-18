import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SETTINGS } from "../../constants/settings";
import { axiosClient } from "../../lib/axiosClient";
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
import { useNavigate } from "react-router-dom";
import { buildSlug } from "../../helpers/buildSlug";
import axios from "axios";
import { Helmet } from "react-helmet-async";

interface TTopic {
  _id?: string;
  topic_name: string;
  thumbnail: string;
  topic_description: string;
  slug: string;
}
const TopicAdd = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  /* ============= THEM MOI ================ */
  const fetchCreateTopic = async (payload: TTopic) => {
    const url = `${SETTINGS.URL_API}/v1/topics`;
    const res = await axiosClient.post(url, payload);
    return res.data;
  };

  const createMutationTopic = useMutation({
    mutationFn: fetchCreateTopic,
    onSuccess: () => {
      form.resetFields();
      navigate(`/topic?msg=success`);
    },
    onError: (error) => {
      console.log("Lỗi khi thêm danh mục bài viết:", error);
      messageApi.open({
        type: "error",
        content: `Thêm mới lỗi`,
      });
    },
  });

  const onFinish = async (values: TTopic) => {
    if (values.slug !== undefined) {
      values.slug = buildSlug(values.slug);
    }
    if (fileList.length === 0) {
      message.error("Vui lòng chọn file trước khi tải lên.");
    } else {
      const resulUpload = await handleUpload(fileList[0]);
      if (resulUpload !== null) {
        const info_topic = { ...values, thumbnail: resulUpload };
        createMutationTopic.mutate(info_topic);
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
      {contextHolder}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Electronics - Thêm mới danh mục bài viết</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Thêm mới danh mục bài viết" />
      </Helmet>
      <div className="col-span-12 md:col-span-5">
        <h3 className="mb-3  text-gray-700 dark:text-gray-200">Thêm mới</h3>
        <Form form={form} onFinish={onFinish}>
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
              <span className="text-gray-700 dark:text-gray-400">
                Đường dẫn
              </span>
              <Form.Item name="slug">
                <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
              </Form.Item>
            </label>
          </div>
          <div className="form-group">
            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">Mô tả</span>
              <Form.Item name="topic_description">
                <Input.TextArea
                  rows={5}
                  className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"></Input.TextArea>
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
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
          </div>
          <button
            type="submit"
            className=" mt-3 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            Thêm mới
          </button>
        </Form>
      </div>
    </>
  );
};

export default TopicAdd;
