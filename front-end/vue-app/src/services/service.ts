import type { IJokeResponse } from "../interfaces/joke.interface"
import axios, { type AxiosResponse } from 'axios'

export async function getJokes(page: number, pageSize: number, query: string, sorting: string): Promise<AxiosResponse<IJokeResponse>> {
  return axios.post<IJokeResponse>('http://localhost:3005/jokes/query', { page, pageSize, query, sorting }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}
