import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./helper";
import TrendingMovies from "../../TrendingNow/TrendingMovies";
import NewRelaese from '../../NewRelease';
import HeroSection from '../../HeroSection'; // Tambahkan import HeroSection

const Homepage: React.FC = () => {
  useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(20),
  });

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <section className="-mt-12 relative z-20">
        <TrendingMovies/>
      </section>
      <section>
        <NewRelaese/>
      </section>
    </>
  );
};

export default Homepage;