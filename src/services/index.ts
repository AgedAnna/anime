import axios from "axios";
import { AnimeApiResponseData } from "./interface";

export const fetchRandomAnimeGif = async (
  type: string
): Promise<AnimeApiResponseData> => {
  try {
    const response = await axios.get<AnimeApiResponseData>(
      `https://any-anime.p.rapidapi.com/v1/anime/${type}/1`,
      {
        headers: {
          "x-rapidapi-host": "any-anime.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY as string,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar o GIF.");
  }
};
