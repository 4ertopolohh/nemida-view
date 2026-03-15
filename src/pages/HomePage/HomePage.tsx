import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.module.scss'
import AdSection from './components/AdSection/AdSection';
import OurServicesSection from './components/OurServicesSection/OurServicesSection';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
    return (
        <main id='homePage'>
            <WelcomeSection />
            <AdSection />
            <OurServicesSection />
            <InDevSection title='Главная' />
        </main>
    )
}

export default HomePage;