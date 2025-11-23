'use client'
import { NavigationMenu } from '@base-ui-components/react/navigation-menu'
import styles from './navigation.module.css'
import { Link } from 'react-router'
import { House, LogOut, Settings } from 'lucide-react'
import clsx from 'clsx'

export default function Navigation() {
  return (
    <NavigationMenu.Root className={styles.Root}>
      <NavigationMenu.List className={clsx(styles.List, styles.LeftAligned)}>
        <NavigationMenu.Item>
          <Link to="/" className={styles.Trigger}>
            <House
              size={15}
              className={styles.Icon}
              aria-label="house: home icon"
            />
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link to="/toll-calculator" className={styles.Trigger}>
            Toll calculator
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link to="/toll-history" className={styles.Trigger}>
            My toll history
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.List className={clsx(styles.List, styles.RightAligned)}>
        <NavigationMenu.Item>
          <Link to="/user" className={styles.Trigger}>
            <Settings size={15} className={styles.Icon} aria-label="settings" />
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Link to="/logout" className={styles.Trigger}>
            <LogOut size={15} className={styles.Icon} aria-label="log out" />
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
