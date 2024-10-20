import slugify from "slugify";

function removeVietnameseAccents(str: string): string {
  const vietnameseChars: { [key: string]: string } = {
    a: "àáảãạâầấẩẫậăằắẳẵặ",
    e: "èéẻẽẹêềếểễệ",
    i: "ìíỉĩị",
    o: "òóỏõọôồốổỗộơờớởỡợ",
    u: "ùúủũụưừứửữự",
    y: "ỳýỷỹỵ",
    d: "đ",
    A: "ÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶ",
    E: "ÈÉẺẼẸÊỀẾỂỄỆ",
    I: "ÌÍỈĨỊ",
    O: "ÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ",
    U: "ÙÚỦŨỤƯỪỨỬỮỰ",
    Y: "ỲÝỶỸỴ",
    D: "Đ",
  };

  // Duyệt qua từng cặp ký tự có dấu và thay thế
  Object.keys(vietnameseChars).forEach((nonAccentedChar) => {
    const accentedChars = vietnameseChars[nonAccentedChar];
    const regex = new RegExp("[" + accentedChars + "]", "g");
    str = str.replace(regex, nonAccentedChar);
  });

  return str;
}

export const buildSlug = (str: string): string => {
  const normalizedStr = removeVietnameseAccents(str).toLowerCase(); // Chuyển thành chữ thường trước khi chuyển sang slug
  return slugify(normalizedStr, {
    replacement: "-",
    remove: undefined,
    lower: true, // Giữ tùy chọn này để đảm bảo chuyển thành chữ thường nếu cần thiết
    strict: true,
    locale: "en",
    trim: true,
  });
};
