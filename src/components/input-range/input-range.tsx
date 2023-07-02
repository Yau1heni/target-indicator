import { FC } from 'react'

import { RANGE_VALUE } from '../../constants'

import styles from './input-range.module.scss'

export const InputRange: FC<InputRangePropsType> = ({ value }) => {
  return (
    <div className={styles.container}>
      <div className={styles.range}>
        <input
          step={0.2}
          type="range"
          min={RANGE_VALUE.INITIAL_VALUE}
          max={RANGE_VALUE.TARGET}
          value={value}
          readOnly
        />
        <output
          className={styles.bubble}
          style={{
            left: `calc(${(value / RANGE_VALUE.TARGET) * 100}% + (${
              8 - (value / RANGE_VALUE.TARGET) * 100 * 0.15
            }px))`,
          }}
        >
          {`${value}$`}
        </output>
      </div>
    </div>
  )
}

type InputRangePropsType = {
  value: number
}
