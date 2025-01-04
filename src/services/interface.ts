export interface AnimeApiResponseData {
  message: string;
  status: string;
  images: string[];
}

export interface AnimeApiResponse {
  data: AnimeApiResponseData;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
  request: any;
}
