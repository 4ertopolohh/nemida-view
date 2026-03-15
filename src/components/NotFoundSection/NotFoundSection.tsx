import styles from '../NotFoundSection/NotFoundSection.module.scss'
import OnHomeButton from '../OnHomeButton/OnHomeButton';

const NotFoundSection = () => {
    return (
        <section className={styles.notFoundSection}>
            <div className={`container ${styles.container}`}>
                <h1 className={styles.notFoundTitle}>404</h1>
                <p className={styles.notFoundSubtitle}>Страница не найдена</p>
                <OnHomeButton />
            </div>
        </section>
    )
}

export default NotFoundSection;