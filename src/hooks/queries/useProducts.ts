import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { fetchProducts } from "../../api/products";

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  });
};
