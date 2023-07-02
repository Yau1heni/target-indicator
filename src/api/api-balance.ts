import { instance } from './config.ts'

export const apiBalance = {
  getBalance: () => {
    return instance
      .get<{
        balance_usd: number
      }>('/')
      .then(res => res.data)
  },
}
