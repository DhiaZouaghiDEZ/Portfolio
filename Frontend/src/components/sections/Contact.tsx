import { useState } from 'react';

// Shape of the form data
interface ContactForm {
    name: string;
    email: string;
    subject: string;
    content: string;
}

// Initial empty state
const emptyForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    content: '',
};

function Contact() {
    const [form, setForm] = useState<ContactForm>(emptyForm);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    // Handles any input or textarea change and updates the right field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.subject || !form.content) return;

        setStatus('sending');

        // Placeholder - will be replaced with real API call later
        setTimeout(() => {
            setStatus('success');
            setForm(emptyForm);
        }, 1000);
    };

    return (
        <section id="contact" style={styles.section}>
            <div style={styles.container}>
                <p style={styles.sectionLabel}>Contact</p>
                <h2 style={styles.sectionTitle}>Get in touch</h2>
                <p style={styles.subtitle}>
                    Have an opportunity or just want to say hello? Fill out the form and I will get
                    back to you.
                </p>

                <div style={styles.card}>
                    {/* Row 1 - Name and Email side by side */}
                    <div style={styles.row}>
                        <div style={styles.fieldWrapper}>
                            <label style={styles.label}>Name</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={styles.fieldWrapper}>
                            <label style={styles.label}>Email</label>
                            <input
                                style={styles.input}
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Row 2 - Subject full width */}
                    <div style={styles.fieldWrapper}>
                        <label style={styles.label}>Subject</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="subject"
                            placeholder="What is this about?"
                            value={form.subject}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Row 3 - Message full width */}
                    <div style={styles.fieldWrapper}>
                        <label style={styles.label}>Message</label>
                        <textarea
                            style={styles.textarea}
                            name="content"
                            placeholder="Your message..."
                            value={form.content}
                            onChange={handleChange}
                            rows={5}
                        />
                    </div>

                    {/* Status messages */}
                    {status === 'success' && (
                        <p style={styles.successMsg}>Message sent! I will get back to you soon.</p>
                    )}
                    {status === 'error' && (
                        <p style={styles.errorMsg}>Something went wrong. Please try again.</p>
                    )}

                    <button
                        style={{
                            ...styles.submitBtn,
                            opacity: status === 'sending' ? 0.6 : 1,
                        }}
                        onClick={handleSubmit}
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Sending...' : 'Send message'}
                    </button>
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
        marginBottom: '12px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#94a3b8',
        marginBottom: '40px',
        lineHeight: '1.7',
    },
    card: {
        background: '#1a1a2e',
        border: '0.5px solid #2a2a3a',
        borderRadius: '12px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    fieldWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '12px',
        color: '#6366f1',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    input: {
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#e2e8f0',
        fontSize: '14px',
        outline: 'none',
        fontFamily: 'inherit',
    },
    textarea: {
        background: '#0f0f13',
        border: '0.5px solid #2a2a3a',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#e2e8f0',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        lineHeight: '1.7',
    },
    submitBtn: {
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        padding: '12px 28px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        alignSelf: 'flex-start',
        transition: 'opacity 0.2s',
    },
    successMsg: {
        fontSize: '13px',
        color: '#22c55e',
        background: 'rgba(34, 197, 94, 0.1)',
        border: '0.5px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '8px',
        padding: '10px 14px',
    },
    errorMsg: {
        fontSize: '13px',
        color: '#ef4444',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '0.5px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '10px 14px',
    },
};

export default Contact;
