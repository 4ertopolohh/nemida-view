import { useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m, type Variants } from 'framer-motion'
import '../ServiceBanner/ServiceBanner.scss'
import ServiceCard from '../ServiceCard/ServiceCard';
import ServiceCardMini from '../ServiceCardMini/ServiceCardMini';

export type ServiceBannerProps = {
    title1: string
    title2: string
    title3: string
    title4: string
    subtitle1: string
    subtitle2: string
    subtitle3: string
    subtitle4: string
    price1: string
    price2: string
    price3: string
    price4: string
    icon: string
    blobColor: string
}

const serviceCardMiniDropVariants: Variants = {
    collapsed: {
        height: 0,
        opacity: 0,
        y: -38,
        scale: 0.96,
        filter: 'blur(8px)',
        pointerEvents: 'none',
        transition: {
            height: { duration: 0.28, ease: [0.4, 0, 1, 1] },
            opacity: { duration: 0.16, ease: 'easeOut' },
            y: { duration: 0.22, ease: [0.4, 0, 1, 1] },
            scale: { duration: 0.22, ease: [0.4, 0, 1, 1] },
            filter: { duration: 0.18, ease: 'easeOut' },
        },
    },
    expanded: (index: number) => ({
        height: 'auto',
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        pointerEvents: 'auto',
        transition: {
            height: { duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: 0.02 + index * 0.09 },
            opacity: { duration: 0.32, ease: 'easeOut', delay: 0.06 + index * 0.09 },
            y: {
                type: 'spring',
                stiffness: 360,
                damping: 32,
                mass: 0.8,
                delay: index * 0.09,
            },
            scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.09 },
            filter: { duration: 0.34, ease: 'easeOut', delay: index * 0.09 },
        },
    }),
}

const MINI_MOTION_HINT_DURATION_MS = 620

const ServiceBanner = ({ title1, title2, title3, title4, subtitle1, subtitle2, subtitle3, subtitle4, price1, price2, price3, price4, icon, blobColor }:ServiceBannerProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isMiniMotionHintOn, setIsMiniMotionHintOn] = useState(false)
    const miniMotionHintTimeoutRef = useRef<number | null>(null)

    useEffect(() => {
        return () => {
            if (miniMotionHintTimeoutRef.current !== null) {
                window.clearTimeout(miniMotionHintTimeoutRef.current)
            }
        }
    }, [])

    const triggerMiniMotionHint = () => {
        setIsMiniMotionHintOn(true)

        if (miniMotionHintTimeoutRef.current !== null) {
            window.clearTimeout(miniMotionHintTimeoutRef.current)
        }

        miniMotionHintTimeoutRef.current = window.setTimeout(() => {
            setIsMiniMotionHintOn(false)
            miniMotionHintTimeoutRef.current = null
        }, MINI_MOTION_HINT_DURATION_MS)
    }

    const handleExpand = () => {
        triggerMiniMotionHint()
        setIsExpanded(true)
    }

    const handleCollapse = () => {
        triggerMiniMotionHint()
        setIsExpanded(false)
    }

    const miniMotionClassName = `serviceCardMiniMotion${isMiniMotionHintOn ? ' serviceCardMiniMotion--animating' : ''}`

    /*
    const [connectorGeometry, setConnectorGeometry] = useState<ConnectorGeometry>(emptyConnectorGeometry)
    const serviceBannerRef = useRef<HTMLDivElement | null>(null)
    const serviceCardRef = useRef<HTMLDivElement | null>(null)
    const serviceCardMiniOneRef = useRef<HTMLDivElement | null>(null)
    const serviceCardMiniTwoRef = useRef<HTMLDivElement | null>(null)
    const serviceCardMiniThreeRef = useRef<HTMLDivElement | null>(null)
    */

    return(
        <LazyMotion features={domAnimation}>
        <m.div
            className='serviceBanner'
            onHoverStart={handleExpand}
            onHoverEnd={handleCollapse}
        >
            {/* РљРѕРЅРЅРµРєС‚РѕСЂС‹ РјРµР¶РґСѓ РєР°СЂС‚РѕС‡РєР°РјРё РѕС‚РєР»СЋС‡РµРЅС‹ */}
            {/* <div className={`serviceBannerConnectors${isExpanded && connectorGeometry.lines.length > 0 ? ' serviceBannerConnectorsVisible' : ''}`} aria-hidden='true'>
                <svg className='serviceBannerConnectorSvg' width={connectorGeometry.width} height={connectorGeometry.height}>
                    {connectorGeometry.lines.map((line, index) => (
                        <line
                            key={`${index}-${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
                            className='serviceBannerConnectorLine'
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                        />
                    ))}
                </svg>
            </div> */}
            <div className='serviceCardConnectorAnchor'>
                <ServiceCard 
                    title={title1}
                    subtitle={subtitle1}
                    price={price1}
                    icon={icon}
                    blobColor={blobColor}
                />
            </div>
            <m.div
                className={miniMotionClassName}
                variants={serviceCardMiniDropVariants}
                initial={false}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                custom={0}
            >
                <ServiceCardMini 
                    title={title2}
                    subtitle={subtitle2}
                    price={price2}
                />
            </m.div>
            <m.div
                className={miniMotionClassName}
                variants={serviceCardMiniDropVariants}
                initial={false}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                custom={1}
            >
                <ServiceCardMini 
                    title={title3}
                    subtitle={subtitle3}
                    price={price3}
                />
            </m.div>
            <m.div
                className={miniMotionClassName}
                variants={serviceCardMiniDropVariants}
                initial={false}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                custom={2}
            >
                <ServiceCardMini 
                    title={title4}
                    subtitle={subtitle4}
                    price={price4}
                />
            </m.div>
        </m.div>
        </LazyMotion>
    )
}

export default ServiceBanner;
