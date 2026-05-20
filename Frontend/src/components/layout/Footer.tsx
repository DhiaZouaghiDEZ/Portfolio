import { useApi } from '../../hooks/useApi';
import { portfolioApi } from '../../services/portfolioservice';
import { Profile, SocialLink } from '../../types';

// Map platform names to their SVG icons
function SocialIcon({ platform }: { platform: string }) {
    const p = platform.toLowerCase();

    if (p === 'github') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12C24 5.37 18.63 0 12 0z" />
            </svg>
        );
    }

    if (p === 'linkedin') {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
            </svg>
        );
    }

    // Fallback for any other platform - renders a generic link icon
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education & Certificates', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

function Footer() {
    const { data } = useApi<Profile[]>(portfolioApi.getProfile);
    const profile = data?.[0] ?? null;

    const handleNavClick = (href: string) => {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer style={styles.footer}>
            <div className="footer-container" style={styles.container}>
                {/* Left - name and title from API */}
                <div style={styles.left}>
                    <span style={styles.name}>{profile?.name ?? 'Dhiaeddine Zouaghi'}</span>
                    <span style={styles.tagline}>{profile?.title ?? 'Software Engineer'}</span>
                </div>

                {/* Center - nav links */}
                <nav className="footer-nav" style={styles.nav}>
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            style={styles.navLink}
                            onClick={() => handleNavClick(link.href)}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Right - dynamic social links from API */}
                <div className="footer-socials" style={styles.socials}>
                    {profile?.socialLinks?.map((link: SocialLink) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.iconLink}
                            title={link.platform}
                        >
                            <SocialIcon platform={link.platform} />
                        </a>
                    ))}
                </div>
            </div>

            <div style={styles.bottom}>
                <span>
                    Â© {new Date().getFullYear()} {profile?.name ?? 'Dhiaeddine Zouaghi'}. All rights
                    reserved.
                </span>
            </div>
        </footer>
    );
}

const styles: Record<string, React.CSSProperties> = {
    footer: {
        borderTop: '0.5px solid #1e1e2e',
        background: '#0a0a10',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '32px',
    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    name: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#e2e8f0',
    },
    tagline: {
        fontSize: '12px',
        color: '#94a3b8',
    },
    nav: {
        display: 'flex',
        gap: '4px',
    },
    navLink: {
        background: 'transparent',
        border: 'none',
        color: '#94a3b8',
        fontSize: '13px',
        padding: '6px 12px',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    socials: {
        display: 'flex',
        gap: '8px',
    },
    iconLink: {
        color: '#94a3b8',
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        borderTop: '0.5px solid #1e1e2e',
        padding: '16px 24px',
        textAlign: 'center' as const,
        fontSize: '12px',
        color: '#4a5568',
    },
};

export default Footer;

