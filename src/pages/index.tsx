import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const products = [
  {
    title: 'SuperPAI+',
    description:
      'The personal AI infrastructure that transforms Claude Code into a full engineering platform with 73 skills, 47 commands, 16 agents, and 13 hooks.',
    link: '/superpai/user-guide/intro',
    badge: 'v3.7.0',
  },
  {
    title: 'Anna-Voice',
    description:
      'Native Windows TTS and STT application built with Rust. 21 production voices with sub-200ms latency. Real-time speech for AI agents.',
    link: '/anna-voice/intro',
    badge: 'v2.1',
  },
  {
    title: 'Orchestrate',
    description:
      'Healthcare workflow automation built on n8n with custom nodes for HIPAA-compliant data processing, multi-tenant isolation, and EHR integration.',
    link: '/orchestrate/intro',
    badge: 'Platform',
  },
];

const stats = [
  {number: '73', label: 'Skills'},
  {number: '47', label: 'Commands'},
  {number: '16', label: 'Agents'},
  {number: '13', label: 'Hooks'},
  {number: '24', label: 'MCP Tools'},
  {number: '21', label: 'Voices'},
];

const whatsNew = [
  'GSD Framework: /quick and /spec commands for spec-driven development',
  'Wave-Based Planning: break complex work into shipping waves with Mermaid diagrams',
  'Model Aliases: simple / smart / genius map to optimal models per task',
  'Atomic Commits: automatic conventional-commit messages after each task',
  'Steering Rules 40-42: new governance rules for identity, safety, and spec compliance',
  'Spec-Driven Skill: .planning/ directory for persistent specifications',
];

function ProductCard({
  title,
  description,
  link,
  badge,
}: {
  title: string;
  description: string;
  link: string;
  badge: string;
}) {
  return (
    <div className="col col--4">
      <div className="product-card" style={{height: '100%'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}>
          <Heading as="h3" style={{margin: 0}}>
            {title}
          </Heading>
          <span
            style={{
              background: 'var(--ifm-color-primary)',
              color: '#fff',
              padding: '2px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
            {badge}
          </span>
        </div>
        <p style={{fontSize: '0.95rem', opacity: 0.85, marginBottom: '1.5rem'}}>
          {description}
        </p>
        <Link
          className="button button--primary button--sm"
          to={link}>
          Read Docs
        </Link>
      </div>
    </div>
  );
}

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="Developer Platform"
      description="Anshin Technology Solutions developer documentation for SuperPAI+, Anna-Voice, and Orchestrate.">
      {/* Hero */}
      <header className="hero hero--anshin">
        <div className="container" style={{textAlign: 'center'}}>
          <Heading as="h1" className="hero__title">
            Anshin Technology Solutions
          </Heading>
          <p className="hero__subtitle">
            Developer documentation for SuperPAI+, Anna-Voice, Orchestrate, and
            the full Anshin AI ecosystem.
          </p>
          <div style={{marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link
              className="button button--secondary button--lg"
              to="/superpai/whats-new">
              What's New in v3.7.0
            </Link>
            <Link
              className="button button--outline button--lg"
              style={{color: '#fff', borderColor: '#fff'}}
              to="/superpai/user-guide/intro">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Stats */}
        <section style={{padding: '3rem 0', background: 'var(--anshin-surface)'}}>
          <div className="container">
            <div className="stats-bar">
              {stats.map(s => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Cards */}
        <section style={{padding: '4rem 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <Heading as="h2">Platform Products</Heading>
              <p style={{opacity: 0.7, maxWidth: 600, margin: '0 auto'}}>
                Three integrated products that form the Anshin AI engineering ecosystem.
              </p>
            </div>
            <div className="row">
              {products.map(p => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* What's New */}
        <section
          style={{
            padding: '4rem 0',
            background: 'var(--anshin-surface)',
          }}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <Heading as="h2">What's New in v3.7.0</Heading>
              <p style={{opacity: 0.7}}>
                The GSD release: spec-driven development, wave planning, and model aliases.
              </p>
            </div>
            <div
              className="row"
              style={{maxWidth: 800, margin: '0 auto'}}>
              <div className="col col--12">
                <ul style={{listStyle: 'none', padding: 0}}>
                  {whatsNew.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        padding: '0.75rem 1rem',
                        borderLeft: '3px solid var(--ifm-color-primary)',
                        marginBottom: '0.75rem',
                        background: 'var(--anshin-card-bg)',
                        borderRadius: '0 8px 8px 0',
                      }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <Link
                className="button button--primary button--md"
                to="/superpai/whats-new">
                View Full Release Notes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
