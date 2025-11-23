'use client'
import * as React from 'react'
import { Button, Field } from '@base-ui-components/react'
import styles from '../../../styles/root.module.css'
import { redirect, useFetcher } from 'react-router'
import clsx from 'clsx'

export async function clientAction({ request }: any) {
  await new Promise((res) => setTimeout(res, 1000))
  let data = await request.formData()

  let userName = data.get('userName') as string
  if (userName.trim() === '') {
    return { error: 'User name cannot be empty' }
  }

  localStorage.setItem('user', userName)
  return redirect('/')
}

export default function Login() {
  const [user, setUser] = React.useState<string>('tcanas0@webs.com')
  let fetcher = useFetcher()
  let error: string | null = fetcher.data?.error

  function updateUser(e: React.ChangeEvent<HTMLInputElement>) {
    setUser(e.target.value)
  }

  return (
    <div className="login-container">
      <h1 className={clsx(styles.HeadingH1)}>Welcome to Toll INC</h1>

      <div className="login-container">
        <fetcher.Form method="post" className={styles.Form}>
          <Field.Root className={styles.Field}>
            <Field.Label className={styles.Label}>User name</Field.Label>
            <Field.Control
              required
              placeholder="tcanas0@webs.com"
              value={user}
              onChange={updateUser}
              className={styles.Input}
              type="text"
              name="userName"
            />
            <Field.Error className={styles.Error} match="valueMissing">
              Please enter your user name
            </Field.Error>
          </Field.Root>
          <Field.Root className={styles.Field}>
            <Field.Label className={styles.Label}>Password</Field.Label>
            <Field.Control
              required
              placeholder="password"
              value={'password'}
              className={styles.Input}
              type="password"
              name="password"
            />
            <Field.Error className={styles.Error} match="valueMissing">
              Please enter your user name
            </Field.Error>
          </Field.Root>
          <Button
            type="submit"
            disabled={fetcher.state !== 'idle'}
            focusableWhenDisabled
            className={styles.Button}
          >
            {fetcher.state !== 'idle' ? 'Logging in...' : 'Login'}
          </Button>
        </fetcher.Form>
        {error && <p className={styles.ErrorMessage}>{error}</p>}
      </div>
    </div>
  )
}
