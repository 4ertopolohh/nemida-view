import ContactsButton from '../../../../components/ContactsButton/ContactsButton'
import styles from '../WelcomeSectionLinks/WelcomeSectionLinks.module.scss'

export type WelcomeSectionLinkItem = {
    link: string
    icon: string
    alt?: string
}

export type WelcomeSectionLinksProps = {
    links: WelcomeSectionLinkItem[]
}

const WelcomeSectionLinks = ({ links }: WelcomeSectionLinksProps) => {
    return (
        <div className={styles.welcomeSectionLinks}>
            <ContactsButton text='ОБСУДИТЬ ПРОЕКТ' width={229} height={48}/>
            <ul className={styles.welcomeSectionLinksList}>
                {links.map(({ link, icon, alt }, index) => (
                    <li key={`${link}-${index}`} className={styles.welcomeSectionLinksListItem}>
                        <a href={link}>
                            <img src={icon} alt={alt ?? ''} loading='lazy' />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WelcomeSectionLinks;
