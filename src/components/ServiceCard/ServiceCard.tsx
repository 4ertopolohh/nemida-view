import { type CSSProperties, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../ServiceCard/ServiceCard.module.scss'
import SuitsMeButton from '../SuitsMeButton/SuitsMeButton';

import serviceArrowType1 from '../../assets/images/pictures/serviceArrowType1.png'
import serviceArrowType2 from '../../assets/images/pictures/serviceArrowType2.png'

type ServiceCardTextType = 'white' | 'black';

type ServiceCardStyle = CSSProperties & {
    [customProperty: `--${string}`]: string | undefined
}

const BLOB_WIDTH = 260
const BLOB_HEIGHT = 180
const BLOB_KEYFRAME_POINTS = 7
const BLOB_ANIMATION_DURATION_SECONDS = 20
const DEFAULT_BLOB_COLOR = '#50FFA0'
const FALLBACK_BLOB_RGB = '80, 255, 160'

function getSeed(source: string): number {
    return source.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0)
}

function getDeterministicInt(seed: number, index: number, min: number, max: number): number {
    const value = Math.abs(Math.sin(seed * 0.013 + index * 12.9898) * 43758.5453)
    const fraction = value - Math.floor(value)
    return Math.round(min + fraction * (max - min))
}

function toRgbFromHex(color: string): string | null {
    const normalized = color.trim()
    const shortHexMatch = /^#([a-fA-F0-9]{3})$/.exec(normalized)
    const fullHexMatch = /^#([a-fA-F0-9]{6})$/.exec(normalized)

    let hexValue: string | null = null

    if (shortHexMatch) {
        hexValue = shortHexMatch[1].split('').map((char) => `${char}${char}`).join('')
    } else if (fullHexMatch) {
        hexValue = fullHexMatch[1]
    }

    if (!hexValue) {
        return null
    }

    const r = Number.parseInt(hexValue.slice(0, 2), 16)
    const g = Number.parseInt(hexValue.slice(2, 4), 16)
    const b = Number.parseInt(hexValue.slice(4, 6), 16)

    return `${r}, ${g}, ${b}`
}

export type ServiceCardProps = {
    image: string
    imageWidth: number | string
    imageHeight: number | string
    cardWidth: number
    cardHeight: number
    backgroundColor: string
    buttonColor: string
    arrowType: string
    title: string
    subtitle: string
    price: string
    textType: ServiceCardTextType
    buttonWidth?: number | string
    buttonHeight?: number | string
    blobColor?: string
}

const ServiceCard = ({
    image,
    imageWidth,
    imageHeight,
    cardWidth,
    cardHeight,
    backgroundColor,
    buttonColor,
    arrowType,
    title,
    subtitle,
    price,
    textType,
    buttonWidth,
    buttonHeight,
    blobColor,
}: ServiceCardProps) => {
    const toCssSize = (size: number | string) =>
        typeof size === 'number' ? `${size}px` : size;
    const normalizedBackgroundColor = backgroundColor.trim().toLowerCase();
    const isGlassBackground = normalizedBackgroundColor === 'glass';
    const resolvedBlobColor = blobColor ?? DEFAULT_BLOB_COLOR

    const blobStyleVars = useMemo<ServiceCardStyle>(() => {
        if (!isGlassBackground) {
            return {}
        }

        const maxX = Math.max(0, Math.round(cardWidth / 2 - BLOB_WIDTH / 2))
        const maxY = Math.max(0, Math.round(cardHeight / 2 - BLOB_HEIGHT / 2))
        const blobRgb = toRgbFromHex(resolvedBlobColor) ?? FALLBACK_BLOB_RGB
        const seed = getSeed(`${title}-${resolvedBlobColor}-${cardWidth}-${cardHeight}-${subtitle}-${price}`)
        const styleVars: ServiceCardStyle = {
            '--blob-rgb': blobRgb,
            '--blob-dur': `${BLOB_ANIMATION_DURATION_SECONDS}s`,
        }

        for (let pointIndex = 1; pointIndex <= BLOB_KEYFRAME_POINTS; pointIndex += 1) {
            const xKey = `--bx${pointIndex}` as `--${string}`
            const yKey = `--by${pointIndex}` as `--${string}`
            styleVars[xKey] = `${getDeterministicInt(seed, pointIndex * 2 - 1, -maxX, maxX)}px`
            styleVars[yKey] = `${getDeterministicInt(seed, pointIndex * 2, -maxY, maxY)}px`
        }

        return styleVars
    }, [cardHeight, cardWidth, isGlassBackground, price, resolvedBlobColor, subtitle, title])

    const arrowImage = arrowType === 'horizontal'
        ? serviceArrowType1
        : arrowType === 'vertical'
            ? serviceArrowType2
            : '';

    const isBlackTextType = textType === 'black';

    const titleColor = isBlackTextType ? '#fff' : '#000';
    const subtitleColor = isBlackTextType ? '#F2F2F2' : '#242424';
    const priceColor = isBlackTextType ? '#fff' : '#000';
    const buttonTextColor = isBlackTextType ? '#000' : '#fff';

    return (
        <Link
            to={'/services'}
            className={`${styles.serviceCard}${isGlassBackground ? ` ${styles.serviceCardGlass}` : ''}`}
            style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                backgroundColor: isGlassBackground ? undefined : backgroundColor,
                ...blobStyleVars,
            }}
        >
            {arrowImage && (
                <img
                    src={arrowImage}
                    alt=""
                    className={styles.serviceCardArrow}
                    loading='lazy'
                    data-arrow-type={arrowType}
                />
            )}
            <div className={styles.preview}>
                <img
                    src={image}
                    alt=""
                    loading='lazy'
                    className={styles.serviceCardImage}
                    style={{
                        width: toCssSize(imageWidth),
                        height: toCssSize(imageHeight),
                    }}
                />
            </div>
            <div className={styles.description}>
                <h3 className={styles.serviceCardTitle} style={{ color: titleColor }}>{title}</h3>
                <p className={styles.serviceCardSubtitle} style={{ color: subtitleColor }}>{subtitle}</p>
                <h4 className={styles.serviceCardPrice} style={{ color: priceColor }}>{price}</h4>
                <SuitsMeButton
                    backgroundColor={buttonColor}
                    textColor={buttonTextColor}
                    width={buttonWidth}
                    height={buttonHeight}
                />
            </div>
        </Link>
    )
}

export default ServiceCard;
