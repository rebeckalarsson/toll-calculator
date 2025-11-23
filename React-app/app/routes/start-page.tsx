'use client'
import * as React from 'react'
import { ArrowRight, Check } from 'lucide-react'
import styles from '../../styles/root.module.css'
import clsx from 'clsx'
import { Link } from 'react-router'
import { TollContext } from 'context/toll-context'

export default function StartPage() {
  const { state } = React.useContext(TollContext)

  return (
    <div className="start-page-container">
      <div className="start-page-welcome-box">
        <h1 className={clsx(styles.HeadingH1)}>
          Welcome back {state.tollData?.firstName}
        </h1>
        <p>What can we help you regarding today?</p>
      </div>
      <div className="start-page-link-box">
        <h4 className={clsx(styles.HeadingH4)}>Calculator</h4>
        <p>Use our calculator and see:</p>
        <ul>
          <li>
            <Check size={14} aria-label="check mark" />
            Toll costs at any time of day
          </li>
          <li>
            <Check size={14} aria-label="check mark" />
            Vehicles that are free of charge
          </li>
        </ul>
        <Link to={'/toll-history'} className={clsx(styles.Button)}>
          To My Toll History <ArrowRight size={16} />
        </Link>
      </div>
      <div className="start-page-link-box">
        <h4 className={clsx(styles.HeadingH4)}>My Toll</h4>
        <p>See your registered passages and costs.</p>
        <Link to={'/toll-calculator'} className={clsx(styles.Button)}>
          To calculator <ArrowRight size={16} aria-label="arrow right" />
        </Link>
      </div>
      <div className="start-page-link-box">
        <h4 className={clsx(styles.HeadingH4)}>Settings</h4>
        <p>See and update your details. </p>
        <Link to={'/toll-history'} className={clsx(styles.Button)}>
          To Settings <ArrowRight size={16} aria-label="arrow right" />
        </Link>
      </div>
    </div>
  )
}
