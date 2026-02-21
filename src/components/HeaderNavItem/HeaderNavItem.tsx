import { Children, type FocusEvent, type ReactNode, useState } from 'react'
import { m } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import headerBottomArrowIcon from '../../assets/images/icons/headerBottomArrow.png'
import '../HeaderNavItem/HeaderNavItem.scss'

export type HeaderNavItemType = 'default' | 'menu'

type HeaderNavItemBaseProps = {
  title: string
  to: string
  activePaths?: string[]
}

type HeaderNavItemDefaultProps = HeaderNavItemBaseProps & {
  type: 'default'
}

type HeaderNavItemMenuProps = HeaderNavItemBaseProps & {
  type: 'menu'
  menuContent?: ReactNode
  onMenuIntent?: () => void
}

export type HeaderNavItemProps = HeaderNavItemDefaultProps | HeaderNavItemMenuProps

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'

const isPathMatch = (pathname: string, targetPath: string) => {
  const normalizedTargetPath = normalizePath(targetPath)

  if (normalizedTargetPath === '/') {
    return pathname === '/'
  }

  return pathname === normalizedTargetPath || pathname.startsWith(`${normalizedTargetPath}/`)
}

const HeaderNavItem = (props: HeaderNavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const currentPath = normalizePath(location.pathname)
  const routePaths = [props.to, ...(props.activePaths ?? [])]
  const isRouteActive = routePaths.some((path) => isPathMatch(currentPath, path))

  if (props.type === 'menu') {
    const menuChildren = props.menuContent ? Children.toArray(props.menuContent) : []

    const openMenu = () => {
      props.onMenuIntent?.()
      setIsOpen(true)
    }

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
      const nextFocused = event.relatedTarget as Node | null

      if (!nextFocused || !event.currentTarget.contains(nextFocused)) {
        setIsOpen(false)
      }
    }

    return (
      <m.div
        className={`headerNavItem headerNavItem--menu${isRouteActive ? ' headerNavItem--active' : ''}`}
        aria-expanded={isOpen}
        tabIndex={0}
        onPointerDown={openMenu}
        onHoverStart={openMenu}
        onHoverEnd={() => setIsOpen(false)}
        onFocus={openMenu}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false)
          }
        }}
        style={{
          WebkitBackdropFilter: isOpen ? 'blur(2px) saturate(140%)' : 'blur(0) saturate(100%)',
        }}
        initial={false}
        animate={{
          width: isOpen ? 250 : 90,
          paddingTop: isOpen ? 10 : 0,
          paddingRight: isOpen ? 15 : 0,
          paddingBottom: isOpen ? 15 : 0,
          paddingLeft: isOpen ? 15 : 0,
          backgroundColor: isOpen ? 'rgba(147, 146, 146, 0.16)' : 'rgba(147, 146, 146, 0)',
          borderColor: isOpen ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0)',
          boxShadow: isOpen ? '0 10px 28px rgba(0, 0, 0, 0.18)' : '0 10px 28px rgba(0, 0, 0, 0)',
          backdropFilter: isOpen ? 'blur(2px) saturate(140%)' : 'blur(0) saturate(100%)',
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className='headerNavItemTitleWrapper'>
          <h3 className='headerNavItemTitle'>{props.title}</h3>
          <m.img
            src={headerBottomArrowIcon}
            alt=''
            aria-hidden='true'
            loading='lazy'
            className='headerNavItemIcon'
            animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 1 : 0.75 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
          />
        </div>
        {props.menuContent && (
          <m.div
            className='headerNavItemMenuContent'
            initial={false}
            animate={{
              maxHeight: isOpen ? 1000 : 0,
              marginTop: isOpen ? 8 : 0,
              opacity: isOpen ? 1 : 0,
              scaleX: isOpen ? 1 : 0.58,
              scaleY: isOpen ? 1 : 0.75,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
            transition={{
              maxHeight: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              marginTop: { duration: 0.3, ease: 'easeOut' },
              opacity: { duration: 0.26, ease: 'easeOut' },
              scaleX: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              scaleY: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {menuChildren.map((child, index) => (
              <m.div
                key={index}
                className='headerNavItemMenuContentItem'
                initial={false}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  scale: isOpen ? 1 : 0.9,
                }}
                transition={{
                  opacity: { duration: 0.26, ease: 'easeOut' },
                  scale: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
                  delay: isOpen ? index * 0.03 : 0,
                }}
              >
                {child}
              </m.div>
            ))}
          </m.div>
        )}
      </m.div>
    )
  }

  return (
    <Link
      to={props.to}
      className={`headerNavItem headerNavItem--default${isRouteActive ? ' headerNavItem--active' : ''}`}
    >
      <div className='headerNavItemTitleWrapper'>
        <h3 className='headerNavItemTitle'>{props.title}</h3>
      </div>
    </Link>
  )
}

export default HeaderNavItem
