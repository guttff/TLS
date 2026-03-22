import { useMemo, useState } from "react";

const tabs = [
  { id: "worldwide", label: "🌎 Worldwide" },
  { id: "florida", label: "🌴 Florida" },
  { id: "usa", label: "🇺🇸 USA" },
  { id: "cruises", label: "🚢 Cruises" },
  { id: "holiday", label: "🎉 Holiday Weekends" },
  { id: "meals", label: "🍱 Meal Planning" },
  { id: "final", label: "🎯 Final Decision" },
];

const worldwideCards = [
  "Paris: ~9h",
  "Rome: ~10h",
  "Tokyo: ~17h",
  "Bali: ~22h",
  "Caribbean: ~2h",
  "Brazil: ~8h",
];
const worldwideBudget = [
  ["Europe", "600–1200", "150–400", "1500–3500"],
  ["Asia", "900–1800", "80–300", "1800–4000"],
  ["Caribbean", "200–600", "120–350", "900–2500"],
  ["S. America", "400–900", "70–250", "1200–2800"],
];
const floridaDrives = [
  ["Miami", "30 mi", "45 min"],
  ["Orlando", "230 mi", "3.5 hr"],
  ["Key West", "190 mi", "4 hr"],
  ["Tampa", "270 mi", "4 hr"],
];
const usaBundles = [
  ["NYC", "$200–400", "$250", "$1200"],
  ["Vegas", "$250–500", "$200", "$1300"],
  ["LA", "$300–600", "$250", "$1500"],
];
const holidayTrips = [
  ["Memorial Day", "Bahamas", "$500"],
  ["July 4th", "Miami", "$600"],
  ["Labor Day", "NYC", "$800"],
];
const mealOptions = [
  ["Whole Foods", "$35", "4–5", "$7", "Healthy"],
  ["Costco", "$25", "5–6", "$5", "Bulk"],
  ["Publix", "$40", "4–6", "$6–8", "Variety"],
];
const finalChoices = [
  ["Cheapest Travel", "Florida"],
  ["Best Experience", "Europe"],
  ["Quick Escape", "Cruise"],
  ["No Cooking", "Costco Meals"],
];

const cruiseData = [
  {
    holiday: "Memorial Day",
    line: "Royal Caribbean",
    totalCost: 890,
    valueScore: 8.8,
    ship: "Freedom of the Seas",
    duration: "4 nights",
    port: "Miami",
    packageType: "Value",
    includes: "Meals, Wi‑Fi, Oceanview",
    bookingUrl: "https://www.royalcaribbean.com/",
  },
  {
    holiday: "July 4th",
    line: "Carnival",
    totalCost: 720,
    valueScore: 8.1,
    ship: "Carnival Sunrise",
    duration: "4 nights",
    port: "Miami",
    packageType: "Basic",
    includes: "Meals, Interior Cabin",
    bookingUrl: "https://www.carnival.com/",
  },
  {
    holiday: "Labor Day",
    line: "Norwegian",
    totalCost: 1140,
    valueScore: 9.0,
    ship: "Norwegian Sky",
    duration: "5 nights",
    port: "Ft Lauderdale",
    packageType: "Premium",
    includes: "Meals, Drinks, Wi‑Fi, Shore Credit",
    bookingUrl: "https://www.ncl.com/",
  },
  {
    holiday: "Thanksgiving",
    line: "MSC",
    totalCost: 960,
    valueScore: 8.6,
    ship: "MSC Seascape",
    duration: "5 nights",
    port: "Miami",
    packageType: "Value",
    includes: "Meals, Balcony Upgrade",
    bookingUrl: "https://www.msccruisesusa.com/",
  },
  {
    holiday: "Christmas",
    line: "Celebrity",
    totalCost: 1680,
    valueScore: 9.3,
    ship: "Celebrity Reflection",
    duration: "6 nights",
    port: "Ft Lauderdale",
    packageType: "Luxury",
    includes: "Premium Dining, Drinks, Wi‑Fi",
    bookingUrl: "https://www.celebritycruises.com/",
  },
  {
    holiday: "New Year",
    line: "Royal Caribbean",
    totalCost: 1790,
    valueScore: 9.4,
    ship: "Icon of the Seas",
    duration: "7 nights",
    port: "Miami",
    packageType: "Luxury",
    includes: "Meals, Shows, Waterpark Access",
    bookingUrl: "https://www.royalcaribbean.com/",
  },
  {
    holiday: "Memorial Day",
    line: "Carnival",
    totalCost: 540,
    valueScore: 7.8,
    ship: "Carnival Conquest",
    duration: "3 nights",
    port: "Miami",
    packageType: "Basic",
    includes: "Meals, Interior Cabin",
    bookingUrl: "https://www.carnival.com/",
  },
  {
    holiday: "Labor Day",
    line: "MSC",
    totalCost: 830,
    valueScore: 8.4,
    ship: "MSC Divina",
    duration: "4 nights",
    port: "Miami",
    packageType: "Value",
    includes: "Meals, Wi‑Fi, Balcony",
    bookingUrl: "https://www.msccruisesusa.com/",
  },
  {
    holiday: "Thanksgiving",
    line: "Norwegian",
    totalCost: 1360,
    valueScore: 9.1,
    ship: "Norwegian Escape",
    duration: "6 nights",
    port: "Miami",
    packageType: "Premium",
    includes: "Meals, Drinks, Excursion Credit",
    bookingUrl: "https://www.ncl.com/",
  },
  {
    holiday: "July 4th",
    line: "Celebrity",
    totalCost: 1290,
    valueScore: 9.2,
    ship: "Celebrity Silhouette",
    duration: "5 nights",
    port: "Ft Lauderdale",
    packageType: "Premium",
    includes: "Meals, Wi‑Fi, Drinks",
    bookingUrl: "https://www.celebritycruises.com/",
  },
];

function DataTable({ headers, rows, className = "" }) {
  return (
    <table className={className}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`${rowIndex}-${row[0]}`}>
            {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("worldwide");
  const [holidayFilter, setHolidayFilter] = useState("all");
  const [lineFilter, setLineFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [maxCostFilter, setMaxCostFilter] = useState(1800);
  const [pageSize, setPageSize] = useState(50);
  const [currentCruisePage, setCurrentCruisePage] = useState(1);

  const filteredCruises = useMemo(() => {
    return cruiseData.filter((cruise) => {
      const matchesHoliday =
        holidayFilter === "all" || cruise.holiday === holidayFilter;
      const matchesLine = lineFilter === "all" || cruise.line === lineFilter;
      const matchesPackage =
        packageFilter === "all" || cruise.packageType === packageFilter;
      const matchesCost = cruise.totalCost <= Number(maxCostFilter || 99999);
      return matchesHoliday && matchesLine && matchesPackage && matchesCost;
    });
  }, [holidayFilter, lineFilter, packageFilter, maxCostFilter]);

  const totalCruisePages = Math.max(
    1,
    Math.ceil(filteredCruises.length / pageSize),
  );
  const safeCruisePage = Math.min(currentCruisePage, totalCruisePages);
  const pagedCruises = useMemo(() => {
    const start = (safeCruisePage - 1) * pageSize;
    return filteredCruises.slice(start, start + pageSize);
  }, [filteredCruises, safeCruisePage, pageSize]);

  const cruiseStats = useMemo(() => {
    if (filteredCruises.length === 0) {
      return { count: 0, avgCost: "$0", minCost: "$0", bestValue: "—" };
    }
    const totalCost = filteredCruises.reduce(
      (sum, cruise) => sum + cruise.totalCost,
      0,
    );
    const minCost = Math.min(
      ...filteredCruises.map((cruise) => cruise.totalCost),
    );
    const bestValue = Math.max(
      ...filteredCruises.map((cruise) => cruise.valueScore),
    );
    return {
      count: filteredCruises.length,
      avgCost: `$${Math.round(totalCost / filteredCruises.length)}`,
      minCost: `$${minCost}`,
      bestValue: bestValue.toFixed(1),
    };
  }, [filteredCruises]);

  const updateCruiseFilters = (setter) => (event) => {
    setter(event.target.value);
    setCurrentCruisePage(1);
  };

  const renderTabPanel = () => {
    switch (activeTab) {
      case "worldwide":
        return (
          <section className="panel active">
            <h2>🌎 Worldwide Travel</h2>
            <p>
              Global travel from Florida offers diverse experiences but varies
              significantly in cost, travel time, and logistics.
            </p>
            <img
              className="hero"
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80"
              alt="World Travel"
            />
            <h3>✈️ Travel Time</h3>
            <div className="grid">
              {worldwideCards.map((card) => (
                <div className="card" key={card}>
                  {card}
                </div>
              ))}
            </div>
            <h3>💰 Cost Comparison by Region</h3>
            <DataTable
              headers={[
                "Region",
                "Flight ($)",
                "Hotel/Night ($)",
                "Total 5-Day Budget",
              ]}
              rows={worldwideBudget}
            />
            <h3>🧠 Quick Picks</h3>
            <ul>
              <li>💸 Budget: Caribbean</li>
              <li>💎 Luxury: Paris</li>
              <li>⚡ Short trip: Bahamas</li>
            </ul>
          </section>
        );
      case "florida":
        return (
          <section className="panel active">
            <h2>🌴 Florida Travel</h2>
            <p>
              Perfect for quick, low-cost, high-value trips from South Florida.
            </p>
            <img
              className="hero"
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
              alt="Florida"
            />
            <h3>🚗 Driving Distances</h3>
            <DataTable
              headers={["Destination", "Distance", "Time"]}
              rows={floridaDrives}
            />
            <h3>🧠 Quick Picks</h3>
            <ul>
              <li>Weekend: Miami</li>
              <li>Relaxation: Naples</li>
              <li>Adventure: Key West</li>
            </ul>
          </section>
        );
      case "usa":
        return (
          <section className="panel active">
            <h2>🇺🇸 USA Travel</h2>
            <p>Best mix of culture, entertainment, and convenience.</p>
            <img
              className="hero"
              src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80"
              alt="USA"
            />
            <h3>✈️ Flight + Hotel Bundles</h3>
            <DataTable
              headers={["Destination", "Flight", "Hotel", "Total"]}
              rows={usaBundles}
            />
            <h3>🧠 Quick Picks</h3>
            <ul>
              <li>Party: Vegas</li>
              <li>Culture: NYC</li>
              <li>Nature: National Parks</li>
            </ul>
          </section>
        );
      case "cruises":
        return (
          <section className="panel cruise-panel active">
            <div className="filters">
              <div className="filter-group">
                <label htmlFor="holidayFilter">Holiday</label>
                <select
                  id="holidayFilter"
                  value={holidayFilter}
                  onChange={updateCruiseFilters(setHolidayFilter)}
                >
                  <option value="all">All holidays</option>
                  <option value="Memorial Day">Memorial Day</option>
                  <option value="July 4th">July 4th</option>
                  <option value="Labor Day">Labor Day</option>
                  <option value="Thanksgiving">Thanksgiving</option>
                  <option value="Christmas">Christmas</option>
                  <option value="New Year">New Year</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="lineFilter">Cruise line</label>
                <select
                  id="lineFilter"
                  value={lineFilter}
                  onChange={updateCruiseFilters(setLineFilter)}
                >
                  <option value="all">All lines</option>
                  <option value="Royal Caribbean">Royal Caribbean</option>
                  <option value="Carnival">Carnival</option>
                  <option value="Norwegian">Norwegian</option>
                  <option value="MSC">MSC</option>
                  <option value="Celebrity">Celebrity</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="packageFilter">Package</label>
                <select
                  id="packageFilter"
                  value={packageFilter}
                  onChange={updateCruiseFilters(setPackageFilter)}
                >
                  <option value="all">All packages</option>
                  <option value="Basic">Basic</option>
                  <option value="Value">Value</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="maxCostFilter">Max total cost ($)</label>
                <input
                  id="maxCostFilter"
                  type="number"
                  min="300"
                  step="50"
                  value={maxCostFilter}
                  onChange={(event) => {
                    setMaxCostFilter(event.target.value);
                    setCurrentCruisePage(1);
                  }}
                />
              </div>
            </div>

            <div className="kpis">
              <div className="kpi">
                <div className="label">Matching Cruises</div>
                <div className="value">{cruiseStats.count}</div>
              </div>
              <div className="kpi">
                <div className="label">Average Total Cost</div>
                <div className="value">{cruiseStats.avgCost}</div>
              </div>
              <div className="kpi">
                <div className="label">Lowest Cost</div>
                <div className="value">{cruiseStats.minCost}</div>
              </div>
              <div className="kpi">
                <div className="label">Best Value Score</div>
                <div className="value">{cruiseStats.bestValue}</div>
              </div>
            </div>

            <h3>⚓ Major Holiday Cruise Comparison</h3>
            <div className="table-wrap">
              <table className="wide-table">
                <thead>
                  <tr>
                    <th>Holiday</th>
                    <th>Cruise Line</th>
                    <th>Total Cost ($)</th>
                    <th>Value Score</th>
                    <th>Ship</th>
                    <th>Duration</th>
                    <th>Port</th>
                    <th>Package</th>
                    <th>Includes</th>
                    <th>Booking URL</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedCruises.map((cruise) => (
                    <tr key={`${cruise.holiday}-${cruise.ship}`}>
                      <td>{cruise.holiday}</td>
                      <td>{cruise.line}</td>
                      <td>{cruise.totalCost}</td>
                      <td>{cruise.valueScore.toFixed(1)}</td>
                      <td>{cruise.ship}</td>
                      <td>{cruise.duration}</td>
                      <td>{cruise.port}</td>
                      <td>{cruise.packageType}</td>
                      <td>{cruise.includes}</td>
                      <td>
                        <a
                          href={cruise.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Book
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-toolbar">
              <div className="filter-group">
                <label htmlFor="pageSizeFilter">Rows per page</label>
                <select
                  id="pageSizeFilter"
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setCurrentCruisePage(1);
                  }}
                >
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
            </div>
            <div className="pagination" aria-label="Cruise table pagination">
              <button
                className="page-button"
                type="button"
                disabled={safeCruisePage === 1}
                onClick={() =>
                  setCurrentCruisePage((page) => Math.max(1, page - 1))
                }
              >
                Previous
              </button>
              <span className="page-info">
                Page {safeCruisePage} of {totalCruisePages}
              </span>
              <button
                className="page-button"
                type="button"
                disabled={safeCruisePage === totalCruisePages}
                onClick={() =>
                  setCurrentCruisePage((page) =>
                    Math.min(totalCruisePages, page + 1),
                  )
                }
              >
                Next
              </button>
            </div>
          </section>
        );
      case "holiday":
        return (
          <section className="panel active">
            <h2>🎉 Holiday Long Weekend Travel</h2>
            <p>Maximize PTO with strategic planning.</p>
            <h3>📈 Booking Timing Trend</h3>
            <div className="grid">
              <div className="card">
                <strong>Early Booking</strong>
                <br />
                <span className="muted">Lowest prices</span>
              </div>
              <div className="card">
                <strong>Mid Booking</strong>
                <br />
                <span className="muted">Moderate prices</span>
              </div>
              <div className="card">
                <strong>Late Booking</strong>
                <br />
                <span className="muted">Highest prices</span>
              </div>
            </div>
            <h3>📅 Best Trips</h3>
            <DataTable
              headers={["Holiday", "Destination", "Price"]}
              rows={holidayTrips}
            />
            <h3>🧠 Strategy</h3>
            <ul>
              <li>Book 2–3 months early</li>
              <li>Avoid peak flight times</li>
            </ul>
          </section>
        );
      case "meals":
        return (
          <section className="panel active">
            <h2>🍱 Meal Planning (No Cooking Strategy)</h2>
            <p>Save money and time with bulk meal strategies.</p>
            <img
              className="hero"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
              alt="Food"
            />
            <h3>🛒 Options</h3>
            <DataTable
              headers={["Store", "Price", "Servings", "Cost/Meal", "Type"]}
              rows={mealOptions}
            />
            <h3>🧠 Quick Picks</h3>
            <ul>
              <li>Best value: Costco</li>
              <li>Best quality: Whole Foods</li>
              <li>Best variety: Publix</li>
            </ul>
          </section>
        );
      case "final":
        return (
          <section className="panel active">
            <h2>🎯 Final Decision Tool</h2>
            <DataTable headers={["Goal", "Best Option"]} rows={finalChoices} />
            <p>
              ✅ You now have a complete planning system to compare costs
              quickly, choose trips faster, and optimize time and budget.
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="topbar">
        <div className="tabs" role="tablist" aria-label="Travel sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      <main className="container">
        {renderTabPanel()}
        <p className="footer-note">Built as a single-page tabbed experience.</p>
      </main>
    </>
  );
}

export default App;
