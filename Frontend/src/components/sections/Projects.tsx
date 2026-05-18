// Placeholder data - will be replaced with API data later
const projectsData = [
    {
        title: 'Personal Portfolio Application',
        description:
            'Full-stack portfolio site built from scratch to demonstrate production-grade architecture and DevOps practices. Clean Architecture .NET 10 API, React frontend, containerized with Docker and deployed to Azure Kubernetes Service.',
        techStack: [
            '.NET 10',
            'React',
            'TypeScript',
            'SQL Server',
            'Docker',
            'Kubernetes',
            'Azure',
        ],
        githubUrl: 'https://github.com/DhiaZouaghiDEZ',
        liveUrl: null,
        featured: true,
        status: 'In Progress',
    },
];

// Icon components - simple SVG icons inline to avoid installing packages
function GitHubIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

function Projects() {
    return (
        <section id="projects" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Projects</p>
                <h2 style={styles.sectionTitle}>What I've built</h2>

                <div style={styles.grid}>
                    {projectsData.map((project, index) => (
                        <div key={index} style={styles.card}>
                            {/* Card top row - status badge and links */}
                            <div style={styles.cardTop}>
                                <span
                                    style={{
                                        ...styles.statusBadge,
                                        background:
                                            project.status === 'In Progress'
                                                ? 'rgba(99, 102, 241, 0.1)'
                                                : 'rgba(34, 197, 94, 0.1)',
                                        color:
                                            project.status === 'In Progress'
                                                ? '#6366f1'
                                                : '#22c55e',
                                        borderColor:
                                            project.status === 'In Progress'
                                                ? 'rgba(99, 102, 241, 0.4)'
                                                : 'rgba(34, 197, 94, 0.4)',
                                    }}
                                >
                                    {project.status}
                                </span>

                                <div style={styles.links}>
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={styles.iconLink}
                                        >
                                            <GitHubIcon />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={styles.iconLink}
                                        >
                                            <ExternalLinkIcon />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Title and description */}
                            <h3 style={styles.projectTitle}>{project.title}</h3>
                            <p style={styles.projectDescription}>{project.description}</p>

                            {/* Tech stack badges */}
                            <div style={styles.techRow}>
                                {project.techStack.map((tech) => (
                                    <span key={tech} style={styles.techBadge}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        padding: '100px 0',
        borderBottom: '0.5px solid #2a2a3a',
    },
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
    },
    sectionLabel: {
        fontSize: '11px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        marginBottom: '12px',
    },
    sectionTitle: {
        fontSize: '28px',
        fontWeight: '500',
        color: '#e2e8f0',
        marginBottom: '48px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '16px',
    },
    card: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '28px',
    },
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    statusBadge: {
        fontSize: '11px',
        padding: '3px 10px',
        borderRadius: '20px',
        border: '0.5px solid',
    },
    links: {
        display: 'flex',
        gap: '12px',
    },
    iconLink: {
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s',
    },
    projectTitle: {
        fontSize: '17px',
        fontWeight: '500',
        color: '#e2e8f0',
        marginBottom: '10px',
    },
    projectDescription: {
        fontSize: '14px',
        color: '#94a3b8',
        lineHeight: '1.8',
        marginBottom: '20px',
    },
    techRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        paddingTop: '16px',
        borderTop: '0.5px solid #2a2a3a',
    },
    techBadge: {
        fontSize: '11px',
        color: '#6366f1',
        background: 'rgba(99, 102, 241, 0.1)',
        border: '0.5px solid rgba(99, 102, 241, 0.4)',
        padding: '3px 10px',
        borderRadius: '20px',
    },
};

export default Projects;
