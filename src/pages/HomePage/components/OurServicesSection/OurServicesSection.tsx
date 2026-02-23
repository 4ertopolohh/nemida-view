import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import '../OurServicesSection/OurServicesSection.scss'

import keyIcon from '../../../../assets/images/icons/keyIcon.svg'
import hourIcon from '../../../../assets/images/icons/24hourIcon.svg'
import downloadIcon from '../../../../assets/images/icons/downloadIcon.svg'
import ServiceBanner from '../ServiceBanner/ServiceBanner';

const OurServicesSection = () => {
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [isContentVisible, setIsContentVisible] = useState(() => typeof IntersectionObserver === 'undefined')

    useEffect(() => {
        const element = contentRef.current
        if (!element) return

        if (typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry) return

                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setIsContentVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: [0.5] },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <section className='ourServicesSection'>
            <div className='container'>
                <SectionTitle title='Наши услуги' />
                <div
                    ref={contentRef}
                    className={`ourServicesContent${isContentVisible ? ' ourServicesContent--visible' : ''}`}
                >
                    <ServiceBanner 
                        title1='Сайт под ключ'
                        title2='Дизайн'
                        title3='Фронтенд'
                        title4='Бекенд'
                        subtitle1='Готовый сайт с нуля по вашим требованиям'
                        subtitle2='Создание дизайна вашего сайта'
                        subtitle3='Разработка видимого интерфейса'
                        subtitle4='Сервера, админ панель и т.д.'
                        price1='От 50 000 ₽'
                        price2='От 15 000 ₽'
                        price3='От 20 000 ₽'
                        price4='От 15 000 ₽'
                        icon={keyIcon}
                        blobColor='#b300ff'
                    />
                    <ServiceBanner 
                        title1='Сопровождение'
                        title2='Хостинг'
                        title3='Правки'
                        title4='Поддержка'
                        subtitle1='Хостинг, наполнение, правки, поддержка после релиза'
                        subtitle2='Размещение сайта на нашем сервере'
                        subtitle3='Добавление или изменение функционала'
                        subtitle4='Обслуживание после релиза'
                        price1='От 1 500 ₽'
                        price2='От 1 500 ₽'
                        price3='От 2 000 ₽'
                        price4='1 мес. бесплатно'
                        icon={hourIcon}
                        blobColor='#ff0000'
                    />
                    <ServiceBanner 
                        title1='Установка CRM'
                        title2='Настройка CRM'
                        title3='Интеграции'
                        title4='Автоматизация и обучение'
                        subtitle1='Установка открытой Django CRM, автоматизация продаж, контроль заявок'
                        subtitle2='Воронка продаж и карточки клиентов'
                        subtitle3='Интеграция сайта и каналов связи'
                        subtitle4='Автоматические задачи, обучение сотрудников'
                        price1='От 10 000 ₽'
                        price2='От 8 000 ₽'
                        price3='От 7 000 ₽'
                        price4='От 6 000 ₽'
                        icon={downloadIcon}
                        blobColor='#00ff99ff'
                    />
                </div>
            </div>
        </section>
    )
}

export default OurServicesSection;

