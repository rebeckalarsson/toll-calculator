# Rebeckas Toll -React-application!

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation - the Toll app

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## use email address from data.json

No need to add password in the pw field, just use email to login to see things.

---

# Stack

## React application with React router

I choose this combo as React router in itself is a well known and easy to set up base for a React application. Well documented and maintained base and suited for this more simple app. However can also be scaled up, if needed.
https://reactrouter.com/

## Styling

Using basic css and module.css to do the styling in this app. This as it is inheritly basic and I wanted to keep my css in my css files and not clutter the components with Tailwind css style classes. Just to make it more easy to read.

## Base UI

For aid in creating easy to use and well structured components I choose to use BaseUI as an assisting library to create my application: https://base-ui.com/react/overview/quick-start

## Lucide icons

For easy to use icons I choose to use Lucide: https://lucide.dev/

## clsx

Library to maintain easy to create css-classes.

## data.json

Created using Mockaroo : https://www.mockaroo.com/

# Future considerations:

## Improve styling and design

This is an incredibly basic ui with very little design to it. The focus was logic and more over functionality and more propper structure.

## Propper API req

Currently all data is mocked through the data.json file. Nothing is propperly saved or updated in this file. Alls is mocked and only local state is updated for show.

## More features can be added

The thought of this app was more intricate funcionality eg.

- Propper login handling
- Re-routing to loginpage if user were to try and access any other part of the page if not logged in propperly
- Propper safety precautions when login in/out.
- Input sanitation for fields with propper regex for input patterns
- Better styling for desktop app - now mainly mobile first

Features to be added:

- Admin page to administrate toll fees and such
- Toll-calculator page : date and time picker to check toll fees for that specific time/date
- User page : update password, propper edit functionality
- Toll history page : ability to see ones fees per month (calendar view of some sort)
