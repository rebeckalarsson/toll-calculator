'use client'
import * as React from 'react'
import { Outlet, redirect, useLoaderData } from 'react-router'
import type { Route } from '../+types/root'
import Navigation from '~/components/navigation/navigation-menu'
import tolldata from '../../data.json'
import '../../styles/home.css'
import { TollContext } from 'context/toll-context'
import Footer from '~/components/footer'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Toll calculator' },
    { name: 'description', content: 'Toll calculator' },
  ]
}

export async function clientLoader({ request }: Route.LoaderArgs) {
  let user = localStorage.getItem('user')

  if (!user) {
    return redirect('/login')
  }

  let data = tolldata.find((toll) => toll.email === user)

  if (data === undefined) {
    return redirect('/login')
  }

  return { userData: data }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { userData } = useLoaderData()

  const { state, dispatch } = React.useContext(TollContext)

  React.useEffect(() => {
    if (userData) {
      dispatch({ type: 'UPDATE_TOLL_DATA', data: userData })
    }
  }, [userData])

  return (
    <>
      <div className="home-page-container">
        <Navigation />
        <div className="area-content-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}
