import { SETTINGS } from "../../constants/settings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { axiosClient } from "../../lib/axiosClient";
import { Helmet } from "react-helmet-async";
import { Form, Button, message, Input, Pagination, Spin } from "antd";
import { FaEarthAmericas } from "react-icons/fa6";
import { LoadingOutlined } from "@ant-design/icons";

interface TBrand {
  _id: number;
  brand_name: string;
  description: string;
  slug: string;
  logo_url: string;
  order: number;
  isActive: boolean;
}

interface TFilter {
  keyword: string;
  name: string;
  slug: string;
}

const BrandList = () => {
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [params] = useSearchParams();
  const [formSearch] = Form.useForm();
  const page_str = params.get("page");
  const page = page_str ? parseInt(page_str) : 1;
  const limit = 10;
  const keyword = params.get("keyword");
  const name = keyword ? keyword : null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onFinishSearch = async (values: TFilter) => {
    const { keyword } = values;

    const queryString = [keyword ? `keyword=${keyword.trim()}` : ""]
      .filter(Boolean)
      .join("&");

    navigate(`/brand${queryString ? `?${queryString}` : ""}`);
  };
  const onFinishFailedSearch = async (errorInfo: unknown) => {
    console.log("ErrorInfo", errorInfo);
  };
  const fetchBrands = useCallback(async () => {
    let url = `${SETTINGS.URL_API}/v1/brands?`;
    if (name) {
      url += `keyword=${name}&`;
    }

    url += `page=${page}&limit=${limit}`;
    const response = await axiosClient.get(url);
    return response.data.data;
  }, [name, page, limit]);

  useEffect(() => {
    // If state is passed, reload the list
    if (location.state?.reload) {
      // Trigger your fetchBrands function here to reload data
      fetchBrands();
    }
  }, [location.state, fetchBrands]);

  const getAllBrand = useQuery({
    queryKey: ["brands", page, name],
    queryFn: fetchBrands,
  });

  useEffect(() => {
    if (
      page === 1 &&
      !params.has("msg") &&
      !params.has("keyword") &&
      !params.has("name")
    ) {
      navigate("/brand");
    }
  }, [page, navigate, params]);

  const fetchDeleteBrand = async (id: string) => {
    const url = `${SETTINGS.URL_API}/v1/brands/${id}`;
    const res = await axiosClient.delete(url);
    return res.data.data;
  };
  const deleteBrand = useMutation({
    mutationFn: fetchDeleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      messageApi.open({
        type: "success",
        content: "Xóa thương hiệu thành công!",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Có lỗi trong quá trình xóa!",
      });
    },
  });

  const handleDelete = (itemId: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirmed) {
      deleteBrand.mutate(itemId);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Electronics - Thương hiệu </title>
        <link rel='canonical' href={window.location.href} />
        <meta name='description' content='Thương hiệu' />
      </Helmet>
      {contextHolder}
      <div className='col-span-12 md:col-span-7'>
        <div className='w-full mb-8 overflow-hidden rounded-lg shadow-xs'>
          <div className='w-full overflow-x-auto'>
            <Form
              form={formSearch}
              name='form-search'
              onFinish={onFinishSearch}
              onFinishFailed={onFinishFailedSearch}
              autoComplete='on'
              layout='vertical'
            >
              <div className='grid gid-cols-12 md:grid-cols-4 gap-[15px]'>
                <Form.Item name='keyword'>
                  <Input placeholder='Nhập tên thương hiệu' />
                </Form.Item>
                <Form.Item>
                  <Button
                    className='w-[120px] px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'
                    type='primary'
                    htmlType='submit'
                  >
                    Lọc
                  </Button>
                </Form.Item>
              </div>
            </Form>

            <Spin
              spinning={getAllBrand.isLoading}
              indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
            >
              <table className='w-full whitespace-no-wrap'>
                <thead>
                  <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                    <th className='px-4 py-3'>Ảnh</th>
                    <th className='px-4 py-3'>Tên thương hiệu</th>
                    <th className='px-4 py-3 md:w-[100px]'>Mô tả</th>
                    <th className='pl-4 py-3 md:w-[100px]'>Đường dẫn</th>
                    <th className='px-4 py-3 md:w-[120px]'>Trạng thái</th>
                    <th className='px-4 py-3 md:w-[100px]'>Thứ tự</th>
                    <th className='px-4 py-3 md:w-[150px]'>Hành động</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                  {getAllBrand?.data &&
                  getAllBrand?.data?.brands_list.length > 0 ? (
                    getAllBrand?.data?.brands_list.map(
                      (item: TBrand, i: number) => (
                        <tr
                          className='text-gray-700 dark:text-gray-400'
                          key={i}
                        >
                          <td className='px-4 py-3'>
                            {item.logo_url && item.logo_url !== null ? (
                              <img
                                className='w-[40px] h-[40px] object-cover'
                                src={`${SETTINGS.URL_IMAGE}/${item.logo_url}`}
                                alt={item.logo_url}
                              />
                            ) : (
                              <img
                                className='w-[40px] h-[40px] object-cover'
                                src='/images/noimage.jpg'
                                alt={item.logo_url}
                              />
                            )}
                          </td>
                          <td className='px-4 py-3 text-sm md:w-[150px]'>
                            {item.brand_name}
                          </td>
                          <td className='pl-4 py-3 text-xs'>
                            <span className='py-1  md:w-[150px] font-semibold leading-tight truncate ...'>
                              {item.description}
                            </span>
                          </td>
                          <td className='md:w-[100px] px-4 py-3 text-sm truncate'>
                            {item.slug}
                          </td>

                          <td className='px-4 py-3 text-sm md:w-[100px] flex justify-start mt-4 '>
                            {item.isActive ? (
                              <FaEarthAmericas
                                className='text-green-500 cursor-pointer m-auto'
                                title='công khai'
                              />
                            ) : (
                              <FaEarthAmericas
                                className='text-red-500 cursor-pointer m-auto'
                                title='không công khai'
                              />
                            )}
                          </td>
                          <td className='px-4 py-3 text-xs truncate text-center md:w-[100px]'>
                            {item.order}
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center space-x-4 text-sm'>
                              <button
                                onClick={() => {
                                  navigate(`/brand/${item._id}`);
                                }}
                                className='flex items-center justify-between px-1 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                                aria-label='Edit'
                              >
                                <svg
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                                </svg>
                              </button>
                              <button
                                className='flex items-center justify-between px-1 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                                onClick={() => handleDelete(String(item._id))}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='w-5 h-5'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m5 0H4'
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr className='text-gray-700 dark:text-gray-400'>
                      <td colSpan={7} className='text-center py-3'>
                        {keyword != null || name != null
                          ? "Không tìm thấy"
                          : "Dữ liệu đang được cập nhật"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Spin>
          </div>

          <div className='grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800'>
            <span className='flex col-span-12 mt-2 m-auto'>
              <nav aria-label='Table navigation'>
                {getAllBrand?.data?.pagination.totalRecords >
                  getAllBrand?.data?.pagination.limit && (
                  <Pagination
                    current={page}
                    className='inline-flex items-center'
                    onChange={(newPage) => {
                      navigate(`/brand?page=${newPage}`);
                    }}
                    total={getAllBrand?.data?.pagination.totalRecords || 0}
                    pageSize={getAllBrand?.data?.pagination.limit || 10}
                  />
                )}
              </nav>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandList;
