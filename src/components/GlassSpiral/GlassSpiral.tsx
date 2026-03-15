import styles from '../GlassSpiral/GlassSpiral.module.scss'
import type { CSSProperties } from 'react'

export type GlassSpiralProps = {
    image: string
    width: number
    height: number
    rotation: number
}

const GlassSpiral = ({ image, width, height, rotation }:GlassSpiralProps) => {

    const spiralStyles: CSSProperties = {
        width,
        height,
        transform: `rotate(${rotation}deg)`,
    }

    return(
        <img className={styles.glassSprial} loading='lazy' src={image} style={spiralStyles}/>
    )
}

export default GlassSpiral;
