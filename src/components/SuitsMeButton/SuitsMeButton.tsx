import styles from '../SuitsMeButton/SuitsMeButton.module.scss'

export type SuitsMeButtonProps = {
    backgroundColor?: string
    textColor?: string
    width?: number | string
    height?: number | string
}

const SuitsMeButton = ({ backgroundColor, textColor, width, height }: SuitsMeButtonProps) => {
    const normalizedButtonColor = backgroundColor?.replace(/\s+/g, '').toLowerCase();
    const isBlackButton = normalizedButtonColor === '#000' || normalizedButtonColor === '#000000';
    const arrowColor = isBlackButton ? '#fff' : '#000';
    const buttonClassName = isBlackButton
        ? `${styles.suitsMeButton} ${styles.blackButton}`
        : styles.suitsMeButton;

    return(
        <button
            className={buttonClassName}
            style={{
                backgroundColor,
                width,
                height,
            }}
        >
            <span className={styles.suitsMeButtonText} style={{ color: textColor }}>Мне подходит!</span>
            <span
                aria-hidden="true"
                className={styles.suitsMeButtonArrow}
                style={{ backgroundColor: arrowColor }}
            />
        </button>
    )
}

export default SuitsMeButton;
