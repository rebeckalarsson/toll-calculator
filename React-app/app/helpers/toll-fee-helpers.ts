import { VehicleType } from 'models/vehicles'

export const getTollFee = ({
  vehicleType,
  date,
}: {
  vehicleType: VehicleType
  date: Date
}) => {
  const tollDate = new Date(date)
  if (isTollFreeVehicle(vehicleType) || isTollFreeDate(tollDate)) {
    return 0
  }
  const hour = tollDate.getHours()
  const minute = tollDate.getMinutes()

  if (hour == 6 && minute >= 0 && minute <= 29) return 8
  else if (hour == 6 && minute >= 30 && minute <= 59) return 13
  else if (hour == 7 && minute >= 0 && minute <= 59) return 18
  else if (hour == 8 && minute >= 0 && minute <= 29) return 13
  else if (hour >= 8 && hour <= 14 && minute >= 30 && minute <= 59) return 8
  else if (hour == 15 && minute >= 0 && minute <= 29) return 13
  else if ((hour == 15 && minute >= 0) || (hour == 16 && minute <= 59))
    return 18
  else if (hour == 17 && minute >= 0 && minute <= 59) return 13
  else if (hour == 18 && minute >= 0 && minute <= 29) return 8
  else return 0
}

export const isTollFreeDate = (date: Date): boolean => {
  const day = date.getDay()
  const dateNr = date.getDate()
  const month = date.getMonth() + 1
  // Weekend check
  if (day === 6 || day === 0) {
    return true
  }
  //Holiday check
  if (
    (month == 1 && dateNr == 1) ||
    (month == 3 && (dateNr == 28 || dateNr == 29)) ||
    (month == 4 && (dateNr == 1 || dateNr == 30)) ||
    (month == 5 && (dateNr == 1 || dateNr == 8 || dateNr == 9)) ||
    (month == 6 && (dateNr == 5 || dateNr == 6 || dateNr == 21)) ||
    month == 7 ||
    (month == 11 && dateNr == 1) ||
    (month == 12 &&
      (dateNr == 24 || dateNr == 25 || dateNr == 26 || dateNr == 31))
  ) {
    return true
  }

  return false
}

export const isTollFreeVehicle = (vehicleType: VehicleType): boolean => {
  switch (vehicleType) {
    case VehicleType.Emergency:
    case VehicleType.Diplomat:
    case VehicleType.Military:
    case VehicleType.Foreign:
    case VehicleType.Tractor:
    case VehicleType.Motorcycle:
      return true
    default:
      return false
  }
}
