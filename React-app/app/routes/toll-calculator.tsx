'use client'
import { clsx } from 'clsx'
import * as React from 'react'
import styles from '../../styles/root.module.css'
import { getTollFee } from '~/helpers/toll-fee-helpers'
import { VehicleType } from 'models/vehicles'
import { Select } from '@base-ui-components/react'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'

export default function TollCalculator() {
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date())
  const vehicleList = [
    { label: 'Bus', value: VehicleType.Bus },
    { label: 'Car', value: VehicleType.Car },
    { label: 'Diplomat', value: VehicleType.Diplomat },
    { label: 'Emergency', value: VehicleType.Emergency },
    { label: 'Foreign', value: VehicleType.Foreign },
    { label: 'Military', value: VehicleType.Military },
    { label: 'Motorcycle', value: VehicleType.Motorcycle },
    { label: 'Tractor', value: VehicleType.Tractor },
    { label: 'Truck', value: VehicleType.Truck },
  ]
  const [vehicleType, setType] = React.useState<{
    label: string
    value: VehicleType
  }>(vehicleList[0])

  React.useEffect(() => {
    let currentTimeDate = new Date()
    const timeoutId = setTimeout(() => {
      setCurrentTime(currentTimeDate)
    }, 60000)
    return () => clearTimeout(timeoutId)
  }, [currentTime])

  return (
    <div>
      <h3 className={clsx(styles.HeadingH3)}>Toll calculator</h3>
      <div className="toll-calculator-container">
        <p>
          Below you can se the current price for entering the city per vehicle :
        </p>
        <div>
          <Select.Root items={vehicleList}>
            <Select.Trigger className={styles.Select}>
              <Select.Value>{vehicleType.label}</Select.Value>
              <Select.Icon className={styles.SelectIcon}>
                <ChevronsUpDown size={14} aria-label="chevrons" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner
                className={styles.SelectPositioner}
                sideOffset={8}
              >
                <Select.Popup className={styles.SelectPopup}>
                  <Select.ScrollUpArrow className={styles.SelectScrollArrow} />
                  <Select.List className={styles.SelectList}>
                    {vehicleList.map(({ label, value }) => (
                      <Select.Item
                        key={label}
                        value={value}
                        className={styles.SelectItem}
                        onClick={() =>
                          setType({
                            label,
                            value,
                          })
                        }
                      >
                        <Select.ItemIndicator
                          className={styles.SelectItemIndicator}
                        >
                          <CheckIcon
                            className={styles.SelectItemIndicatorIcon}
                            size={14}
                            aria-label="check mark"
                          />
                        </Select.ItemIndicator>
                        <Select.ItemText className={styles.SelectItemText}>
                          {label}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                  <Select.ScrollDownArrow
                    className={styles.SelectScrollArrow}
                  />
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>
        <div>
          {vehicleType &&
            getTollFee({
              date: currentTime,
              vehicleType: vehicleType.value,
            })}{' '}
          SEK
        </div>
      </div>
    </div>
  )
}
