import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import ServiceCard, { type ServiceCardProps } from '../../../../components/ServiceCard/ServiceCard'
import styles from '../OurServicesSection/OurServicesSection.module.scss'

import glassSpiral3 from '../../../../assets/images/pictures/glassSpiral3.png'
import glassSpiral4 from '../../../../assets/images/pictures/glassSpiral4.png'
import glassSpiral5 from '../../../../assets/images/pictures/glassSpiral5.png'
import glassSpiral6 from '../../../../assets/images/pictures/glassSpiral6.png'

const SERVICE_CARDS: ServiceCardProps[] = [
    {
        title: 'Многостраничный сайт',
        subtitle: 'Сайт из нескольких связанных между собой страниц, который презентует вашу компанию, студию, бренд и рассказывает об услугах.',
        price: 'От 80 000 ₽',
        backgroundColor: 'glass',
        blobColor: '#a704cb',
        image: glassSpiral3,
        imageWidth: 380,
        imageHeight: 176,
        textType: 'black',
        buttonWidth: '100%',
        buttonColor: '#fff',
        buttonHeight: 43,
        cardWidth: 387,
        cardHeight: 453,
        arrowType: 'horizontal',
    },
    {
        title: 'Лендинг',
        subtitle: 'Одностраничный сайт, который создается для конкретной цели.',
        price: 'От 40 000 ₽',
        backgroundColor: '#F4FF76',
        image: glassSpiral4,
        imageWidth: 217,
        imageHeight: 109,
        textType: 'white',
        buttonWidth: '100%',
        buttonColor: '#000',
        buttonHeight: 43,
        cardWidth: 217,
        cardHeight: 453,
        arrowType: 'vertical',
    },
    {
        title: 'Интернет магазин',
        subtitle: 'Удобный инструмент с каталогом, корзиной и оплатой на сайте.',
        price: 'От 90 000 ₽',
        backgroundColor: '#ECECEC',
        image: glassSpiral5,
        imageWidth: 217,
        imageHeight: 109,
        textType: 'white',
        buttonWidth: '100%',
        buttonColor: '#000',
        buttonHeight: 43,
        cardWidth: 217,
        cardHeight: 453,
        arrowType: 'vertical',
    },
    {
        title: 'Корпора-тивный сайт ',
        subtitle: 'Сайт компании, рассказывающий о ней, ее услугах и деятельности.',
        price: 'От 99 000 ₽',
        backgroundColor: '#F4FF76',
        image: glassSpiral6,
        imageWidth: 217,
        imageHeight: 109,
        textType: 'white',
        buttonWidth: '100%',
        buttonColor: '#000',
        buttonHeight: 43,
        cardWidth: 217,
        cardHeight: 453,
        arrowType: 'vertical',
    },
]

const OurServicesSection = () => {
    const cardRefs = useRef<Array<HTMLDivElement | null>>([])
    const [visibleCards, setVisibleCards] = useState<boolean[]>(() => {
        const visibleByDefault = typeof IntersectionObserver === 'undefined'
        return Array.from({ length: SERVICE_CARDS.length }, () => visibleByDefault)
    })

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || entry.intersectionRatio < 0.3) return

                    const target = entry.target as HTMLDivElement
                    const cardIndex = Number(target.dataset.cardIndex)
                    if (Number.isNaN(cardIndex)) return

                    setVisibleCards((prev) => {
                        if (prev[cardIndex]) return prev

                        const next = [...prev]
                        next[cardIndex] = true
                        return next
                    })

                    observer.unobserve(entry.target)
                })
            },
            { threshold: [0.5] },
        )

        cardRefs.current.forEach((cardElement) => {
            if (cardElement) observer.observe(cardElement)
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    return(
        <section className={styles.ourServicesSection}>
            <div className={`container ${styles.container}`}>
                <SectionTitle text='наши услуги'/>
                <div className={styles.ourServicesContent}>
                    {SERVICE_CARDS.map((serviceCard, index) => (
                        <div
                            key={`${serviceCard.title}-${index}`}
                            ref={(element) => {
                                cardRefs.current[index] = element
                            }}
                            data-card-index={index}
                            className={`${styles.serviceCardReveal}${visibleCards[index] ? ` ${styles.serviceCardRevealVisible}` : ''}`}
                            style={{ transitionDelay: `${index * 120}ms` }}
                        >
                            <ServiceCard {...serviceCard} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OurServicesSection
