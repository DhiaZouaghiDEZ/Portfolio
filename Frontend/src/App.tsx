import { useEffect, useRef } from 'react';

function App() {
    const contactForm = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
        const onAnchorClick = (event: Event) => {
            const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute('href')?.slice(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            targetElement?.scrollIntoView({ behavior: 'smooth' });
        };

        anchors.forEach((anchor) => anchor.addEventListener('click', onAnchorClick));

        const form = contactForm.current;
        const onSubmit = (event: Event) => {
            event.preventDefault();
            window.alert('Thank you for your message! I will get back to you soon.');
            form?.reset();
        };

        form?.addEventListener('submit', onSubmit);

        return () => {
            anchors.forEach((anchor) => anchor.removeEventListener('click', onAnchorClick));
            form?.removeEventListener('submit', onSubmit);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const targetElement = document.getElementById(sectionId);
        targetElement?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <header>
                <nav>
                    <div className="nav-container">
                        <h1 className="logo">John Doe</h1>
                        <ul className="nav-links">
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <a href="#projects">Projects</a>
                            </li>
                            <li>
                                <a href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                <section id="home" className="hero">
                    <div className="hero-content">
                        <h2>Hello, I'm John Doe</h2>
                        <p>Software Engineer passionate about creating innovative solutions.</p>
                        <button className="btn" type="button" onClick={() => scrollToSection('projects')}>
                            View My Work
                        </button>
                    </div>
                </section>

                <section id="about" className="about">
                    <div className="container">
                        <h2>About Me</h2>
                        <p>
                            I am a dedicated software engineer with experience in full-stack development, focusing on
                            building scalable and efficient applications. I enjoy working with modern technologies and
                            solving complex problems.
                        </p>
                        <div className="skills">
                            <h3>Skills</h3>
                            <ul>
                                <li>React</li>
                                <li>TypeScript</li>
                                <li>Node.js</li>
                                <li>Python</li>
                                <li>SQL</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="projects" className="projects">
                    <div className="container">
                        <h2>My Projects</h2>
                        <div className="project-grid">
                            <article className="project-card">
                                <h3>Project 1</h3>
                                <p>A web application built with React and Node.js.</p>
                                <button className="btn" type="button">
                                    View Project
                                </button>
                            </article>
                            <article className="project-card">
                                <h3>Project 2</h3>
                                <p>A data analysis tool using Python and modern frontend design.</p>
                                <button className="btn" type="button">
                                    View Project
                                </button>
                            </article>
                            <article className="project-card">
                                <h3>Project 3</h3>
                                <p>A responsive portfolio interface built using React.</p>
                                <button className="btn" type="button">
                                    View Project
                                </button>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact">
                    <div className="container">
                        <h2>Contact Me</h2>
                        <div className="contact-content">
                            <p>Feel free to reach out for collaborations or opportunities.</p>
                            <form className="contact-form" ref={contactForm}>
                                <input type="text" placeholder="Your Name" required />
                                <input type="email" placeholder="Your Email" required />
                                <textarea placeholder="Your Message" required />
                                <button className="btn" type="submit">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 John Doe. All rights reserved.</p>
            </footer>
        </>
    );
}

export default App;
