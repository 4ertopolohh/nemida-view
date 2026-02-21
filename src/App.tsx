import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import './App.css'
import './styles/_variables.scss'
import './styles/_fonts.scss'
import './styles/base.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
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

function RouteFallback() {
  return <div className='route-fallback'>Загрузка страницы...</div>
}

function App() {
  const [menuAssetsRequested, setMenuAssetsRequested] = useState(false)
  const [faqBackground, setFaqBackground] = useState<string>()
  const [articlesBackground, setArticlesBackground] = useState<string>()

  const requestMenuAssets = useCallback(() => {
    setMenuAssetsRequested(true)
  }, [])

  useEffect(() => {
    if (menuAssetsRequested) return

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof idleWindow.requestIdleCallback === 'function') {
      const idleId = idleWindow.requestIdleCallback(
        () => {
          setMenuAssetsRequested(true)
        },
        { timeout: 2400 },
      )

      return () => {
        if (typeof idleWindow.cancelIdleCallback === 'function') {
          idleWindow.cancelIdleCallback(idleId)
        }
      }
    }

    const timeoutId = window.setTimeout(() => {
      setMenuAssetsRequested(true)
    }, 1400)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [menuAssetsRequested])

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
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/articles' element={<ArticlePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
