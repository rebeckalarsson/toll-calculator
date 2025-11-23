import type { ITollState } from 'models/context'
import type { TollEntries } from 'models/toll-entries'

export const initialState: ITollState = {
  tollData: undefined,
  userId: undefined,
}

export type Action =
  | { type: 'UPDATE_TOLL_DATA'; data: TollEntries }
  | { type: 'RESET_TOLL_DATA' }

export function tollReducer(state: ITollState, action: Action) {
  switch (action.type) {
    case 'UPDATE_TOLL_DATA': {
      return {
        ...state,
        tollData: action.data,
      }
    }
    case 'RESET_TOLL_DATA': {
      return {
        userId: undefined,
        tollData: undefined,
      }
    }
  }
}
