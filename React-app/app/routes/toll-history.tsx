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

export default function TollHistory() {
  const { state } = React.useContext(TollContext)

  return (
    <div>
      <h3 className={clsx(styles.HeadingH3)}>My toll history</h3>
      <div className="toll-history-container">
        <h4 className={clsx(styles.HeadingH4)}>My entries</h4>
        {state.tollData?.entries.length ? (
          <Accordion.Root className={styles.Accordion}>
            {state.tollData?.entries.map((vehicle, index) => {
              const { icon, vehicleName } = formatVehicle(vehicle.vehicle)
              const entryDate = vehicle.date
                ? vehicle.date instanceof Date
                  ? vehicle.date
                  : new Date(vehicle.date)
                : null

              return (
                <Accordion.Item
                  className={styles.AccordionItem}
                  key={'vehicle' + index}
                >
                  <Accordion.Header className={styles.AccordionHeader}>
                    <Accordion.Trigger className={styles.AccordionTrigger}>
                      <div className={styles.AccordionTriggerContent}>
                        {icon}
                        {vehicleName}: {vehicle.registration}
                      </div>
                      <PlusIcon
                        className={styles.AccordionTriggerIcon}
                        aria-label="plus: expand"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className={styles.AccordionPanel}>
                    <div className={styles.AccordionContent}>
                      <table className={styles.Table}>
                        <tbody>
                          <tr className={styles.TableRow}>
                            <th className={styles.TableHead}>Vehicle type</th>
                            <td className={styles.TableItem}>
                              {vehicle.vehicle}
                            </td>
                          </tr>
                          <tr className={styles.TableRow}>
                            <th className={styles.TableHead}>
                              Registration number
                            </th>
                            <td className={styles.TableItem}>
                              {vehicle.registration}
                            </td>
                          </tr>
                          <tr className={styles.TableRow}>
                            <th className={styles.TableHead}>Time of entry</th>
                            <td className={styles.TableItem}>
                              {entryDate
                                ? entryDate.toLocaleString('sv-SE')
                                : 'Unknown'}
                            </td>
                          </tr>
                          <tr className={styles.TableRow}>
                            <th className={styles.TableHead}>Cost</th>
                            <td className={styles.TableItem}>
                              {getTollFee({
                                date: vehicle.date,
                                vehicleType: vehicle.vehicle as VehicleType,
                              })}{' '}
                              SEK
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
