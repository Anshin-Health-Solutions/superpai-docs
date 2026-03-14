import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const stats = [
  {number: '50', label: 'Commands'},
  {number: '80+', label: 'Skills'},
  {number: '16', label: 'Agents'},
  {number: '20', label: 'Hooks'},
  {number: '24', label: 'MCP Tools'},
  {number: '42', label: 'Steering Rules'},
];

const whatsNew = [
  'PAI Algorithm: Ideal State Criteria (ISC) for goal-anchored development',
  'Agent Teams: parallel multi-agent workflows with team coordination',
  'PostgreSQL Tier 3: remote database for cross-machine session sync',
  'GUI Installer: one-click Windows installer (v4.8.0-setup.exe)',
  'Worktree Commands: /worktree for git worktree management',
  'MCP Router: intelligent skill-based routing for MCP tool calls',
];

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="SuperPAI+ Documentation"
      description="The AI-native Claude Code plugin for professional development teams.">
      {/* Hero */}
      <header className="hero hero--anshin">
        <div className="container" style={{textAlign: 'center'}}>
          <Heading as="h1" className="hero__title">
            SuperPAI+ Documentation
          </Heading>
          <p className="hero__subtitle">
            The AI-native Claude Code plugin that transforms your development workflow
            with 50 commands, 80+ skills, and 16 specialized agents.
          </p>
          <div style={{marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/whats-new">
              What's New in v4.8.0
            </Link>
            <Link
              className="button button--outline button--lg"
              style={{color: '#fff', borderColor: '#fff'}}
              to="/docs/user-guide/intro">
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

        {/* Quick Links */}
        <section style={{padding: '4rem 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <Heading as="h2">Documentation Sections</Heading>
              <p style={{opacity: 0.7, maxWidth: 600, margin: '0 auto'}}>
                Everything you need to install, configure, and master SuperPAI+.
              </p>
            </div>
            <div className="row">
              {[
                {title: 'User Guide', desc: 'Learn the commands, skills, agents, and adaptive depth system.', link: '/docs/user-guide/intro', badge: 'Start Here'},
                {title: 'Installation', desc: 'Install the GUI app or deploy the server for team use.', link: '/docs/implementation/installation', badge: 'v4.8.0'},
                {title: 'Architecture', desc: 'Understand the plugin, MCP server, hooks, and database tiers.', link: '/docs/architecture/overview', badge: 'Deep Dive'},
                {title: 'IDE Integration', desc: 'Connect Claude Code, VS Code, Cursor, Windsurf, and Warp.', link: '/docs/ide-integration/overview', badge: 'IDEs'},
              ].map(card => (
                <div className="col col--3" key={card.title}>
                  <div className="product-card" style={{height: '100%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem'}}>
                      <Heading as="h3" style={{margin: 0}}>{card.title}</Heading>
                      <span style={{background: 'var(--ifm-color-primary)', color: '#fff', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600}}>{card.badge}</span>
                    </div>
                    <p style={{fontSize: '0.95rem', opacity: 0.85, marginBottom: '1.5rem'}}>{card.desc}</p>
                    <Link className="button button--primary button--sm" to={card.link}>Read Docs</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's New */}
        <section style={{padding: '4rem 0', background: 'var(--anshin-surface)'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <Heading as="h2">What's New in v4.8.0</Heading>
              <p style={{opacity: 0.7}}>
                The latest release brings agent teams, PAI algorithm, and a GUI installer.
              </p>
            </div>
            <div className="row" style={{maxWidth: 800, margin: '0 auto'}}>
              <div className="col col--12">
                <ul style={{listStyle: 'none', padding: 0}}>
                  {whatsNew.map((item, i) => (
                    <li key={i} style={{padding: '0.75rem 1rem', borderLeft: '3px solid var(--ifm-color-primary)', marginBottom: '0.75rem', background: 'var(--anshin-card-bg)', borderRadius: '0 8px 8px 0'}}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <Link className="button button--primary button--md" to="/docs/whats-new">
                View Full Release Notes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
