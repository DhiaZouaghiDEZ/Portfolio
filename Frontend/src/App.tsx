import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
