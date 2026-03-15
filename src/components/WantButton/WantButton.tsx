import type { CSSProperties } from 'react'
import styles from '../WantButton/WantButton.module.scss'

export type WantButtonProps = {
    width?: CSSProperties['width']
    height?: CSSProperties['height']
}

const WantButton = ({ width, height }: WantButtonProps) => {
    const wantButtonStyles: CSSProperties = {
        width,
        height,
    }

    return(
        <button className={styles.wantButton} style={wantButtonStyles}>
            <span>
                ХОЧУ!
            </span>
        </button>
    )
}

export default WantButton;
