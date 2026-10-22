
import { useState } from "react";
import "./App.css";

const menuGroups = [
  {
    label: "Trading",
    icon: "📈",
    items: ["Portfolio", "Options", "Risk Management"],
  },
  {
    label: "Accounts",
    icon: "▣",
    items: ["Trading Account", "Dealer Account", "Analyst Account"],
  },
  {
    label: "Tools",
    icon: "⚒",
    items: ["Activity", "Instruments", "Client Libraries"],
  },
  {
    label: "Settings",
    icon: "⚙",
    items: ["General", "Security", "My IPs"],
  },
];

const marketData = [
  { symbol: "NIFTY 50", price: "25,843.15", change: "+0.68%", positive: true },
  { symbol: "SENSEX", price: "84,426.34", change: "+0.51%", positive: true },
  { symbol: "BANK NIFTY", price: "58,210.80", change: "-0.24%", positive: false },
];

const menuIcons = {
  Portfolio: "▤",
  Options: "◇",
  "Risk Management": "◈",
  "Trading Account": "▣",
  "Dealer Account": "▤",
  "Analyst Account": "♙",
  Activity: "◷",
  Instruments: "⌁",
  "Client Libraries": "▧",
  General: "⚙",
  Security: "♙",
  "My IPs": "⌘",
};

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [expanded, setExpanded] = useState({
    Trading: true,
    Accounts: false,
    Tools: false,
    Settings: false,
  });
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const filteredMarkets = marketData.filter((market) =>
    market.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = (page) => {
    setActiveTab(page);
    setShowAccountMenu(false);
  };

  return (
    <div className={`app-shell ${darkMode ? "dark-mode" : "light-mode"}`}>
      <aside className="sidebar">
        <button className="brand" onClick={() => navigate("Overview")}>
          <span className="brand-mark">↗</span>
          <span>
            <strong>Trade<span className="brand-accent">Nexus</span></strong>
            <small>Trading & Investment Workspace</small>
          </span>
        </button>

        <div className="sidebar-heading">WORKSPACE</div>

        <nav className="sidebar-nav">
          {menuGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <button
                className={`nav-group-title ${
                  group.items.includes(activeTab) ? "group-active" : ""
                }`}
                onClick={() =>
                  setExpanded((previous) => ({
                    ...previous,
                    [group.label]: !previous[group.label],
                  }))
                }
                aria-expanded={expanded[group.label]}
              >
                <span className="nav-icon">{group.icon}</span>
                <span>{group.label}</span>
                <span className={`chevron ${expanded[group.label] ? "open" : ""}`}>
                  ›
                </span>
              </button>

              {expanded[group.label] && (
                <div className="submenu">
                  {group.items.map((item) => (
                    <button
                      key={item}
                      className={`submenu-item ${
                        activeTab === item ? "active" : ""
                      }`}
                      onClick={() => navigate(item)}
                    >
                      <span className="submenu-icon">
                        {menuIcons[item]}
                      </span>
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="online-dot" />
          <div>
            <strong>Workspace active</strong>
            <small>Demo environment</small>
          </div>
        </div>

        <button
          className="sidebar-logout"
          onClick={() => navigate("Logout")}
        >
          <span>⇥</span> Logout
        </button>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-brand">
            <span className="live-dot" />
            <span>MARKETS</span>
            <span className="demo-status">DEMO DATA</span>
          </div>

          <div className="topbar-right">
            <div className="account-wrapper">
              <button
                className="account-button"
                onClick={() => setShowAccountMenu((value) => !value)}
                aria-expanded={showAccountMenu}
              >
                <span className="avatar">SP</span>
                <span className="account-copy">
                  <strong>My Account</strong>
                  <small>Demo profile</small>
                </span>
                <span>⌄</span>
              </button>

              {showAccountMenu && (
                <div className="account-dropdown">
                  <button onClick={() => navigate("Account")}>
                    Account details
                  </button>
                  <button onClick={() => navigate("Profile")}>
                    My profile
                  </button>
                  <button onClick={() => navigate("Change Password")}>
                    Change password
                  </button>
                </div>
              )}
            </div>

            <button className="toolbar-action" onClick={() => navigate("Profile")}>
              <span>♙</span> Profile
            </button>

            <button
              className="toolbar-action"
              onClick={() => navigate("Change Password")}
            >
              <span>♧</span> Change Password
            </button>

            <button className="toolbar-action" onClick={() => navigate("Help")}>
              <span>ⓘ</span> Help
            </button>

            <button
              className="toolbar-action logout-action"
              onClick={() => navigate("Logout")}
            >
              <span>⏻</span> Logout
            </button>

            <button
              className="theme-toggle"
              onClick={() => setDarkMode((previous) => !previous)}
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
              title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? "☀" : "☾"}
            </button>
          </div>
        </header>

        <main className="main-content">
          <section className="hero-panel">
            <div className="hero-copy">
              <span className="eyebrow">YOUR FINANCIAL WORKSPACE</span>
              <h1>{activeTab}</h1>
              <p>
                Make smarter moves. Monitor your portfolio and explore
                your trading workspace.
              </p>
              <button className="primary-button" onClick={() => navigate("Markets")}>
                ↗ &nbsp; Explore Markets <span>→</span>
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <span className="hero-orbit orbit-one" />
              <span className="hero-orbit orbit-two" />
              <div className="hero-bars">
                {[30, 48, 37, 64, 45, 72, 56, 82, 68, 96, 76, 110].map(
                  (height, index) => (
                    <span
                      key={index}
                      className={index % 4 === 1 ? "bar down" : "bar up"}
                      style={{ height: `${height}px` }}
                    />
                  )
                )}
              </div>
              <div className="hero-quote">
                <span>TRADE WITH CLARITY</span>
                <strong>Better decisions.</strong>
                <strong>Bigger goals.</strong>
              </div>
            </div>
          </section>

          <section className="market-strip">
            <div className="strip-label">MARKETS</div>
            {marketData.map((market) => (
              <div className="market-strip-item" key={market.symbol}>
                <div>
                  <span className="market-name">{market.symbol}</span>
                  <strong className="financial-number">{market.price}</strong>
                </div>
                <span className={market.positive ? "positive" : "negative"}>
                  {market.positive ? "▲" : "▼"} {market.change}
                </span>
              </div>
            ))}
          </section>

          {activeTab === "Overview" ? (
            <>
              <section className="section-heading">
                <div>
                  <h2>Portfolio Snapshot</h2>
                  <p>A quick view of your demo trading account</p>
                </div>
                <span className="demo-pill">DEMO ACCOUNT⌄</span>
              </section>

              <section className="stats-grid">
                <article className="stat-card">
                  <div className="stat-card-top">
                    <span>Total Investment</span>
                    <span className="stat-icon blue-icon">₹</span>
                  </div>
                  <h3 className="financial-number">₹1,25,000.00</h3>
                  <span className="stat-caption">Illustrative invested amount</span>
                  <div className="mini-chart purple-chart">⌁⌁⌁⌁</div>
                </article>

                <article className="stat-card">
                  <div className="stat-card-top">
                    <span>Current Value</span>
                    <span className="stat-icon green-icon">↗</span>
                  </div>
                  <h3 className="financial-number">₹1,34,650.00</h3>
                  <span className="stat-caption">Illustrative market value</span>
                  <div className="mini-chart green-chart">⌁⌁⌁⌁</div>
                </article>

                <article className="stat-card">
                  <div className="stat-card-top">
                    <span>Total Returns</span>
                    <span className="stat-icon blue-icon">%</span>
                  </div>
                  <h3 className="financial-number positive">+₹9,650.00</h3>
                  <span className="return-caption">+7.72% overall return</span>
                  <div className="mini-chart blue-chart">⌁⌁⌁⌁</div>
                </article>

                <article className="stat-card">
                  <div className="stat-card-top">
                    <span>Open Positions</span>
                    <span className="stat-icon orange-icon">▤</span>
                  </div>
                  <h3 className="financial-number">08</h3>
                  <span className="stat-caption">Demo positions</span>
                  <div className="mini-chart orange-chart">⌁⌁⌁⌁</div>
                </article>
              </section>

              <section className="content-grid">
                <article className="panel market-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Market Watch</h2>
                      <p>Explore the sample market indices</p>
                    </div>
                    <button className="text-button" onClick={() => navigate("Markets")}>
                      View all →
                    </button>
                  </div>

                  <label className="search-box">
                    <span>⌕</span>
                    <input
                      type="search"
                      placeholder="Search indices..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </label>

                  <div className="market-table">
                    <div className="table-row table-header">
                      <span>INSTRUMENT</span>
                      <span>LAST PRICE</span>
                      <span>CHANGE</span>
                    </div>
                    {filteredMarkets.map((market) => (
                      <div className="table-row" key={market.symbol}>
                        <strong>{market.symbol}</strong>
                        <span className="financial-number">{market.price}</span>
                        <span className={market.positive ? "positive" : "negative"}>
                          {market.change}
                        </span>
                      </div>
                    ))}
                    {filteredMarkets.length === 0 && (
                      <p className="empty-state">No matching indices found.</p>
                    )}
                  </div>
                </article>

                <article className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Quick Actions</h2>
                      <p>Jump back into your workspace</p>
                    </div>
                  </div>
                  {[
                    ["▤", "Portfolio", "Review holdings and returns", "blue-icon"],
                    ["⇄", "Orders", "Explore sample order activity", "purple-icon"],
                    ["☆", "Watchlist", "Find instruments to follow", "green-icon"],
                  ].map(([icon, title, description, color]) => (
                    <button
                      className="action-item"
                      key={title}
                      onClick={() => navigate(title)}
                    >
                      <span className={`action-icon ${color}`}>{icon}</span>
                      <span>
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </span>
                      <span className="action-arrow">→</span>
                    </button>
                  ))}
                  <div className="info-note">
                    <span>ⓘ</span>
                    All figures are sample data, not live market prices.
                  </div>
                </article>
              </section>
            </>
          ) : (
            <section className="panel destination-panel">
              <span className="destination-icon">✦</span>
              <span className="eyebrow">TRADENEXUS WORKSPACE</span>
              <h2>{activeTab}</h2>
              <p>
                Your {activeTab.toLowerCase()} workspace is ready for the next
                development step. This page is currently a navigation
                placeholder; no real account action has been performed.
              </p>
              <button className="primary-button" onClick={() => navigate("Overview")}>
                ← Back to Overview
              </button>
            </section>
          )}

          <footer className="page-footer">
            <span>TradeNexus · Trading & Investment Workspace</span>
            <span>Demo data only · No live trading connected</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
