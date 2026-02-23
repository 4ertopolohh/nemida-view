import { memo, useMemo } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom';
import '../ServiceCard/ServiceCard.scss'

export type ServiceCardProps = {
    title: string
    icon: string
    subtitle: string
    price: string
    blobColor?: string
}

type ServiceCardStyle = CSSProperties & {
    ['--blob-rgb']?: string
    ['--blob-dur']?: string
    ['--bx1']?: string
    ['--by1']?: string
    ['--bx2']?: string
    ['--by2']?: string
    ['--bx3']?: string
    ['--by3']?: string
}

const CARD_WIDTH = 334
const CARD_HEIGHT = 348
const BLOB_WIDTH = 260
const BLOB_HEIGHT = 180

function getSeed(source: string): number {
    return source.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0)
}

function getDeterministicInt(seed: number, index: number, min: number, max: number): number {
    const value = Math.abs(Math.sin(seed * 0.013 + index * 12.9898) * 43758.5453)
    const fraction = value - Math.floor(value)
    return Math.round(min + fraction * (max - min))
}

const ServiceCard = ({ title, icon, subtitle, price, blobColor }: ServiceCardProps) => {
    const hasBlob = Boolean(blobColor)

    const styleVars = useMemo<ServiceCardStyle>(() => {
        if (!blobColor) {
            return {}
        }

        const maxX = Math.max(0, Math.round(CARD_WIDTH / 2 - BLOB_WIDTH / 2))
        const maxY = Math.max(0, Math.round(CARD_HEIGHT / 2 - BLOB_HEIGHT / 2))

        const hex = blobColor.replace('#', '')
        const r = Number.parseInt(hex.slice(0, 2), 16)
        const g = Number.parseInt(hex.slice(2, 4), 16)
        const b = Number.parseInt(hex.slice(4, 6), 16)

        const seed = getSeed(blobColor)
        const dur = getDeterministicInt(seed, 0, 8, 14)

        return {
            '--blob-rgb': `${r}, ${g}, ${b}`,
            '--blob-dur': `${dur}s`,
            '--bx1': `${getDeterministicInt(seed, 1, -maxX, maxX)}px`,
            '--by1': `${getDeterministicInt(seed, 2, -maxY, maxY)}px`,
            '--bx2': `${getDeterministicInt(seed, 3, -maxX, maxX)}px`,
            '--by2': `${getDeterministicInt(seed, 4, -maxY, maxY)}px`,
            '--bx3': `${getDeterministicInt(seed, 5, -maxX, maxX)}px`,
            '--by3': `${getDeterministicInt(seed, 6, -maxY, maxY)}px`,
        }
    }, [blobColor])

    return (
        <Link to={'/services'} className={`serviceCard${hasBlob ? ' withBlob' : ''}`} style={styleVars}>
            <div className='serviceCardDescription'>
                <div className='serviceCardHeader'>
                    <h5 className='serviceCardTitle'>{title}</h5>
                    <img src={icon} alt="" className='serviceCardIcon' loading='lazy' />
                </div>
                <p className='serviceCardSubtitle'>{subtitle}</p>
            </div>
            <h3 className='serviceCardPrice'>{price}</h3>
        </Link>
    )
}

const MemoizedServiceCard = memo(ServiceCard)

MemoizedServiceCard.displayName = 'ServiceCard'

export default MemoizedServiceCard;
