import ContactsButton from '../../../../components/ContactsButton/ContactsButton'
import '../WelcomeSectionLinks/WelcomeSectionLinks.scss'

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
        <div className='welcomeSectionLinks'>
            <ContactsButton width={178} fontSize={24} />
            <ul className='welcomeSectionLinksList'>
                {links.map(({ link, icon, alt }, index) => (
                    <li key={`${link}-${index}`} className='welcomeSectionLinksListItem'>
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
