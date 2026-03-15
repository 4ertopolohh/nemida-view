import styles from '../InDevSection/InDevSection.module.scss'
import OnHomeButton from '../OnHomeButton/OnHomeButton';

export type InDevSection = {
    title: string
}

const InDevSection = ({ title }: InDevSection) => {
    return (
        <section className={styles.inDevSection}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.inDevSectionTitle}>{title}</h1>
                <p className={styles.inDevSectionSubtitle}>Страница в разработке...</p>
                <OnHomeButton />
            </div>
        </section>
    )
}

export default InDevSection;