import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import '../OurServicesSection/OurServicesSection.scss'
import ServiceCard from '../ServiceCard/ServiceCard';

import keyIcon from '../../../../assets/images/icons/keyIcon.svg'
import hourIcon from '../../../../assets/images/icons/24hourIcon.svg'
import downloadIcon from '../../../../assets/images/icons/downloadIcon.svg'
import articlesBackground from '../../../../assets/images/pictures/articlesBackground.png'
import faqBackground from '../../../../assets/images/pictures/faqBackground.png'

const OurServicesSection = () => {
    return (
        <section className='ourServicesSection'>
            <div className='container'>
                <SectionTitle title='Наши услуги' />
                <div className='ourServicesContent'>
                    <ServiceCard
                        title='Сайт под ключ'
                        icon={keyIcon}
                        subtitle='Полностью готовый сайт по вашим требованиям'
                        price='От 50 000 ₽'
                        background={faqBackground}
                    />
                    <ServiceCard
                        title='Обслуживание'
                        icon={hourIcon}
                        subtitle='Хостинг, наполнение, правки, поддержка после релиза'
                        price='От 1 000 ₽'
                        background={articlesBackground}
                    />
                    <ServiceCard
                        title='Установка CRM'
                        icon={downloadIcon}
                        subtitle='Крупная и открытая CRM система на Django'
                        price='От 10 000 ₽'
                        background={faqBackground}
                    />
                </div>
            </div>
        </section>
    )
}

export default OurServicesSection;