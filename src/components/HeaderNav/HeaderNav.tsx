import styles from '../HeaderNav/HeaderNav.module.scss'
import HeaderNavItem, { type HeaderNavItemProps } from '../HeaderNavItem/HeaderNavItem'

export type HeaderNavListItem = HeaderNavItemProps

type HeaderNavProps = {
    headerNavTitles: HeaderNavListItem[]
}

const HeaderNav = ({ headerNavTitles }: HeaderNavProps) => {
    return (
        <nav className={styles.headerNav}>
            <ul className={styles.headerNavList}>
                {headerNavTitles.map((item) => (
                    <li key={item.title} className={styles.headerNavListItem}>
                        <HeaderNavItem {...item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderNav
