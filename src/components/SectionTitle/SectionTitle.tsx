import { useEffect, useRef, useState } from 'react'
import styles from '../SectionTitle/SectionTitle.module.scss'

export type SectionTitleProps = {
    text: string
}

const SectionTitle = ({ text }:SectionTitleProps) => {
    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined')

    useEffect(() => {
        const element = titleRef.current
        if (!element) return
        if (typeof IntersectionObserver === 'undefined') return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (!entry) return

                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setIsVisible(true)
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
        <h1
            ref={titleRef}
            className={`${styles.sectionTitle}${isVisible ? ` ${styles.sectionTitleVisible}` : ''}`}
        >
            {text}
        </h1>
    )
}

export default SectionTitle;
