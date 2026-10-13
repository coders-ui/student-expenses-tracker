import { useMemo, useState } from "react";

const categories = ["Food", "Transport", "Education", "Shopping", "Bills", "Other"];
const colors = { Food: "#8b7cf6", Transport: "#f4a261", Education: "#4f9cf9", Shopping: "#ef7c9b", Bills: "#38b89b", Other: "#a6afc2" };
const seed = [
  { id: "1", title: "Campus cafe", amount: 8.5, category: "Food", date: "2026-10-12", method: "Card" },
  { id: "2", title: "Monthly bus pass", amount: 32, category: "Transport", date: "2026-10-11", method: "Card" },
  { id: "3", title: "Statistics textbook", amount: 46.9, category: "Education", date: "2026-10-10", method: "Online" },
  { id: "4", title: "Groceries", amount: 24.35, category: "Food", date: "2026-10-09", method: "Cash" },
  { id: "5", title: "Laundry", amount: 7, category: "Bills", date: "2026-10-08", method: "Card" },
  { id: "6", title: "Notebook & pens", amount: 12.8, category: "Education", date: "2026-10-06", method: "Card" },
  { id: "7", title: "Movie night", amount: 14, category: "Other", date: "2026-10-04", method: "Online" },
  { id: "8", title: "Coffee with Mia", amount: 5.25, category: "Food", date: "2026-10-02", method: "Card" },
];
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
const today = new Date().toISOString().slice(0, 10);
const defaultProfile = { name: "Jamie Davis", email: "jamie.davis@campus.edu", school: "Northwood University", program: "Business Administration", year: "Second year" };

function readSaved(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function initials(name = "Student") {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("");
}

function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("signin");
  const [values, setValues] = useState({ name: "", email: "", password: "", school: "", program: "", year: "First year" });
  const [error, setError] = useState("");
  function submit(event) {
    event.preventDefault();
    if (mode === "create" && !values.name.trim()) return setError("Enter your name to create your student profile.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return setError("Enter a valid email address.");
    if (values.password.length < 6) return setError("Your password must be at least 6 characters.");
    if (mode === "create") onLogin({ name: values.name.trim(), email: values.email.trim(), school: values.school.trim(), program: values.program.trim(), year: values.year });
    else onLogin({ email: values.email.trim() });
  }
  return <div className="ss-login-screen"><section className="ss-login-story"><a className="ss-brand ss-login-brand" href="#"><span className="ss-brand-mark">S</span><span>student<span className="ss-brand-light">spend</span><small>YOUR MONEY, IN FOCUS</small></span></a><div className="ss-login-pitch"><span className="ss-login-kicker">A LITTLE MORE CLARITY</span><h1>Make your money<br />make sense.</h1><p>Build better habits, stay on budget, and feel good about where every dollar goes.</p><div className="ss-login-art"><div className="ss-art-card"><span>MONTHLY SAVINGS</span><strong>$248.00</strong><i>↗ &nbsp; 12% this month</i><div><b /><b /><b /><b /><b /><b /><b /></div></div><span className="ss-art-orbit">✳</span></div></div><div className="ss-login-story-footer">A smarter way to spend your student years. <span>✦</span></div></section><section className="ss-login-side"><div className="ss-login-mobile-brand"><span className="ss-brand-mark">S</span><strong>student<span>spend</span></strong></div><div className="ss-login-card"><div className="ss-login-heading"><span className="ss-eyebrow">YOUR STUDENT FINANCE SPACE</span><h2>{mode === "signin" ? "Welcome back" : "Create your account"}</h2><p>{mode === "signin" ? "Sign in to pick up where you left off." : "A few details to make this space yours."}</p></div><div className="ss-login-tabs"><button className={mode === "signin" ? "selected" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button><button className={mode === "create" ? "selected" : ""} onClick={() => { setMode("create"); setError(""); }}>Create account</button></div><form onSubmit={submit} className="ss-login-form" noValidate>{mode === "create" && <label>Full name<input autoComplete="name" placeholder="e.g. Jamie Davis" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} /></label>}<label>Student email<input type="email" autoComplete="email" placeholder="you@university.edu" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} /></label>{mode === "create" && <><label>School or university <span className="ss-optional">Optional</span><input placeholder="e.g. Northwood University" value={values.school} onChange={(e) => setValues({ ...values, school: e.target.value })} /></label><div className="ss-form-row"><label>Program of study <span className="ss-optional">Optional</span><input placeholder="e.g. Biology" value={values.program} onChange={(e) => setValues({ ...values, program: e.target.value })} /></label><label>Year of study<select value={values.year} onChange={(e) => setValues({ ...values, year: e.target.value })}>{["First year", "Second year", "Third year", "Fourth year", "Graduate", "Other"].map((year) => <option key={year}>{year}</option>)}</select></label></div></>}<label>Password<input type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder="At least 6 characters" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} /></label>{error && <div className="ss-form-error" role="alert">! &nbsp;{error}</div>}<button className="ss-primary ss-login-submit" type="submit">{mode === "signin" ? "Sign in" : "Create student profile"}<span>→</span></button></form><div className="ss-demo-note"><span>✦</span><p><strong>Demo sign-in</strong><br />Authentication will be connected when the team API is ready. Your password is not saved.</p></div></div><p className="ss-login-foot">By continuing, you agree to use StudentSpend responsibly.</p></section></div>;
}

export default function StudentSpend() {
  const [profile, setProfile] = useState(() => readSaved("studentspend.profile", defaultProfile));
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSaved("studentspend.signedIn", false));
  const [transactions, setTransactions] = useState(() => readSaved("studentspend.transactions", seed));
  const [budget, setBudget] = useState(() => readSaved("studentspend.budget", 1200));
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", date: today, method: "Card" });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");

  const currentMonth = today.slice(0, 7);
  const monthTransactions = transactions.filter((t) => t.date.startsWith(currentMonth));
  const spent = monthTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalSpent = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const remaining = Math.max(budget - spent, 0);
  const filtered = useMemo(() => transactions.filter((t) => {
    const matchesText = t.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "All categories" || t.category === categoryFilter;
    return matchesText && matchesCategory && (!fromDate || t.date >= fromDate) && (!toDate || t.date <= toDate);
  }).sort((a, b) => b.date.localeCompare(a.date)), [transactions, query, categoryFilter, fromDate, toDate]);

  function save(next) {
    setTransactions(next);
    localStorage.setItem("studentspend.transactions", JSON.stringify(next));
  }
  function openAdd() {
    setForm({ title: "", amount: "", category: "Food", date: today, method: "Card" });
    setError(""); setModal({ mode: "add" });
  }
  function openEdit(item) {
    setForm({ ...item, amount: String(item.amount) });
    setError(""); setModal({ mode: "edit", id: item.id });
  }
  function submit(event) {
    event.preventDefault();
    if (modal.mode === "profile") {
      if (!form.name.trim()) return setError("Enter your name.");
      const next = { ...profile, ...form, name: form.name.trim(), email: form.email.trim() };
      setProfile(next); localStorage.setItem("studentspend.profile", JSON.stringify(next));
      setModal(null); setNotice("Profile updated."); window.setTimeout(() => setNotice(""), 2800); return;
    }
    const amount = Number(form.amount);
    if (!form.title.trim()) return setError("Enter a title for this expense.");
    if (!Number.isFinite(amount) || amount <= 0) return setError("Enter an amount greater than zero.");
    if (!form.date) return setError("Choose a date for this expense.");
    const item = { ...form, title: form.title.trim(), amount };
    if (modal.mode === "edit") save(transactions.map((t) => t.id === modal.id ? { ...item, id: modal.id } : t));
    else save([{ ...item, id: crypto.randomUUID() }, ...transactions]);
    setModal(null); setNotice(modal.mode === "edit" ? "Expense updated." : "Expense added.");
    window.setTimeout(() => setNotice(""), 2800);
  }
  function remove(item) {
    if (window.confirm(`Delete “${item.title}”?`)) { save(transactions.filter((t) => t.id !== item.id)); setNotice("Expense deleted."); window.setTimeout(() => setNotice(""), 2800); }
  }
  function setBudgetValue(value) {
    const amount = Number(value);
    if (Number.isFinite(amount) && amount > 0) { setBudget(amount); localStorage.setItem("studentspend.budget", JSON.stringify(amount)); }
  }
  function navTo(name, target) {
    setActiveNav(name); setMobileNav(false);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function openProfile() {
    setForm({ ...profile }); setError(""); setModal({ mode: "profile" });
  }
  function signIn(nextProfile) {
    const savedProfile = readSaved("studentspend.profile", null);
    const isReturningStudent = savedProfile?.email === nextProfile.email;
    const next = isReturningStudent ? { ...savedProfile, email: nextProfile.email } : { ...nextProfile, name: nextProfile.email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), school: "", program: "", year: "" };
    setProfile(next); localStorage.setItem("studentspend.profile", JSON.stringify(next));
    localStorage.setItem("studentspend.signedIn", "true"); setIsAuthenticated(true);
  }
  function signOut() {
    localStorage.removeItem("studentspend.signedIn"); setIsAuthenticated(false); setModal(null);
  }

  const categoryTotals = categories.map((category) => ({ category, amount: monthTransactions.filter((t) => t.category === category).reduce((sum, t) => sum + Number(t.amount), 0) })).filter((x) => x.amount > 0);
  let offset = 0;
  const donut = categoryTotals.map((item) => {
    const start = offset; offset += (item.amount / (spent || 1)) * 100;
    return `${colors[item.category]} ${start}% ${offset}%`;
  }).join(", ");
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return { key, label: d.toLocaleDateString("en-US", { month: "short" }), amount: transactions.filter((t) => t.date.startsWith(key)).reduce((sum, t) => sum + Number(t.amount), 0) };
  });
  const maxMonth = Math.max(...months.map((x) => x.amount), 1);

  if (!isAuthenticated) return <LoginScreen onLogin={signIn} />;

  return <div className="ss-app">
    <aside className={`ss-sidebar ${mobileNav ? "is-open" : ""}`}>
      <a className="ss-brand" href="#overview" onClick={() => navTo("Overview", "overview")}><span className="ss-brand-mark">S</span><span>student<span className="ss-brand-light">spend</span><small>YOUR MONEY, IN FOCUS</small></span></a>
      <div className="ss-nav-label">WORKSPACE</div>
      <nav className="ss-nav">
        <button className={activeNav === "Overview" ? "active" : ""} onClick={() => navTo("Overview", "overview")}><span>◫</span> Overview</button>
        <button className={activeNav === "Transactions" ? "active" : ""} onClick={() => navTo("Transactions", "transactions")}><span>↔</span> Transactions</button>
        <button className={activeNav === "Analytics" ? "active" : ""} onClick={() => navTo("Analytics", "analytics")}><span>▥</span> Analytics</button>
        <button onClick={openProfile}><span>◎</span> My profile</button>
      </nav>
      <div className="ss-side-bottom"><div className="ss-tip-icon">✦</div><strong>Small steps add up.</strong><p>Every expense you track brings you closer to your goals.</p><div className="ss-tip-art">✳</div><button className="ss-profile" onClick={openProfile}><div className="ss-avatar">{initials(profile.name)}</div><div><strong>{profile.name}</strong><span>{profile.year || "Student account"}</span></div><span className="ss-profile-edit">Edit</span></button></div>
    </aside>
    {mobileNav && <button className="ss-backdrop" aria-label="Close menu" onClick={() => setMobileNav(false)} />}
    <main className="ss-main">
      <header className="ss-topbar"><button className="ss-mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">☰</button><div className="ss-crumb">Workspace <span>/</span> <strong>{activeNav}</strong></div><div className="ss-top-actions"><span className="ss-date-chip">◷ &nbsp;{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span><button className="ss-avatar ss-top-avatar ss-profile-trigger" title="Edit profile" onClick={openProfile}>{initials(profile.name)}</button></div></header>
      <div className="ss-content" id="overview">
        <div className="ss-page-heading"><div><div className="ss-eyebrow">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase()}</div><h1>{profile.name.split(" ")[0]}’s money, <span>in focus.</span></h1><p>{profile.school ? `${profile.school} · ` : ""}A little clarity goes a long way. Here’s your spending at a glance.</p></div><button className="ss-primary" onClick={openAdd}><b>＋</b> Add expense</button></div>
        {notice && <div className="ss-toast" role="status">✓ &nbsp;{notice}</div>}
        <section className="ss-stats" aria-label="Spending summary">
          <article className="ss-stat-card"><div className="ss-stat-top"><span>Total expenses</span><span className="ss-stat-icon purple">↗</span></div><strong>{fmt(totalSpent)}</strong><div className="ss-stat-foot"><span className="ss-dot purple-dot" /> Across {transactions.length} transactions</div></article>
          <article className="ss-stat-card"><div className="ss-stat-top"><span>Monthly spending</span><span className="ss-stat-icon purple">⌁</span></div><strong>{fmt(spent)}</strong><div className="ss-stat-foot"><span className="ss-dot purple-dot" /> This month <span className="ss-stat-muted">· {monthTransactions.length} transactions</span></div></article>
          <article className="ss-stat-card"><div className="ss-stat-top"><span>Monthly budget</span><span className="ss-stat-icon blue">▤</span></div><div className="ss-budget-value"><strong>{fmt(budget)}</strong><button title="Edit monthly budget" onClick={() => { const value = window.prompt("Set your monthly budget", String(budget)); if (value !== null) setBudgetValue(value); }}>✎</button></div><div className="ss-stat-foot"><span className="ss-dot blue-dot" /> Your spending limit</div></article>
          <article className="ss-stat-card"><div className="ss-stat-top"><span>Remaining</span><span className="ss-stat-icon green">⌁</span></div><strong>{fmt(remaining)}</strong><div className="ss-progress"><span style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }} /></div><div className="ss-stat-foot"><span className="ss-dot green-dot" /> {Math.round((spent / budget) * 100)}% of budget used</div></article>
        </section>
        <section className="ss-analytics" id="analytics">
          <article className="ss-panel ss-spending-panel"><div className="ss-panel-heading"><div><h2>Spending overview</h2><p>See where your money goes this month</p></div><span className="ss-select-label">This month⌄</span></div><div className="ss-chart-wrap"><div className="ss-donut" style={{ background: spent ? `conic-gradient(${donut})` : "#eeedf5" }}><div><strong>{fmt(spent)}</strong><span>Total spent</span></div></div><div className="ss-legend">{categoryTotals.length ? categoryTotals.map((item) => <div className="ss-legend-row" key={item.category}><i style={{ background: colors[item.category] }} /><span>{item.category}</span><strong>{fmt(item.amount)}</strong></div>) : <p className="ss-empty-chart">Add an expense to see your breakdown.</p>}</div></div></article>
          <article className="ss-panel ss-monthly-panel"><div className="ss-panel-heading"><div><h2>Monthly trends</h2><p>Your spending over time</p></div><span className="ss-select-label">Last 6 months</span></div><div className="ss-bar-chart">{months.map((m) => <div className="ss-bar-col" key={m.key}><span className="ss-bar-value">{m.amount ? fmt(m.amount) : ""}</span><div className="ss-bar-track"><i style={{ height: `${Math.max((m.amount / maxMonth) * 100, m.amount ? 6 : 0)}%` }} /></div><span className={m.key === currentMonth ? "current" : ""}>{m.label}</span></div>)}</div><div className="ss-chart-caption"><i /> Monthly expenses</div></article>
        </section>
        <section className="ss-panel ss-transactions" id="transactions"><div className="ss-panel-heading ss-trans-heading"><div><h2>Recent transactions</h2><p>A closer look at where it’s going</p></div><span className="ss-count">{filtered.length} records</span></div><div className="ss-filters"><label className="ss-search">⌕<input placeholder="Search expenses..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><select aria-label="Filter by category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option>All categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</select><label className="ss-date-filter">From <input type="date" aria-label="From date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label><label className="ss-date-filter">To <input type="date" aria-label="To date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label></div>
          <div className="ss-table-scroll"><table><thead><tr><th>EXPENSE</th><th>CATEGORY</th><th>DATE</th><th>PAYMENT</th><th className="ss-align-right">AMOUNT</th><th><span className="ss-sr-only">Actions</span></th></tr></thead><tbody>{filtered.length ? filtered.slice(0, 8).map((t) => <tr key={t.id}><td><div className="ss-transaction-title"><span className="ss-category-icon" style={{ color: colors[t.category], background: `${colors[t.category]}1c` }}>{t.category === "Food" ? "⌁" : t.category === "Transport" ? "↗" : t.category === "Education" ? "▤" : t.category === "Shopping" ? "◇" : t.category === "Bills" ? "⌑" : "✳"}</span><strong>{t.title}</strong></div></td><td><span className="ss-category-pill" style={{ "--pill-color": colors[t.category] }}>{t.category}</span></td><td>{new Date(`${t.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td><td><span className="ss-payment">{t.method === "Card" ? "▭" : t.method === "Cash" ? "$" : "↗"} &nbsp;{t.method}</span></td><td className="ss-align-right ss-amount">−{fmt(Number(t.amount))}</td><td><div className="ss-row-actions"><button onClick={() => openEdit(t)} aria-label={`Edit ${t.title}`} title="Edit">✎</button><button onClick={() => remove(t)} aria-label={`Delete ${t.title}`} title="Delete">×</button></div></td></tr>) : <tr><td colSpan="6"><div className="ss-empty"><div>⌕</div><strong>No expenses found</strong><span>Try changing your filters or add a new expense.</span><button onClick={openAdd}>＋ Add an expense</button></div></td></tr>}</tbody></table></div>
        </section>
        <footer className="ss-footer"><span>Made for student life <b>✦</b></span><span>Stay mindful. Spend well.</span></footer>
      </div>
    </main>
    {modal && <div className="ss-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(null); }}><section className="ss-modal" role="dialog" aria-modal="true" aria-labelledby="expense-modal-title"><div className="ss-modal-heading"><div><span className="ss-modal-mark">{modal.mode === "profile" ? initials(profile.name) : "＋"}</span><div><h2 id="expense-modal-title">{modal.mode === "profile" ? "Your student profile" : modal.mode === "edit" ? "Edit expense" : "Add an expense"}</h2><p>{modal.mode === "profile" ? "Update your details and preferences." : "Keep track of every little thing."}</p></div></div><button onClick={() => setModal(null)} aria-label="Close">×</button></div><form onSubmit={submit} noValidate>{modal.mode === "profile" ? <><label>Full name<input autoFocus autoComplete="name" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Student email<input type="email" autoComplete="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>School or university<input value={form.school || ""} onChange={(e) => setForm({ ...form, school: e.target.value })} /></label><div className="ss-form-row"><label>Program of study<input value={form.program || ""} onChange={(e) => setForm({ ...form, program: e.target.value })} /></label><label>Year of study<select value={form.year || "First year"} onChange={(e) => setForm({ ...form, year: e.target.value })}>{["First year", "Second year", "Third year", "Fourth year", "Graduate", "Other"].map((year) => <option key={year}>{year}</option>)}</select></label></div></> : <><label>Expense title<input autoFocus placeholder="e.g. Lunch at the cafe" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><div className="ss-form-row"><label>Amount<input type="number" min="0.01" step="0.01" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></label><label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label></div><div className="ss-form-row"><label>Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label><label>Payment method<select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>{["Card", "Cash", "Online"].map((m) => <option key={m}>{m}</option>)}</select></label></div></>}{error && <div className="ss-form-error" role="alert">! &nbsp;{error}</div>}<div className="ss-modal-actions">{modal.mode === "profile" && <button type="button" className="ss-signout" onClick={signOut}>Sign out</button>}<button type="button" className="ss-cancel" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="ss-primary">{modal.mode === "profile" ? "Save profile" : modal.mode === "edit" ? "Save changes" : "Add expense"}</button></div></form></section></div>}
  </div>;
}
