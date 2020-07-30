# triple-triad

Web Based implementation of the Popular [Triple Triad](https://finalfantasy.fandom.com/wiki/Triple_Triad) minigame from [Final Fantasy VIII](https://finalfantasy.fandom.com/wiki/Final_Fantasy_VIII).


## TODOS:
---
- [ ] Cards
  - [ ] create all TT original cards
  - [ ] bonus rare cards (Omega Weapon, Emerald Weapon and Ruby Weapon (FF7), etc                                                       )
    - [ ] also bring in characters from other games
- [ ] UI
  - [x] Card Stacks
  - [ ] Triad Board
  - [ ] Region Map?
    - [ ] bring in the rules from each region?
- [ ] Game Play
  - [ ] AI engine for computer play
    - [ ] computer can be at levels 1-100 (level depends on quality of cards)
    - [ ] queryable Triad Board to make smart plays based on weakness sides/position on board
    - [ ] implement Triple Triad Rules
      - [x] Open
      - [ ] Random (no one's favorite)
      - [ ] Same
      - [ ] Plus
      - [ ] Elemental
      - [ ] Sudden Death
    - [ ] support mixing of rules by carrying from different regions?
- [ ] RNG
  - [ ] introduce RNG secrets that can be found to obtain rare cards
  - [ ] Algorithms that can be used to determine cards that are purchased in variety packs (Gil, not real money)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
