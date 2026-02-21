import '../HeaderNav/HeaderNav.scss'
import HeaderNavItem, { type HeaderNavItemProps } from '../HeaderNavItem/HeaderNavItem'

export type HeaderNavListItem = HeaderNavItemProps

type HeaderNavProps = {
    headerNavTitles: HeaderNavListItem[]
}

const HeaderNav = ({ headerNavTitles }: HeaderNavProps) => {
    return (
        <nav className='headerNav'>
            <ul className='headerNavList'>
                {headerNavTitles.map((item) => (
                    <li key={item.title} className='headerNavListItem'>
                        <HeaderNavItem {...item} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default HeaderNav
