// Custom hook to fetch stats from the API
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL || ""}/api/v1/books/stats`);
        setStats(response.data.data);
      } catch (err) {
        console.error('Error al obtener estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

export default useFetchStats;
