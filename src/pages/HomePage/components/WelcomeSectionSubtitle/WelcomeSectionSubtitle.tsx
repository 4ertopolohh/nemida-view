import styles from '../WelcomeSectionSubtitle/WelcomeSectionSubtitle.module.scss'

export type WelcomeSectionSubtitleProps = {
    subtitle: string
}

const WelcomeSectionSubtitle = ({ subtitle }: WelcomeSectionSubtitleProps) => {
    return (
        <p className={styles.WelcomeSectionSubtitle}>{subtitle}</p>
    )
}

export default WelcomeSectionSubtitle;