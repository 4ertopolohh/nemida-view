import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './App.css'
import './styles/_variables.scss'
import './styles/_fonts.scss'
import './styles/base.scss'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Loader from './components/Loader/Loader'
import type { HeaderNavListItem } from './components/HeaderNav/HeaderNav'
import HeaderOthersButton from './components/HeaderOthersButton/HeaderOthersButton'

import bookIcon from './assets/images/icons/bookIcon.png'
import faqIcon from './assets/images/icons/faqIcon.png'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage/PortfolioPage'))
const FAQPage = lazy(() => import('./pages/FAQPage/FAQPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage/ArticlePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

const routeOrderByPath: Record<string, number> = {
  '/': 0,
  '/services': 1,
  '/portfolio': 2,
  '/faq': 3,
  '/articles': 3,
}

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'

const getRouteOrder = (path: string) => {
  const normalizedPath = normalizePath(path)

  if (normalizedPath in routeOrderByPath) {
    return routeOrderByPath[normalizedPath]
  }

  const nestedMatch = Object.entries(routeOrderByPath)
    .filter(([routePath]) => routePath !== '/' && normalizedPath.startsWith(`${routePath}/`))
    .sort((left, right) => right[0].length - left[0].length)[0]

  if (nestedMatch) {
    return nestedMatch[1]
  }

  return Number.MAX_SAFE_INTEGER
}

const getRouteDirection = (fromPath: string, toPath: string) => {
  const fromOrder = getRouteOrder(fromPath)
  const toOrder = getRouteOrder(toPath)

  if (fromOrder === toOrder) {
    return 0
  }

  return toOrder > fromOrder ? 1 : -1
}

const routeMotionVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? '0%' : direction > 0 ? '12%' : '-12%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 0 ? '0%' : direction > 0 ? '-10%' : '10%',
    opacity: 0,
  }),
}

const reducedMotionVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

function RouteFallback() {
  return <Loader text='Загрузка страницы...' fullScreen />
}

function AnimatedRoutes() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const currentPath = normalizePath(location.pathname)
  const [previousPath, setPreviousPath] = useState(currentPath)
  const direction = getRouteDirection(previousPath, currentPath)

  useEffect(() => {
    setPreviousPath(currentPath)
  }, [currentPath])

  return (
    <div className='route-transition-root'>
      <AnimatePresence initial={false} mode='wait' custom={direction}>
        <motion.div
          key={location.pathname}
          className='route-transition-page'
          custom={direction}
          variants={prefersReducedMotion ? reducedMotionVariants : routeMotionVariants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={
            prefersReducedMotion
              ? { duration: 0.12 }
              : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path='/' element={<HomePage />} />
              <Route path='/services' element={<ServicesPage />} />
              <Route path='/portfolio' element={<PortfolioPage />} />
              <Route path='/faq' element={<FAQPage />} />
              <Route path='/articles' element={<ArticlePage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function App() {
  const [menuAssetsRequested, setMenuAssetsRequested] = useState(false)
  const [faqBackground, setFaqBackground] = useState<string>()
  const [articlesBackground, setArticlesBackground] = useState<string>()

  const requestMenuAssets = useCallback(() => {
    setMenuAssetsRequested((requested) => (requested ? requested : true))
  }, [])

  useEffect(() => {
    if (!menuAssetsRequested || faqBackground) return

    let active = true

    void import('./assets/images/pictures/faqBackground.png').then((asset) => {
      if (active) {
        setFaqBackground(asset.default)
      }
    })

    return () => {
      active = false
    }
  }, [faqBackground, menuAssetsRequested])

  useEffect(() => {
    if (!menuAssetsRequested || articlesBackground) return

    let active = true

    void import('./assets/images/pictures/articlesBackground.png').then((asset) => {
      if (active) {
        setArticlesBackground(asset.default)
      }
    })

    return () => {
      active = false
    }
  }, [articlesBackground, menuAssetsRequested])

  const faqMenuItems = ['Сколько времени понадобится?', 'Почему это столько стоит?']
  const articlesMenuItems = ['Почему мы выбрали React?', 'Почему мы выбрали Django?']

  const headerNavTitles: HeaderNavListItem[] = [
    { title: 'Главная', type: 'default', to: '/' },
    { title: 'Услуги', type: 'default', to: '/services' },
    { title: 'Портфолио', type: 'default', to: '/portfolio' },
    {
      title: 'Прочее',
      type: 'menu',
      to: '/faq',
      activePaths: ['/articles'],
      onMenuIntent: requestMenuAssets,
      menuContent: (
        <>
          <HeaderOthersButton
            link='/faq'
            title='Ответы на вопросы'
            icon={faqIcon}
            items={faqMenuItems}
            backgroundImage={faqBackground}
          />
          <HeaderOthersButton
            link='/articles'
            title='Статьи'
            icon={bookIcon}
            items={articlesMenuItems}
            backgroundImage={articlesBackground}
          />
        </>
      ),
    },
  ]

  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

  return (
    <BrowserRouter basename={routerBasename}>
      <Header headerNavTitles={headerNavTitles} />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
