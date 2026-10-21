
import { useState } from "react";
import "./App.css";

const navigation = [
  { label: "Overview", icon: "◫" },
  { label: "Markets", icon: "⌁" },
  { label: "Portfolio", icon: "▤" },
  { label: "Orders", icon: "⇄" },
  { label: "Watchlist", icon: "☆" },
  { label: "Notifications", icon: "♧" },
];

const marketData = [
  { symbol: "NIFTY 50", price: "25,843.15", change: "+0.68%", positive: true },
  { symbol: "SENSEX", price: "84,426.34", change: "+0.51%", positive: true },
  { symbol: "BANK NIFTY", price: "58,210.80", change: "-0.24%", positive: false },
];

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  const filteredMarkets = marketData.filter((market) =>
    market.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span>Trade<span className="brand-accent">Vista</span></span>
        </div>

        <div className="topbar-center">
          <span className="market-status-dot" />
          <span>Markets</span>
          <span className="status-label">DEMO DATA</span>
        </div>

        <div className="topbar-right">
          <button className="icon-button" aria-label="Notifications">♧</button>
          <div className="avatar">SP</div>
          <div className="profile-label">
            <strong>My Account</strong>
            <span>Demo profile</span>
          </div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <span className="sidebar-heading">WORKSPACE</span>

          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <button
                key={item.label}
                className={`nav-item ${activeTab === item.label ? "active" : ""}`}
                onClick={() => setActiveTab(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.label === "Notifications" && (
                  <span className="nav-count">3</span>
                )}
              </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="market-open-indicator" />
            <div>
              <strong>Trading overview</strong>
              <span>Illustrative dashboard</span>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">YOUR FINANCIAL WORKSPACE</p>
              <h1>{activeTab}</h1>
              <p className="page-subtitle">
                Track the markets and explore your trading activity.
              </p>
            </div>
            <button
              className="primary-button"
              onClick={() => setActiveTab("Markets")}
            >
              <span>＋</span> Explore markets
            </button>
          </div>

          <section className="market-strip">
            {marketData.map((market) => (
              <div className="market-strip-item" key={market.symbol}>
                <span className="market-name">{market.symbol}</span>
                <strong className="financial-number">{market.price}</strong>
                <span className={market.positive ? "positive" : "negative"}>
                  {market.change}
                </span>
              </div>
            ))}
          </section>

          <section className="section-heading">
            <div>
              <h2>Portfolio snapshot</h2>
              <p>A quick view of your demo trading account</p>
            </div>
            <span className="demo-pill">DEMO ACCOUNT</span>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-card-top">
                <span>Total investment</span>
                <span className="stat-icon blue-icon">₹</span>
              </div>
              <h3 className="financial-number">₹1,25,000.00</h3>
              <span className="stat-caption">Illustrative invested amount</span>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span>Current value</span>
                <span className="stat-icon purple-icon">↗</span>
              </div>
              <h3 className="financial-number">₹1,34,650.00</h3>
              <span className="stat-caption">Illustrative market value</span>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span>Total returns</span>
                <span className="stat-icon green-icon">%</span>
              </div>
              <h3 className="financial-number positive">+₹9,650.00</h3>
              <span className="return-caption">+7.72% overall return</span>
            </article>

            <article className="stat-card">
              <div className="stat-card-top">
                <span>Open positions</span>
                <span className="stat-icon orange-icon">▤</span>
              </div>
              <h3 className="financial-number">08</h3>
              <span className="stat-caption">Demo positions</span>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel market-panel">
              <div className="panel-heading">
                <div>
                  <h2>Market watch</h2>
                  <p>Search the sample market indices</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setActiveTab("Markets")}
                >
                  View markets →
                </button>
              </div>

              <div className="search-box">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search indices..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

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
                  <h2>Quick actions</h2>
                  <p>Navigate your workspace</p>
                </div>
              </div>

              <button
                className="action-item"
                onClick={() => setActiveTab("Portfolio")}
              >
                <span className="action-icon blue-icon">▤</span>
                <span>
                  <strong>View portfolio</strong>
                  <small>Review holdings and returns</small>
                </span>
                <span className="action-arrow">→</span>
              </button>

              <button
                className="action-item"
                onClick={() => setActiveTab("Orders")}
              >
                <span className="action-icon purple-icon">⇄</span>
                <span>
                  <strong>Order history</strong>
                  <small>Explore sample order activity</small>
                </span>
                <span className="action-arrow">→</span>
              </button>

              <button
                className="action-item"
                onClick={() => setActiveTab("Watchlist")}
              >
                <span className="action-icon green-icon">☆</span>
                <span>
                  <strong>Manage watchlist</strong>
                  <small>Find instruments to follow</small>
                </span>
                <span className="action-arrow">→</span>
              </button>

              <div className="info-note">
                <span>ⓘ</span>
                All figures are sample data, not live market prices.
              </div>
            </article>
          </section>

          <footer className="page-footer">
            <span>TradeVista · Trading dashboard prototype</span>
            <span>Demo data only · No live trading connected</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
