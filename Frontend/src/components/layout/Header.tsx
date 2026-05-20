import { useState } from 'react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education & Certificates', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = (href: string) => {
        const target = document.getElementById(href.slice(1));
        target?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <header className={`site-header ${menuOpen ? 'menu-open' : ''}`} style={styles.header}>
            <div className="site-header__container" style={styles.container}>
                <span style={styles.logo}>Dhiaeddine Zouaghi</span>

                <button
                    className="mobile-menu-toggle"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    type="button"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`site-nav ${menuOpen ? 'open' : ''}`} style={styles.nav}>
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            className="nav-link"
                            style={styles.navLink}
                            onClick={() => handleNavClick(link.href)}
                        >
                            {link.label}
                        </button>
                    ))}
                    <a
                        className="resume-btn"
                        href="/Dhiaeddine_Zouaghi_Resume.pdf"
                        download="Dhiaeddine_Zouaghi_Resume.pdf"
                        style={styles.resumeBtn}
                    >
                        Resume
                    </a>
                </nav>
            </div>
        </header>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(15, 15, 19, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid #1e1e2e',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#6366f1',
        letterSpacing: '2px',
    },
    nav: {
        gap: '8px',
        alignItems: 'center',
    },
    navLink: {
        background: 'transparent',
        border: 'none',
        color: '#94a3b8',
        fontSize: '13px',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'color 0.2s',
    },
    resumeBtn: {
        background: 'transparent',
        border: '0.5px solid #6366f1',
        color: '#6366f1',
        fontSize: '13px',
        padding: '6px 16px',
        borderRadius: '6px',
        marginLeft: '8px',
        textDecoration: 'none',
        display: 'inline-block',
    },
};

export default Header;
