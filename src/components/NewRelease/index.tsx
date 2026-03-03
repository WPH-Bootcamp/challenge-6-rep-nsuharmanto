import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { NewReleaseItem as NewReleaseItemType } from "./newRelease.types";
import NewReleaseList from "./NewReleaseList";
import { api } from "../../services/api";
import { movieService } from "../../services/movies/endpoints";
import LoadingSpinner from "../ui/LoadingSpinner";

function isWithin30Days(dateStr: string) {
  const today = new Date();
  const release = new Date(dateStr);
  const diff = (today.getTime() - release.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 30;
}

const fetchNewRelease = async ({ pageParam = 1 }) => {
  const res = await api.get(movieService.getNowPlaying(pageParam));
  const filtered = res.data.results.filter(
    (m: NewReleaseItemType) => m.release_date && isWithin30Days(m.release_date)
  );
  return {
    movies: filtered,
    nextPage: pageParam + 1,
    totalPages: res.data.total_pages,
  };
};

const NewRelease: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["new-release"],
    queryFn: fetchNewRelease,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
  });

  const allMovies =
    data?.pages
      .flatMap((page) => page.movies)
      .filter((movie, idx, arr) => arr.findIndex((m) => m.id === movie.id) === idx)
      ?? [];

  return (
    <div className="relative w-full px-0 bg-black text-white">
      <h2
        className="text-neutral-50 font-bold leading-relaxed text-left px-10 mb-6 md:px-35 md:mb-10"
        style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
      >
        New Release
      </h2>
      <div className="relative">
        {isLoading && (
          <div className="flex items-center justify-center min-h-75">
            <LoadingSpinner />
          </div>
        )}
        {isError && <div className="text-red-500">Failed to fetch New Release data.</div>}
        {!isLoading && !isError && (
          <NewReleaseList
            movies={allMovies}
            showLoadMore={!!hasNextPage}
            onLoadMore={fetchNextPage}
            loading={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default NewRelease;