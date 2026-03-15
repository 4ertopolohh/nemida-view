import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ChangeLanguageButton from '../../components/ChangeLanguageButton/ChangeLanguageButton'
import ContactsButton from '../../components/ContactsButton/ContactsButton'
import HeaderOthersButton from '../../components/HeaderOthersButton/HeaderOthersButton'
import OnHomeButton from '../../components/OnHomeButton/OnHomeButton'

describe('Main Buttons', () => {
  it('renders home button with route to root', () => {
    render(
      <MemoryRouter>
        <OnHomeButton />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('renders contacts button with custom text and dimensions', () => {
    render(<ContactsButton text='Discuss project' width={240} height='56px' />)

    const contactsButton = screen.getByRole('button', { name: 'Discuss project' })
    expect(contactsButton).toHaveStyle({ width: '240px', height: '56px' })
  })

  it('toggles active language on click', async () => {
    const user = userEvent.setup()
    render(<ChangeLanguageButton />)

    const toggleButton = screen.getByRole('button')
    const enOption = screen.getByText('EN')
    const ruOption = screen.getByText('RU')
    const enClassName = enOption.className
    const ruClassName = ruOption.className

    expect(enClassName).not.toEqual(ruClassName)

    await user.click(toggleButton)

    expect(enOption.className).toBe(ruClassName)
    expect(ruOption.className).toBe(enClassName)
  })

  it('renders dropdown menu link with background and list items', () => {
    render(
      <MemoryRouter>
        <HeaderOthersButton
          link='/faq'
          title='FAQ'
          icon='/faqIcon.png'
          items={['How long?', 'Why this cost?']}
          backgroundImage='/faqBackground.png'
        />
      </MemoryRouter>,
    )

    const menuLink = screen.getByRole('link')
    expect(menuLink).toHaveAttribute('href', '/faq')
    expect(menuLink).toHaveStyle({ backgroundImage: 'url(/faqBackground.png)' })
    expect(screen.getByRole('heading', { name: 'FAQ' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
