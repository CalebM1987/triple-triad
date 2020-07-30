import { GameplayState } from './modules/gameplay'
import store from './store'

const gameplayModule = new GameplayState({ store, name: 'gameplay'})

export {
  store,
  gameplayModule
}