import ReactLogo3D from '../../../../components/ReactLogo3D/ReactLogo3D';
import styles from '../WelcomeSection/WelcomeSection.module.scss'
import WelcomeSectionLinks, { type WelcomeSectionLinkItem } from '../WelcomeSectionLinks/WelcomeSectionLinks';
import WelcomeSectionSubtitle from '../WelcomeSectionSubtitle/WelcomeSectionSubtitle';
import WelcomeSectionTitle from '../WelcomeSectionTitle/WelcomeSectionTitle';

import telegramIcon from '../../../../assets/images/icons/telegramIcon.svg'
import discordIcon from '../../../../assets/images/icons/discordIcon.svg'

const WelcomeSection = () => {
    const links: WelcomeSectionLinkItem[] = [
        {
            link: 'https://journal.top-academy.ru/ru/auth/login/index?returnUrl=%2Fru%2Fmain%2Fschedule%2Fpage%2Findex',
            icon: telegramIcon,
            alt: 'Telegram'
        },
        {
            link: 'https://journal.top-academy.ru/ru/auth/login/index?returnUrl=%2Fru%2Fmain%2Fschedule%2Fpage%2Findex',
            icon: discordIcon,
            alt: 'Discord'
        }
    ]

    return (
        <section className={styles.welcomeSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.welcomeSectionWrapper}>
                    <div className={styles.welcomeSectionDescription}>
                        <WelcomeSectionTitle />
                        <div className={styles.welcomeSectionDescriptionSubtitles}>
                            <WelcomeSectionSubtitle subtitle='Современные сайты под ключ с продуманным кодом и авторским дизайном. ' />
                            <WelcomeSectionSubtitle subtitle='Никаких шаблонов - только ваши требования. ' />
                        </div>
                        <WelcomeSectionLinks links={links} />
                    </div>
                    <ReactLogo3D renderOnView optimisation='on' />
                </div>
            </div>
        </section>
    )
}

export default WelcomeSection;
