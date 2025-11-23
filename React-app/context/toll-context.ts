import type { ITollContext } from 'models/context'
import { createContext } from 'react'

export const TollContext = createContext<ITollContext>({
  state: {},
  dispatch: () => {},
})
