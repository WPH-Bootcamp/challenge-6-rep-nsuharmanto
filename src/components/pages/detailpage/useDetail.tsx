import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "./helper";

const useDetail = (id: string | number) => {
  return useQuery({
    queryKey: ["movieDetail", id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });
};

export default useDetail;

