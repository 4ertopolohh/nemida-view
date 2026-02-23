import { memo } from 'react'
import { Link } from 'react-router-dom';
import '../ServiceCardMini/ServiceCardMini.scss'

export type ServiceCardMiniProps = {
    title: string
    subtitle: string
    price: string
}

const ServiceCardMini = ({ title, subtitle, price }:ServiceCardMiniProps) => {

    return(
        <Link to={'/services'} className='serviceCardMini'>
            <div className='serviceCardMiniDescription'>
                <h6 className='serviceCardMiniTitle'>{title}</h6>
                <p className='serviceCardMiniSubtitle'>{subtitle}</p>
            </div>
            <h6 className='serviceCardMiniPrice'>{price}</h6>
        </Link>
    )
}

const MemoizedServiceCardMini = memo(ServiceCardMini)

MemoizedServiceCardMini.displayName = 'ServiceCardMini'

export default MemoizedServiceCardMini;
