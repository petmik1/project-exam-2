import { render, screen } from '@testing-library/react'
import Login from './index'

it('should render the login page', () => {
  render(<Login />)
  const header = screen.getByRole('heading', { name: /login/i })
  expect(header).toBeVisible()
})

it('should render the email input', () => {
  render(<Login />)
  const emailInput = screen.getByLabelText(/email/i)
  expect(emailInput).toBeVisible()
})

it('should render the password input', () => {
  render(<Login />)
  const passwordInput = screen.getByLabelText(/password/i)
  expect(passwordInput).toBeVisible()
})

it('should render the login button', () => {
  render(<Login />)
  const loginButton = screen.getByRole('button', { name: /login/i })
  expect(loginButton).toBeVisible()
})
it('should render the register link', () => {
  render(<Login />)
  const registerLink = screen.getByTestId('register-link')
  expect(registerLink).toBeVisible()
})
