import { useState } from 'react'
import styles from '../ChangeLanguageButton/ChangeLanguageButton.module.scss'

const ChangeLanguageButton = () => {
    const [activeLanguage, setActiveLanguage] = useState<'en' | 'ru'>('en')

    const handleLanguageToggle = () => {
        setActiveLanguage((prev) => (prev === 'en' ? 'ru' : 'en'))
    }

    return (
        <button
            type='button'
            className={styles.changeLanguageButton}
            onClick={handleLanguageToggle}
        >
            <span className={activeLanguage === 'en' ? styles.changeLanguageActive : styles.changeLanguageInactive}>EN</span>
            <span id='changeLanguageSeparator'>|</span>
            <span className={activeLanguage === 'ru' ? styles.changeLanguageActive : styles.changeLanguageInactive}>RU</span>
        </button>
    )
}

export default ChangeLanguageButton;
