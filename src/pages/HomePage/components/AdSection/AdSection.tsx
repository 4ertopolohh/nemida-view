import { useEffect, useRef, useState } from 'react'
import styles from '../AdSection/AdSection.module.scss'

import glassSpiral1 from '../../../../assets/images/pictures/glassSpiral1.png'
import GlassSpiral from '../../../../components/GlassSpiral/GlassSpiral'
import WantButton from '../../../../components/WantButton/WantButton'

const AdSection = () => {
    const spiralsRef = useRef<HTMLDivElement | null>(null)
    const adSectionWrapperRef = useRef<HTMLDivElement | null>(null)
    const [isSpiralsVisible, setIsSpiralsVisible] = useState(() => typeof IntersectionObserver === 'undefined')
    const [isAdSectionWrapperVisible, setIsAdSectionWrapperVisible] = useState(() => typeof IntersectionObserver === 'undefined')

    useEffect(() => {
        const element = spiralsRef.current
        if (!element) return
        if (typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry) return

                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    setIsSpiralsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: [0.3] },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        const element = adSectionWrapperRef.current
        if (!element) return
        if (typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry) return

                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setIsAdSectionWrapperVisible(true)
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

    return(
        <section className={styles.adSection}>
            <div
                ref={spiralsRef}
                className={`${styles.spirals}${isSpiralsVisible ? ` ${styles.spiralsVisible}` : ''}`}
            >
                <GlassSpiral image={glassSpiral1} width={480} height={853} rotation={0}/>
                <GlassSpiral image={glassSpiral1} width={480} height={853} rotation={180}/>
            </div>
            <div
                ref={adSectionWrapperRef}
                className={`${styles.adSectionWrapper}${isAdSectionWrapperVisible ? ` ${styles.adSectionWrapperVisible}` : ''}`}
            >
                <div className={`container ${styles.container}`}>
                    <div className={styles.adSectionTitle}>
                        <h1>сайт - старт успеха</h1>
                    </div>
                    <div className={styles.adSectionDescription}>
                        <p className={styles.adSectionSubtitle}>
                            Хотите, чтобы ваш бизнес вышел на новый уровень? Мы создадим сайт, который станет мощным инструментом карьерного роста. Надёжная платформа, современный дизайн, продуманная структура и чистый код.
                        </p>
                        <WantButton width={'100%'} height={50}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdSection;
