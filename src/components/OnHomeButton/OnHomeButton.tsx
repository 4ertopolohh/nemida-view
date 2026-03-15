import { Link } from 'react-router-dom'
import styles from '../OnHomeButton/OnHomeButton.module.scss'

const OnHomeButton = () => {
    return (
        <Link to='/' className={styles.onHomeButton}>
            <span>На главную</span>
        </Link>
    )
}

export default OnHomeButton;
