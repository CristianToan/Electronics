export function formatToVND(number: number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// Ví dụ sử dụng
const amount = 123456789;
console.log(formatToVND(amount)); // Kết quả: "123.456.789 ₫"
