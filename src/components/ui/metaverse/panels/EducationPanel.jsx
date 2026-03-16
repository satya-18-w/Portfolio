import React from 'react';

const MILESTONES = [
    {
        period: '2008–2018', title: 'School',
        desc: 'Foundation in logic, mathematics, and science. Early fascination with digital systems.',
        icon: '🌱',
    },
    {
        period: '2018–2020', title: 'Higher Secondary',
        desc: 'Science and Mathematics track. Analytical thinking and problem-solving foundations.',
        icon: '⚗',
    },
    {
        period: '2020–2024', title: 'IIIT Bhubaneswar',
        desc: 'B.Tech in Computer Science. Systems programming, distributed computing, and AI/ML.',
        icon: '🎓',
    },
    {
        period: '2023–2024', title: 'Machine Learning Projects',
        desc: 'Uber demand prediction, recommendation systems, and applied deep learning research.',
        icon: '🤖',
    },
    {
        period: '2024–Present', title: 'Backend Engineering',
        desc: 'Production backend systems, microservices, cloud infrastructure, and real-time pipelines.',
        icon: '🚀',
    },
];

export default function EducationPanel({ theme }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {MILESTONES.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 14 }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 20,
                        flexShrink: 0,
                    }}>
                        <div style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: theme.primary,
                            boxShadow: `0 0 8px ${theme.primary}60`,
                            marginTop: 4,
                        }} />
                        {i < MILESTONES.length - 1 && (
                            <div style={{
                                width: 1,
                                flex: 1,
                                background: `${theme.primary}30`,
                                marginTop: 4,
                            }} />
                        )}
                    </div>
                    <div style={{ paddingBottom: 16 }}>
                        <div style={{
                            fontFamily: theme.fontMono,
                            fontSize: 10,
                            color: theme.textMuted,
                            letterSpacing: 1.5,
                            marginBottom: 2,
                        }}>
                            {m.icon} {m.period}
                        </div>
                        <div style={{
                            fontFamily: theme.fontHeading,
                            fontSize: 15,
                            fontWeight: 700,
                            color: theme.text,
                            marginBottom: 4,
                        }}>
                            {m.title}
                        </div>
                        <div style={{
                            fontFamily: theme.fontBody,
                            fontSize: 12,
                            color: theme.textMuted,
                            lineHeight: 1.5,
                        }}>
                            {m.desc}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
