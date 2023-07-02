import { FC, useEffect, useState } from 'react'

import InfoSvg from '../../assets/svg/info-svg.tsx'
import { ANIMATION_INTERVAL, RANGE_VALUE } from '../../constants'
import {
  accurateSubtract,
  accurateSum,
  roundToPrecision,
} from '../../helpers/accurate-calculation.ts'
import { Header } from '../header/header.tsx'
import { InputRange } from '../input-range/input-range.tsx'

import styles from './target-indicator.module.scss'

export const TargetIndicator: FC<TargetIndicatorPropsType> = ({ balance }) => {
  const [value, setValue] = useState(RANGE_VALUE.INITIAL_VALUE)
  const [remainingAmount, setRemainingAmount] = useState(0)

  useEffect(() => {
    setRemainingAmount(accurateSubtract(RANGE_VALUE.TARGET, value))
  }, [value])

  useEffect(() => {
    if (value >= balance && value < RANGE_VALUE.TARGET) {
      const timeoutId = setTimeout(() => {
        setValue(prevState => accurateSum(prevState, RANGE_VALUE.STEP))
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [value])

  useEffect(() => {
    let animationFrameId: number
    let currentValue = value

    const updateValue = () => {
      const step = (balance - RANGE_VALUE.INITIAL_VALUE) / ANIMATION_INTERVAL

      currentValue += step

      if (currentValue >= balance) {
        setValue(roundToPrecision(balance))
        cancelAnimationFrame(animationFrameId)
      } else {
        setValue(roundToPrecision(currentValue))
        animationFrameId = requestAnimationFrame(updateValue)
      }
    }

    animationFrameId = requestAnimationFrame(updateValue)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.targetIndicator}>
        <Header title={'Target Indicator Demo'} />
        <div className={styles.content}>
          <div className={styles.rangeContainer}>
            <p>Reached:</p>

            <InputRange value={value} />

            <div
              className={value < 15 ? styles.target : `${styles.targetAchieved} ${styles.target}`}
            >
              <div>Target</div>
              <div>${RANGE_VALUE.TARGET}</div>
            </div>
          </div>

          {remainingAmount !== 0 && (
            <div className={styles.info}>
              <InfoSvg />
              <p>You need ${remainingAmount} more to reach your target</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type TargetIndicatorPropsType = {
  balance: number
}
