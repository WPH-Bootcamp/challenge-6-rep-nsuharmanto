import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useDetail from "./useDetail";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { addFavorite, removeFavorite, getFavorites } from "../favoritepage/helper";
import Button from "../../ui/Button/Button";
import PlayIcon from "../../../assets/icons/play.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import HeartIcon from "../../../assets/icons/heart.svg";
import HeartFilledIcon from "../../../assets/icons/heart-filled.svg";
import StarIcon from "../../../assets/icons/star.svg";
import VideoIcon from "../../../assets/icons/video.svg";
import AgeIcon from "../../../assets/icons/age.svg";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

type CastPerson = {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
};

function formatDate(dateString: string) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const Detailpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useDetail(id || "");
  const [showToast, setShowToast] = useState(false);
  const [showTrailerToast, setShowTrailerToast] = useState(false);

  const favorites = getFavorites();
  const isFavorite = favorites.some((m) => m.id === Number(id));

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(Number(id));
    } else {
      addFavorite({
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    window.location.reload();
  };

  const handleWatchTrailer = () => {
    if (data.trailer) {
      window.open(data.trailer, "_blank");
    } else {
      setShowTrailerToast(true);
      setTimeout(() => {
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(data.title + " trailer")}`,
          "_blank"
        );
      }, 1500);
      setTimeout(() => setShowTrailerToast(false), 2000);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500">
        Error fetching detail
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        No data found
      </div>
    );

  return (
    <div className="relative w-full bg-black text-white">
      {/* Backdrop Movie Section */}
      <div
        className="relative w-full min-h-screen pb-16 flex flex-col items-center"
        style={{
          backgroundImage: data.backdrop_path
            ? `url(${BACKDROP_BASE_URL}${data.backdrop_path})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-white/0 via-transparent to-black"></div>
        {/* FRAME UTAMA */}
        <div className="relative z-10 mx-auto w-full px-4 md:px-35 mt-103">
          {/* Toast Success */}
          {showToast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <span>✔️</span> Success Add to Favorites
            </div>
          )}
          {/* Toast Trailer */}
          {showTrailerToast && (
            <div className="fixed top-25 left-1/2 -translate-x-1/2 z-50 bg-neutral-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <span>ℹ️</span> Official trailer not available, opening YouTube search...
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8 items-top">
            {/* Poster */}
            <img
              src={
                data.poster_path
                  ? `${IMAGE_BASE_URL}${data.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={data.title}
              className="w-48 md:w-64 rounded-xl shadow-lg mx-auto md:mx-0"
            />

            {/* Movie Info */}
            <div className="flex-1">
              <h1 className="font-bold mb-2" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                {data.title}
              </h1>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="flex items-center gap-2 text-neutral-300">
                  <img src={CalendarIcon} alt="Calendar" width={24} height={24} />
                  {formatDate(data.release_date)}
                </span>
              </div>
              {/* Trailer & Favorite */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant="primary"
                  className="cursor-pointer"
                  onClick={handleWatchTrailer}
                  onMouseEnter={() => {
                    if (!data.trailer) {
                      setShowTrailerToast(true);
                      setTimeout(() => setShowTrailerToast(false), 2000);
                    }
                  }}
                  onMouseLeave={() => setShowTrailerToast(false)}
                  icon={<img src={PlayIcon} alt="Play" width={20} height={20} />}
                >
                  Watch Trailer
                </Button>
                <button
                  className="w-13 h-13 rounded-full flex items-center justify-center transition hover:scale-105 focus:outline-none"
                  onClick={handleFavorite}
                  style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)", background: "transparent", padding: 0 }}
                >
                  <img
                    src={isFavorite ? HeartFilledIcon : HeartIcon}
                    alt="Favorite"
                    width={52}
                    height={52}
                    className="rounded-full"
                    style={{ background: "transparent" }}
                  />
                </button>
              </div>
              {/* 3 Info Box */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {/* Rating */}
                <div className="flex-1 bg-black rounded-xl flex flex-col items-center justify-center py-6 px-5 min-w-30 border border-neutral-800">
                  <img src={StarIcon} alt="Star" width={24} height={24} className="mb-1" />
                  <span className="font-normal text-neutral-300 mb-1">Rating</span>
                  <span className="text-neutral-50 text-xl font-semibold">{data.vote_average?.toFixed(1) || "-"}/10</span>
                </div>
                {/* Genre */}
                <div className="flex-1 bg-black rounded-xl flex flex-col items-center justify-center py-6 px-5 min-w-30 border border-neutral-800">
                  <img src={VideoIcon} alt="Video" width={24} height={24} className="mb-1" />                  
                  <span className="font-normal text-neutral-300 mb-1">Genre</span>
                  <span className="text-neutral-50 text-xl font-semibold">{data.genres?.[0]?.name || "Unknown"}</span>
                </div>
                {/* Age Limit */}
                <div className="flex-1 bg-black rounded-xl flex flex-col items-center justify-center py-6 px-5 min-w-30 border border-neutral-800">
                  <img src={AgeIcon} alt="Age" width={24} height={24} className="mb-1" />                  
                  <span className="font-normal text-neutral-300 mb-1">Age Limit</span>                  
                  <span className="text-neutral-50 text-xl font-semibold">{data.adult ? "18+" : "13"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Overview & Cast Section */}
        <div className="relative z-10 mx-auto w-full px-4 md:px-35 mt-12 mb-37.25">
          {/* Overview */}
          <div className="mb-12">
            <h2 className="font-bold text-2xl mb-2">Overview</h2>
            <p className="text-neutral-300">{data.overview}</p>
          </div>
          {/* Cast & Crew Section */}
          <div>
            <h2 className="font-bold text-2xl mb-6">Cast & Crew</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.credits?.cast && data.credits.cast.length > 0 ? (
                data.credits.cast.slice(0, 6).map((person: CastPerson) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-4 bg-neutral-900 rounded-xl p-4 shadow"
                  >
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : "https://via.placeholder.com/64x64?text=No+Image"
                      }
                      alt={person.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white">{person.name}</div>
                      <div className="text-sm text-neutral-400">{person.character}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-400 col-span-full">No cast data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailpage;