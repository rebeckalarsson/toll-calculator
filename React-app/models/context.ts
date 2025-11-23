import type { Action } from 'context/toll-reducer'
import type { TollEntries } from './toll-entries'

export interface ITollState {
  userId?: string
  tollData?: TollEntries
}

export interface ITollContext {
  state: ITollState
  dispatch: React.ActionDispatch<[action: Action]>
}
