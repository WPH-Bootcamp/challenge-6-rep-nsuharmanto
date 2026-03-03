import { useState } from "react";
import { searchMovies } from "./helper";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (q: string) => {
    setQuery(q);
    setLoading(true);
    setError(null);
    try {
      const res = await searchMovies(q);
      setResults(res.results || []);
    } catch (err: any) {
      setError(err.message || "Error searching movies");
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, results, loading, error, search };
};

export default useSearch;

