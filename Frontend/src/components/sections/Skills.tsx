// Placeholder data pulled from your resume - will be replaced with API data later
import { useApi } from '../../hooks/useApi';
import { portfolioApi } from '../../services/portfolioservice';
import { Skill } from '../../types';

const primarySkills = [
    'C#',
    'TypeScript',
    '.NET Core',
    'Angular',
    'Azure Cloud',
    'Docker',
    'React',
];

function Skills() {
    const { data: skills, loading, error } = useApi<Skill[]>(portfolioApi.getSkills);

    // Group skills by category
    const grouped = skills?.reduce(
        (acc, skill) => {
            const category = skill.category ?? 'Other';
            if (!acc[category]) acc[category] = [];
            acc[category].push(skill);
            return acc;
        },
        {} as Record<string, Skill[]>
    );

    if (loading) return <div style={styles.state}>Loading...</div>;
    if (error || !grouped) return <div style={styles.state}>Failed to load skills.</div>;

    return (
        <section id="skills" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Skills</p>
                <h2 style={styles.sectionTitle}>What I work with</h2>

                <div style={styles.categoriesGrid}>
                    {Object.entries(grouped).map(([category, categorySkills]) => (
                        <div key={category} style={styles.categoryCard}>
                            <h3 style={styles.categoryTitle}>{category}</h3>
                            <div style={styles.badgesRow}>
                                {categorySkills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        style={
                                            primarySkills.includes(skill.name)
                                                ? styles.badgeAccent
                                                : styles.badge
                                        }
                                    >
                                        {skill.name}
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
    categoriesGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    categoryCard: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '20px',
    },
    categoryTitle: {
        fontSize: '12px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '14px',
        fontWeight: '500',
    },
    badgesRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    },
    badge: {
        fontSize: '12px',
        color: '#94a3b8',
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        padding: '4px 12px',
        borderRadius: '20px',
    },
    badgeAccent: {
        fontSize: '12px',
        color: '#6366f1',
        background: 'rgba(99, 102, 241, 0.1)',
        border: '0.5px solid rgba(99, 102, 241, 0.4)',
        padding: '4px 12px',
        borderRadius: '20px',
    },
};

export default Skills;
