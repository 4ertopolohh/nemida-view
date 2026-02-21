import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.scss'
import OurServicesSection from './components/OurServicesSection/OurServicesSection';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
    return (
        <main id='homePage'>
            <WelcomeSection />
            <OurServicesSection />
            <InDevSection title='Главная' />
        </main>
    )
}

export default HomePage;