import { SETTINGS } from "@/constants/setting";
import { TCategory } from "@/types/modes";
import { create } from "zustand";

interface TCategories {
    categories : TCategory[],
    isLoading: boolean,
    error: string | null;
    fetchCategories:() => void
}

const useCategories = create<TCategories>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    fetchCategories : async () => {
        try {
            set({ isLoading: true, error: null})
            const res = await fetch(`${SETTINGS.URL_API}/v1/categories?page=1&limit=20&sort=order&order=ASC`)
            if (!res.ok) {
                set({ isLoading: false, error: "Lỗi khi lấy danh mục" });
            }else{
                const getCategories = await res.json();
                const categories_public = getCategories.data.categories_list.filter((c: TCategory) => c.isActive);
                set({ categories: categories_public, isLoading: false })
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            set({ isLoading: false, error: "Lỗi khi lấy danh mục" });
        }
    }
}))

export default useCategories