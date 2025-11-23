'use client'
import React from 'react'
import { TollContext } from 'context/toll-context'
import { Button, Field } from '@base-ui-components/react'
import styles from '../../styles/root.module.css'
import clsx from 'clsx'
import { useFetcher } from 'react-router'
import { Pen } from 'lucide-react'

export async function clientAction({ request }: any) {
  await new Promise((res) => setTimeout(res, 1000))

  return {
    success: true,
  }
}

export default function User() {
  const { state } = React.useContext(TollContext)
  const [user, setUser] = React.useState<{
    firstName: string
    lastName: string
    email: string
  }>({
    firstName: state.tollData?.firstName || '',
    lastName: state.tollData?.lastName || '',
    email: state.tollData?.email || '',
  })
  const [edit, setEdit] = React.useState(false)
  let fetcher = useFetcher()

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'firstName' | 'lastName' | 'email'
  ) {
    setUser((prev) => ({ ...prev, [field]: e.target.value }))
  }

  React.useEffect(() => {
    setUser({
      firstName: state.tollData?.firstName || '',
      lastName: state.tollData?.lastName || '',
      email: state.tollData?.email || '',
    })
  }, [state])

  React.useEffect(() => {
    if (fetcher.data?.success) {
      setEdit(!edit)
    }
  }, [fetcher.data])

  return (
    <div className="user-container">
      <div className={clsx('user-header-container')}>
        <h3 className={clsx(styles.HeadingH3)}>User Settings</h3>
        <Button
          type="button"
          className={styles.Button}
          onClick={() => setEdit(!edit)}
          disabled={edit}
        >
          <Pen size={16} aria-label="edit" />
        </Button>
      </div>

      <fetcher.Form method="post" className={styles.Form}>
        <Field.Root className={styles.Field}>
          <Field.Label className={styles.Label}>First name</Field.Label>
          <Field.Control
            required
            value={user.firstName}
            onChange={(e) => handleChange(e, 'firstName')}
            className={styles.Input}
            type="text"
            name="firstName"
            disabled={!edit}
          />
        </Field.Root>
        <Field.Root className={styles.Field}>
          <Field.Label className={styles.Label}>Last name</Field.Label>
          <Field.Control
            required
            value={user.lastName}
            onChange={(e) => handleChange(e, 'lastName')}
            className={styles.Input}
            type="text"
            name="lastName"
            disabled={!edit}
          />
        </Field.Root>
        <Field.Root className={styles.Field}>
          <Field.Label className={styles.Label}>Email</Field.Label>
          <Field.Control
            required
            value={user.email}
            onChange={(e) => handleChange(e, 'email')}
            className={styles.Input}
            type="email"
            name="email"
            disabled={!edit}
          />
        </Field.Root>
        <Field.Root className={styles.Field}>
          <Field.Label className={styles.Label}>User name</Field.Label>
          <Field.Control
            required
            value={user.email}
            onChange={(e) => handleChange(e, 'email')}
            className={styles.Input}
            type="text"
            name="userName"
            disabled={true}
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
            disabled={true}
          />
          <Field.Error className={styles.Error} match="valueMissing">
            Please enter your user name
          </Field.Error>
        </Field.Root>
        <Button
          type="submit"
          className={styles.Button}
          disabled={!edit || fetcher.state !== 'idle'}
        >
          {fetcher.state !== 'idle' ? '...Saving changes' : 'Save changes'}
        </Button>
      </fetcher.Form>
      {fetcher.data?.success && <div>You have updated your details!</div>}
    </div>
  )
}
