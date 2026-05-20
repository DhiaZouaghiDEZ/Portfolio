import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Experience from './components/sections/Experience';
import LoadingScreen from './components/ui/LoadingScreen';
import { useLoading } from './context/LoadingContext';

function App() {
    const { initialLoading } = useLoading();

    return (
        <>
            {initialLoading && <LoadingScreen />}
            <Header />
            <main style={{ paddingTop: '60px' }}>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
