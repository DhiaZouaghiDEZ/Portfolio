import { useState } from 'react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
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
        <header style={styles.header}>
            <div style={styles.container}>
                <span style={styles.logo}>Dhiaeddine Zouaghi</span>

                <nav style={styles.nav}>
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            style={styles.navLink}
                            onClick={() => handleNavClick(link.href)}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button style={styles.resumeBtn}>Resume</button>
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
        display: 'flex',
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
        cursor: 'pointer',
        marginLeft: '8px',
    },
};

export default Header;
