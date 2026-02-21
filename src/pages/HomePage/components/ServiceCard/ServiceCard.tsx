import { Link } from 'react-router-dom';
import '../ServiceCard/ServiceCard.scss'

export type ServiceCardProps = {
    title: string
    icon: string
    subtitle: string
    price: string
    background: string
}

const ServiceCard = ({ title, icon, subtitle, price, background }: ServiceCardProps) => {

    const ServiceCardStyles = {
        backgroundImage: `url(${background})`
    }

    return (
        <Link to={'/services'} className='serviceCard' style={ServiceCardStyles}>
            <div className='serviceCardDescription'>
                <div className='serviceCardHeader'>
                    <h5 className='serviceCardTitle'>{title}</h5>
                    <img src={icon} alt="" className='serviceCardIcon' loading='lazy' />
                </div>
                <p className='serviceCardSubtitle'>{subtitle}</p>
            </div>
            <h3 className='serviceCardPrice'>{price}</h3>
        </Link>
    )
}

export default ServiceCard;