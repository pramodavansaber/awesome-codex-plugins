"use client";

import { useState, useMemo } from "react";

const plugins = [
  { name: "Box", desc: "Access and manage files", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Cloudflare", desc: "Manage Workers, Pages, DNS, and infrastructure", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Figma", desc: "Inspect designs, extract specs, and document components", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "GitHub", desc: "Review changes, manage issues, and interact with repositories", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Gmail", desc: "Read, search, and compose emails", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Google Drive", desc: "Edit and manage files in Google Drive", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Hugging Face", desc: "Browse models, datasets, and spaces", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Linear", desc: "Create and manage issues, projects, and workflows", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Notion", desc: "Create and edit pages, databases, and content", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Sentry", desc: "Monitor errors, triage issues, and track performance", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Slack", desc: "Send messages, search channels, manage conversations", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Vercel", desc: "Deploy, preview, and manage Vercel projects", author: "OpenAI", url: "https://developers.openai.com/codex/plugins", official: true },
  { name: "Registry Broker", desc: "Delegate tasks to specialist AI agents via the HOL Registry", author: "HOL", authorUrl: "https://github.com/hashgraph-online", url: "https://github.com/hashgraph-online/registry-broker-codex-plugin", category: "Development & Workflow", official: false },
  { name: "Project Autopilot", desc: "Structured project workflow with planning, execution, and handoff", author: "AlexMi64", authorUrl: "https://github.com/AlexMi64", url: "https://github.com/AlexMi64/codex-project-autopilot", category: "Development & Workflow", official: false },
  { name: "Codex Reviewer", desc: "Second-pass review of Claude-driven plans and implementations", author: "schuettc", authorUrl: "https://github.com/schuettc", url: "https://github.com/schuettc/codex-reviewer", category: "Development & Workflow", official: false },
  { name: "HOTL Plugin", desc: "Human-on-the-Loop coding workflows with planning, review, and verification", author: "yimwoo", authorUrl: "https://github.com/yimwoo", url: "https://github.com/yimwoo/hotl-plugin", category: "Development & Workflow", official: false },
  { name: "AgentOps", desc: "DevOps layer for coding agents with flow, feedback, and persistent memory", author: "boshu2", authorUrl: "https://github.com/boshu2", url: "https://github.com/boshu2/agentops", category: "Development & Workflow", official: false },
  { name: "Codex Be Serious", desc: "Enforce formal, textbook-grade written register across all agent output", author: "lulucatdev", authorUrl: "https://github.com/lulucatdev", url: "https://github.com/lulucatdev/codex-be-serious", category: "Development & Workflow", official: false },
  { name: "Chrome DevTools", desc: "One-click Codex plugin wrapper for chrome-devtools-mcp", author: "win4r", authorUrl: "https://github.com/win4r", url: "https://github.com/win4r/chrome-devtools-codex-plugin", category: "Tools & Integrations", official: false },
  { name: "Launch Fast", desc: "Official Launch Fast plugin adapter for rapid SaaS deployment", author: "BlockchainHB", authorUrl: "https://github.com/BlockchainHB", url: "https://github.com/BlockchainHB/launchfast_codex_plugin", category: "Tools & Integrations", official: false },
  { name: "PapersFlow", desc: "Paper discovery, citation verification, graph exploration, and DeepScan", author: "papersflow-ai", authorUrl: "https://github.com/papersflow-ai", url: "https://github.com/papersflow-ai/papersflow-codex-plugin", category: "Tools & Integrations", official: false },
  { name: "Apple Productivity", desc: "Local Apple Calendar and Reminders tooling for macOS", author: "matk0shub", authorUrl: "https://github.com/matk0shub", url: "https://github.com/matk0shub/apple-productivity-mcp", category: "Tools & Integrations", official: false },
  { name: "Yandex Direct", desc: "Plugin bundle for Yandex Direct, Wordstat, Metrika, and Roistat", author: "nebelov", authorUrl: "https://github.com/nebelov", url: "https://github.com/nebelov/yandex-direct-for-all", category: "Tools & Integrations", official: false },
  { name: "OpenProject", desc: "Team collaboration via OpenProject integration", author: "varaprasadreddy9676", authorUrl: "https://github.com/varaprasadreddy9676", url: "https://github.com/varaprasadreddy9676/team-codex-plugins", category: "Tools & Integrations", official: false },
  { name: "OrgX", desc: "MCP access and initiative-aware skills for organizational workflows", author: "useorgx", authorUrl: "https://github.com/useorgx", url: "https://github.com/useorgx/orgx-codex-plugin", category: "Tools & Integrations", official: false },
  { name: "Codex Mem", desc: "Capture, compress, and inject session context back into future sessions", author: "2kDarki", authorUrl: "https://github.com/2kDarki", url: "https://github.com/2kDarki/codex-mem", category: "Tools & Integrations", official: false },
];

const officialPlugins = plugins.filter((p) => p.official);
const communityPlugins = plugins.filter((p) => !p.official);
const communityCategories = [...new Set(communityPlugins.map((p) => p.category || "Community"))];

function PluginCard({ plugin }) {
  return (
    <a href={plugin.url} className="plugin-card" target="_blank" rel="noopener noreferrer">
      <div className={`plugin-icon ${plugin.official ? "official" : "community"}`}>
        {plugin.official ? "⬡" : "◆"}
      </div>
      <div className="plugin-info">
        <div className="plugin-name">
          {plugin.name}
          <span className={`plugin-tag ${plugin.official ? "official" : "verified"}`}>
            {plugin.official ? "Official" : "Verified"}
          </span>
        </div>
        <div className="plugin-desc">{plugin.desc}</div>
        <div className="plugin-author">
          {plugin.authorUrl ? (
            <a href={plugin.authorUrl} onClick={(e) => e.stopPropagation()}>
              {plugin.author}
            </a>
          ) : (
            plugin.author
          )}
        </div>
      </div>
      <div className="plugin-arrow">→</div>
    </a>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredOfficial = useMemo(
    () => query ? officialPlugins.filter((p) => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)) : officialPlugins,
    [query]
  );

  const filteredCommunity = useMemo(
    () => query ? communityPlugins.filter((p) => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.author.toLowerCase().includes(query)) : communityPlugins,
    [query]
  );

  const hasResults = filteredOfficial.length > 0 || filteredCommunity.length > 0;

  return (
    <div className="container">
      <nav className="nav">
        <a href="/" className="nav-logo">
          ◇ <span>Codex Plugins</span>
        </a>
        <div className="nav-links">
          <a href="https://github.com/internet-dot/awesome-codex-plugins" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://github.com/internet-dot/awesome-codex-plugins/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Submit</a>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <div className="hero-sub">curated directory</div>
          <h1>Awesome <em>Codex Plugins</em></h1>
          <p>A curated list of OpenAI Codex plugins. All community entries verified with a valid .codex-plugin manifest.</p>
          <div className="hero-badges">
            <a href="https://github.com/internet-dot/awesome-codex-plugins" className="badge badge-primary" target="_blank" rel="noopener noreferrer">
              ⭐ Star on GitHub
            </a>
            <a href="https://github.com/internet-dot/awesome-codex-plugins/blob/main/CONTRIBUTING.md" className="badge badge-accent" target="_blank" rel="noopener noreferrer">
              + Submit a Plugin
            </a>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{officialPlugins.length}</div>
          <div className="stat-label">Official</div>
        </div>
        <div className="stat">
          <div className="stat-value">{communityPlugins.length}</div>
          <div className="stat-label">Community</div>
        </div>
        <div className="stat">
          <div className="stat-value">{plugins.length}</div>
          <div className="stat-label">Total</div>
        </div>
      </div>

      <div className="search-wrapper">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="search plugins..."
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          autoComplete="off"
        />
      </div>

      {filteredOfficial.length > 0 && (
        <div className="section">
          <div className="section-header">
            <div className="section-dot official" />
            <h2>Official Plugins</h2>
            <span className="section-count">{filteredOfficial.length}</span>
          </div>
          <div className="plugin-grid">
            {filteredOfficial.map((p) => <PluginCard key={p.name} plugin={p} />)}
          </div>
        </div>
      )}

      {filteredCommunity.length > 0 && (
        <div className="section">
          <div className="section-header">
            <div className="section-dot community" />
            <h2>Community Plugins</h2>
            <span className="section-count">{filteredCommunity.length}</span>
          </div>
          {communityCategories.map((cat) => {
            const catPlugins = (query ? filteredCommunity : communityPlugins).filter((p) => (p.category || "Community") === cat);
            if (catPlugins.length === 0) return null;
            return (
              <div key={cat}>
                <div className="category-label">{cat}</div>
                <div className="plugin-grid">
                  {catPlugins.map((p) => <PluginCard key={p.name} plugin={p} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="empty" style={{ display: hasResults ? "none" : "block" }}>
        No plugins found
      </div>

      <footer className="footer">
        <p>open source · <a href="https://opensource.org/licenses/Apache-2.0" target="_blank" rel="noopener noreferrer">Apache 2.0</a></p>
      </footer>
    </div>
  );
}
