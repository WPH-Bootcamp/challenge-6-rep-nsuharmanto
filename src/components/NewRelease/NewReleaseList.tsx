import React from "react";
import type { NewReleaseItem as NewReleaseItemType } from "./newRelease.types";
import NewReleaseItem from "./NewReleaseItem";

type Props = {
  movies: NewReleaseItemType[];
  showLoadMore: boolean;
  onLoadMore: () => void;
  loading: boolean;
};

const NewReleaseList: React.FC<Props> = ({ movies, showLoadMore, onLoadMore, loading }) => (
  <div
    className="
      grid
      grid-cols-2 gap-x-4 gap-y-8 px-4
      lg:grid-cols-5 lg:gap-x-5 lg:gap-y-10 lg:px-35
    "
  >
    {movies.map((movie) => (
      <div key={movie.id}>
        <NewReleaseItem movie={movie} />
      </div>
    ))}
    {showLoadMore && (
      <div className="flex justify-center absolute bottom-8 left-1/2 transform -translate-x-1/2 mb-34 pointer-events-auto">
        <button
          onClick={onLoadMore}
          className="bg-neutral-900/60 text-neutral-25 text-text-md font-semibold w-57.5 h-13 px-6 py-2 rounded-full hover:bg-neutral-800/60 transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    )}
  </div>
);

export default NewReleaseList;