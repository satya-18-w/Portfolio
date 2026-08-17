import React from 'react';

const SOCIALS = [
    { name: 'GitHub', icon: '🐙' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'Email', icon: '📧' },
];

export default function ContactPanel({ theme }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{
                fontFamily: theme.fontBody,
                fontSize: 14,
                color: theme.text,
                lineHeight: 1.7,
            }}>
                Signal received at Contact Tower. Reach out through any channel.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SOCIALS.map((s) => (
                    <div
                        key={s.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 16px',
                            background: theme.surface,
                            border: `1px solid ${theme.surfaceBorder}`,
                            borderRadius: 8,
                        }}
                    >
                        <span style={{ fontSize: 18 }}>{s.icon}</span>
                        <span style={{
                            fontFamily: theme.fontBody,
                            fontSize: 14,
                            color: theme.text,
                        }}>
                            {s.name}
                        </span>
                        <span style={{
                            marginLeft: 'auto',
                            fontFamily: theme.fontMono,
                            fontSize: 12,
                            color: theme.textMuted,
                        }}>
                            →
                        </span>
                    </div>
                ))}
            </div>

            {/* Contact form hint */}
            <div style={{
                background: theme.surface,
                border: `1px solid ${theme.surfaceBorder}`,
                borderRadius: 10,
                padding: 16,
            }}>
                <div style={{
                    fontFamily: theme.fontMono,
                    fontSize: 11,
                    color: theme.primary,
                    marginBottom: 8,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                }}>
                    Contact Form
                </div>
                <div style={{
                    fontFamily: theme.fontBody,
                    fontSize: 12,
                    color: theme.textMuted,
                    lineHeight: 1.5,
                }}>
                    Send a direct message through the portfolio contact section for collaborations and opportunities.
                </div>
            </div>

            <div style={{
                fontFamily: theme.fontMono,
                fontSize: 11,
                color: theme.textMuted,
                borderTop: `1px solid ${theme.surfaceBorder}`,
                paddingTop: 16,
                lineHeight: 1.6,
            }}>
                📡 Signal beams active — Contact Tower transmitting
            </div>
        </div>
    );
}
