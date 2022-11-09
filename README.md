# Dungeon & Dragons
View list of spells and add it to your favourites.

## Features
- The app displays list of all available DnD spells.
- Spell description can be viewed upon clicking the spell name.
- User can add/remove spell to the favourites list. 

## Demo App
Open [https://alishgiri.github.io/dnd](https://alishgiri.github.io/dnd) to view it in the browser.

## Technical Overview
- Utilizes latest React features like Hooks.
- Typescript is used for strict type checking.
- Virtulized list is used render list view for better performance.
- Jest is utilized for component testing.

## Test Overview
- Babel & Jest are preconfigured before running tests.
- `babel.config.js` and `jest.config.js` are used to configures testing environment for React Typescript.
- `jest.setup.js` is used to setup mock APIs and to set the initial heigh and width of the <AutoSizer />. Otherwise, list items will not be rendered due to unavailable height and width during component renderring.
- `test.data.json` provides mock API response data.

## Common Scripts Available
- `yarn start`
- `yarn test`
- `yarn run build`
- `yarn run eject`

## Learn More

You can learn more about the Dnd APIs from [http://www.dnd5eapi.co/](http://www.dnd5eapi.co/).
