import { Suspense, lazy, useEffect, useRef, useState } from 'react'

type ReactLogo3DProps = {
  width?: number | string
  height?: number | string
  renderOnView?: boolean
  optimisation?: 'on' | 'off'
}

const ReactLogo3DScene = lazy(() => import('../ReactLogo3D/ReactLogo3DScene'))

const fallbackStyle = { width: '100%', height: '100%' }

function usePageVisible() {
  const [visible, setVisible] = useState(() => document.visibilityState !== 'hidden')

  useEffect(() => {
    const onChange = () => {
      const nextVisible = document.visibilityState !== 'hidden'
      setVisible((prevVisible) => (prevVisible === nextVisible ? prevVisible : nextVisible))
    }

    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return visible
}

const ReactLogo3D = ({
  width = '50%',
  height = 550,
  renderOnView = false,
  optimisation = 'off',
}: ReactLogo3DProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isInViewport, setIsInViewport] = useState(!renderOnView)
  const pageVisible = usePageVisible()

  const isOptimised = optimisation === 'on'

  useEffect(() => {
    if (!renderOnView) return

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const nextInViewport = entry ? entry.isIntersecting : false

        setIsInViewport((prevInViewport) => (prevInViewport === nextInViewport ? prevInViewport : nextInViewport))
      },
      { threshold: 0.01, rootMargin: '600px 0px 600px 0px' },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [renderOnView])

  const active = isInViewport && pageVisible

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      <Suspense fallback={<div style={fallbackStyle} />}>
        {isInViewport ? (
          <ReactLogo3DScene active={active} isOptimised={isOptimised} interactive={!isOptimised && active} />
        ) : (
          <div style={fallbackStyle} />
        )}
      </Suspense>
    </div>
  )
}

export default ReactLogo3D
