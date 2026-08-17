import React from 'react';

const SKILLS = [
    { name: 'Go', category: 'Backend', icon: '⚡', level: 95 },
    { name: 'Python', category: 'Backend', icon: '🐍', level: 92 },
    { name: 'Node.js', category: 'Backend', icon: '⬢', level: 80 },
    { name: 'Docker', category: 'DevOps', icon: '🐳', level: 90 },
    { name: 'Jenkins', category: 'DevOps', icon: '🔧', level: 82 },
    { name: 'Kubernetes', category: 'DevOps', icon: '☸', level: 85 },
    { name: 'PostgreSQL', category: 'Data', icon: '🐘', level: 88 },
    { name: 'Redis', category: 'Data', icon: '🔴', level: 87 },
    { name: 'React', category: 'Frontend', icon: '⚛', level: 85 },
    { name: 'LangGraph', category: 'AI & ML', icon: '🔗', level: 80 },
    { name: 'TensorFlow', category: 'AI & ML', icon: '🔥', level: 82 },
];

const CATEGORIES = ['Backend', 'DevOps', 'Data', 'AI & ML', 'Frontend'];

export default function SkillsPanel({ theme }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CATEGORIES.map((cat) => {
                const skills = SKILLS.filter(s => s.category === cat);
                if (skills.length === 0) return null;
                return (
                    <div key={cat}>
                        <div style={{
                            fontFamily: theme.fontMono,
                            fontSize: 11,
                            color: theme.secondary,
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                            marginBottom: 10,
                        }}>
                            {cat}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {skills.map((s) => (
                                <div key={s.name} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                }}>
                                    <span style={{ fontSize: 14, width: 20 }}>{s.icon}</span>
                                    <span style={{
                                        fontFamily: theme.fontBody,
                                        fontSize: 13,
                                        color: theme.text,
                                        flex: 1,
                                    }}>
                                        {s.name}
                                    </span>
                                    <div style={{
                                        width: 80,
                                        height: 4,
                                        background: `${theme.primary}15`,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            width: `${s.level}%`,
                                            height: '100%',
                                            background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                                            borderRadius: 2,
                                        }} />
                                    </div>
                                    <span style={{
                                        fontFamily: theme.fontMono,
                                        fontSize: 10,
                                        color: theme.textMuted,
                                        width: 28,
                                        textAlign: 'right',
                                    }}>
                                        {s.level}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
