import { useEffect, useState } from 'react'

import { isAxiosError } from 'axios'

import { apiBalance } from './api/api-balance.ts'
import { MainContainer } from './components/main-container/main-container'
import { TargetIndicator } from './components/target-indicator/target-indicator.tsx'

export const App = () => {
  const [balance, setBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiBalance
      .getBalance()
      .then(response => {
        setBalance(response.balance_usd)
        setIsLoading(false)
      })
      .catch(e => {
        if (isAxiosError(e)) {
          const error = e.response ? e.response.data.error : e.message

          setError(error)
        } else {
          setError(e)
        }
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <MainContainer>Loading...</MainContainer>
  if (error) return <MainContainer>{error}</MainContainer>

  return (
    <MainContainer>
      <TargetIndicator balance={balance} />
    </MainContainer>
  )
}
