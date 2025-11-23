'use client'
import clsx from 'clsx'
import { TollContext } from 'context/toll-context'
import * as React from 'react'
import styles from '../../styles/root.module.css'
import { Accordion } from '@base-ui-components/react'
import {
  Ambulance,
  Bus,
  Car,
  Earth,
  Flag,
  Motorbike,
  PlusIcon,
  ShieldQuestionMark,
  ShieldUser,
  Truck,
} from 'lucide-react'
import { VehicleType } from 'models/vehicles'
import { getTollFee } from '~/helpers/toll-fee-helpers'
import type { TollEntry } from 'models/toll-entries'

export default function TollHistory() {
  const { state } = React.useContext(TollContext)
  const [entriesPerDate, setEntriesPerDate] = React.useState<
    {
      date: Date | null
      entries: TollEntry[]
    }[]
  >([])

  React.useEffect(() => {
    let groupedEntries: {
      date: Date | null
      entries: TollEntry[]
    }[] = []
    if (state.tollData?.entries) {
      groupedEntries = groupVehiclesPerDate(state.tollData?.entries)
    }
    setEntriesPerDate(groupedEntries)
  }, [state.tollData?.entries])

  return (
    <div>
      <h3 className={clsx(styles.HeadingH3)}>My toll history</h3>
      <div className="toll-history-container">
        <h4 className={clsx(styles.HeadingH4)}>My entries: by date</h4>
        {entriesPerDate.length ? (
          <Accordion.Root className={styles.Accordion}>
            {entriesPerDate.map((entry, _i) => {
              const entryDate = entry.date
                ? entry.date instanceof Date
                  ? entry.date
                  : new Date(entry.date)
                : null

              let sumOfTollFees = entry.entries.reduce(
                (acc, current) =>
                  acc +
                  getTollFee({
                    date: new Date(current.date),
                    vehicleType: current.vehicle as VehicleType,
                  }),
                0
              )

              return (
                <Accordion.Item
                  className={styles.AccordionItem}
                  key={'vehicle' + _i}
                >
                  <Accordion.Header className={styles.AccordionHeader}>
                    <Accordion.Trigger className={styles.AccordionTrigger}>
                      <div className={styles.AccordionTriggerContent}>
                        {entryDate
                          ? entryDate.toLocaleDateString('sv-SE')
                          : 'Unknown'}
                      </div>
                      <PlusIcon
                        className={styles.AccordionTriggerIcon}
                        aria-label="plus: expand"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  {entry.entries.map((e, _j) => {
                    const { icon, vehicleName } = formatVehicle(e.vehicle)
                    const perEntryDate = e.date
                      ? e.date instanceof Date
                        ? e.date
                        : new Date(e.date)
                      : null

                    return (
                      <Accordion.Panel className={styles.AccordionPanel}>
                        <div className={styles.AccordionContent}>
                          <table className={styles.Table}>
                            <tbody>
                              <tr className={styles.TableRow}>
                                <th className={styles.TableHead}>
                                  Vehicle type
                                </th>
                                <td className={styles.TableItem}>
                                  {vehicleName}
                                  {icon}
                                </td>
                              </tr>
                              <tr className={styles.TableRow}>
                                <th className={styles.TableHead}>
                                  Registration number
                                </th>
                                <td className={styles.TableItem}>
                                  {e.registration}
                                </td>
                              </tr>
                              <tr className={styles.TableRow}>
                                <th className={styles.TableHead}>
                                  Time of entry
                                </th>
                                <td className={styles.TableItem}>
                                  {perEntryDate
                                    ? perEntryDate.toLocaleDateString('sv-SE') +
                                      ' ' +
                                      perEntryDate.toLocaleTimeString('sv-SE')
                                    : 'Unknown'}
                                </td>
                              </tr>
                              <tr className={styles.TableRow}>
                                <th className={styles.TableHead}>Cost</th>
                                <td className={styles.TableItem}>
                                  {getTollFee({
                                    date: e.date,
                                    vehicleType: e.vehicle as VehicleType,
                                  })}{' '}
                                  SEK
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Accordion.Panel>
                    )
                  })}
                  <Accordion.Panel className={styles.AccordionPanel}>
                    <div className={styles.AccordionPanelSum}>
                      <p>Total sum of toll fees per this day:</p>
                      <p>{sumOfTollFees} </p>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion.Root>
        ) : (
          <p>You have no registered entries.</p>
        )}
      </div>
    </div>
  )
}

function formatVehicle(type: string) {
  let vehicleName = type
  if (vehicleName) {
    vehicleName = vehicleName.charAt(0).toUpperCase() + vehicleName.slice(1)
  }
  let icon = () => {
    switch (type as VehicleType) {
      case VehicleType.Car:
        return <Car size={15} aria-label={type} />
      case VehicleType.Motorcycle:
        return <Motorbike size={15} aria-label={type} />
      case VehicleType.Truck:
        return <Truck size={15} aria-label={type} />
      case VehicleType.Bus:
        return <Bus size={15} aria-label={type} />
      case VehicleType.Emergency:
        return <Ambulance size={15} aria-label={type} />
      case VehicleType.Diplomat:
        return <Flag size={15} aria-label={'Flag : ' + type} />
      case VehicleType.Military:
        return <ShieldUser size={15} aria-label={'Shield user: ' + type} />
      case VehicleType.Foreign:
        return <Earth size={15} aria-label={'Globe : ' + type} />
      default:
        return <ShieldQuestionMark size={15} aria-label={'unknown : ' + type} />
    }
  }
  return { vehicleName, icon: icon() }
}

function groupVehiclesPerDate(entries: TollEntry[]): {
  date: Date | null
  entries: TollEntry[]
}[] {
  const map = new Map<string, TollEntry[]>()

  for (const entry of entries) {
    // normalize date to a Date object (or null)
    const entryDate = entry.date
      ? entry.date instanceof Date
        ? entry.date
        : new Date(entry.date)
      : null

    // use YYYY-MM-DD as the grouping key; unknown entries use 'unknown'
    const key = entryDate ? entryDate.toISOString().slice(0, 10) : 'unknown'

    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(entry)
  }

  // convert map to array of groups with a Date (or null) and entries,
  // sorted descending by date (unknown last)
  const groups = Array.from(map.entries()).map(([key, items]) => {
    const date = key === 'unknown' ? null : new Date(key + 'T00:00:00')
    return { date, entries: items }
  })

  groups.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.getTime() - a.date.getTime()
  })

  return groups
}
