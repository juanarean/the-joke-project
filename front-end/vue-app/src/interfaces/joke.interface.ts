export interface IJoke {
  id: number
  setup: string
  punchline: string
  type: string
}

export interface IJokeResponse {
  total: number
  jokes: IJoke[]
}
