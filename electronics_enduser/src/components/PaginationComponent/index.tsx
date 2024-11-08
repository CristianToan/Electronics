"use client";
import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
interface PaginationComponentProps {
  totalPages: number;
}
export default function PaginationComponent({ totalPages }: PaginationComponentProps) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const router = useRouter();
  useEffect(() => {
    page == 1
      ? router.push(`/products`)
      : router.push(`/products?page=${page}`);
  }, [page]);

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
    </Stack>
  );
}
