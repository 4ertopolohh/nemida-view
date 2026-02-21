import { useEffect, useState } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import '../Header/Header.scss'
import HeaderButtons from '../HeaderButtons/HeaderButtons'
import HeaderLogo from '../HeaderLogo/HeaderLogo'
import HeaderNav, { type HeaderNavListItem } from '../HeaderNav/HeaderNav'

type HeaderProps = {
  headerNavTitles: HeaderNavListItem[]
}

let hasHeaderAnimated = false

const Header = ({ headerNavTitles }: HeaderProps) => {
  const [isAtTop, setIsAtTop] = useState(true)
  const shouldAnimateOnMount = !hasHeaderAnimated

  useEffect(() => {
    hasHeaderAnimated = true

    let frameId = 0

    const updateState = () => {
      frameId = 0
      const nextIsAtTop = window.scrollY <= 0
      setIsAtTop((prev) => (prev === nextIsAtTop ? prev : nextIsAtTop))
    }

    const handleScroll = () => {
      if (frameId !== 0) return
      frameId = window.requestAnimationFrame(updateState)
    }

    updateState()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        className='header'
        initial={shouldAnimateOnMount ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldAnimateOnMount
            ? { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0 }
        }
      >
        <div className={`headerUnderlay${isAtTop ? '' : ' headerUnderlayVisible'}`}></div>
        <div className='container'>
          <HeaderLogo />
          <HeaderNav headerNavTitles={headerNavTitles} />
          <HeaderButtons />
        </div>
      </m.header>
    </LazyMotion>
  )
}

export default Header
