import axios from 'axios';
// Load environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
// Create an Axios instance for TMDb API
const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
    },
  });
export default apiClient;

//Fetch a Random Actor
export const fetchRandomActor = async () => {
    try {
      const response = await apiClient.get('/person/popular');
      const actors = response.data.results;
      return actors[Math.floor(Math.random() * actors.length)];
    } catch (error) {
      console.error("Error fetching random actor:", error);
      return null;
    }
  };
  //Fetch Movies by an Actor
  export const fetchMoviesByActor = async (actorId: number) => {
    try {
      const response = await apiClient.get(`/person/${actorId}/movie_credits`);
      return response.data.cast; // List of movies
    } catch (error) {
      console.error(`Error fetching movies for actor ${actorId}:`, error);
      return [];
    }
  };
  //Fetch Cast of a Movie
  export const fetchCastByMovie = async (movieId: number) => {
    try {
      const response = await apiClient.get(`/movie/${movieId}/credits`);
      return response.data.cast; // List of actors in the movie
    } catch (error) {
      console.error(`Error fetching cast for movie ${movieId}:`, error);
      return [];
    }
  };
  