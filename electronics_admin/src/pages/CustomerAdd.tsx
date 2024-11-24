import {
  Button,
  Form,
  Input,
  message,
  Radio,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Helmet } from "react-helmet-async";
import { SETTINGS } from "../constants/settings";
import { axiosClient } from "../lib/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface TCustomer {
  _id: string;
  avatar?: string;
  first_name: string;
  last_name: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  active?: boolean;
}
const CustomerAdd = () => {
  const navigate = useNavigate();

  const [formCreate] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fetchAddCustomer = async (payload: TCustomer) => {
    const url = `${SETTINGS.URL_API}/v1/customers/`;
    const res = await axiosClient.post(url, payload);
    return res.data;
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

  const createMutationCustomers = useMutation({
    mutationFn: fetchAddCustomer,
    onSuccess: () => {
      //Clear data form
      formCreate.resetFields();
      navigate("/customers?msg=success");
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Thêm khách hàng lỗi!",
      });
    },
  });

  // Submit customer create
  const onFinishAdd = async (values: TCustomer) => {
    if (fileList.length === 0) {
      createMutationCustomers.mutate(values);
    } else {
      const resulUpload = await handleUpload(fileList[0]);
      if (resulUpload !== null) {
        const info_customer = { ...values, avatar: resulUpload };
        // Gọi api để thêm khách hàng
        createMutationCustomers.mutate(info_customer);
      }
    }
  };
  const onFinishFailedAdd = async (errorInfo: unknown) => {
    console.log("ErrorInfo", errorInfo);
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Electronics - Thêm khách hàng </title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Thêm khách hàng" />
      </Helmet>
      {contextHolder}
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Thêm mới
          </h2>
          <div className="grid grid-cols-12 md:grid-cols-12 gap-[15px]">
            <div className="col-span-12">
              <Form
                form={formCreate}
                name="form-create"
                initialValues={{
                  remember: true,
                  role: "2",
                  active: true,
                }}
                onFinish={onFinishAdd}
                onFinishFailed={onFinishFailedAdd}
                autoComplete="off"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                  <Form.Item
                    name="first_name"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Tên
                      </span>
                    }
                    rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                  >
                    <Input className="pl-3 block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                  </Form.Item>
                  <Form.Item
                    name="last_name"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Họ
                      </span>
                    }
                    rules={[{ required: true, message: "Vui lòng nhập họ" }]}
                  >
                    <Input className="pl-3 block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                  <Form.Item
                    name="phone"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Số điện thoại
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                      {
                        pattern: /^0\d{9}$/,
                        message: "Số điện thoại chưa đúng",
                      },
                    ]}
                  >
                    <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Email
                      </span>
                    }
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng định dạng email",
                      },
                    ]}
                  >
                    <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                  <Form.Item
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Mật khẩu
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu" },
                    ]}
                    name="password"
                  >
                    <Input
                      type="password"
                      className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    />
                  </Form.Item>
                  <Form.Item
                    name="street"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Tên Đường
                      </span>
                    }
                  >
                    <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                  <Form.Item
                    name="city"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Thành phố
                      </span>
                    }
                  >
                    <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                  </Form.Item>
                  <Form.Item
                    name="zip_code"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Mã zip_code
                      </span>
                    }
                    rules={[
                      {
                        pattern: /^\d{1,5}$/,
                        message: "Mã zip phải gồm khoảng từ 1 đến 5 chữ số!",
                      },
                    ]}
                  >
                    <Input
                      min="0"
                      type="number"
                      maxLength={5}
                      className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <Form.Item
                    name="state"
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Đối tượng
                      </span>
                    }
                  >
                    <Input className="pl-3 block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" />
                  </Form.Item>
                </div>
                <div className="mt-2">
                  <Form.Item name="active">
                    <Radio.Group name="active">
                      <Radio
                        value={true}
                        className="inline-flex items-center text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      >
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                          Kích hoạt
                        </span>
                      </Radio>

                      <Radio
                        value={false}
                        className="ml-6 inline-flex items-center text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      >
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                          Tạm khóa
                        </span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="mt-2">
                  <Form.Item
                    label={
                      <span className="block mt-4 mb-3 text-sm text-gray-700 dark:text-gray-400">
                        Ảnh đại diện
                      </span>
                    }
                  >
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    className="pb-[28px] block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple w-auto"
                    type="primary"
                    htmlType="submit"
                  >
                    Thêm mới
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomerAdd;