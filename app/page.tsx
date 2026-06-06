"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";

type RiskLevel = "Low" | "Medium" | "High";
type RiskFilter = "All" | RiskLevel;
type ViewMode = "CEO" | "CRO" | "AML" | "CS";
type RoleMode = "Executive" | "AML Analyst" | "Customer Success" | "Admin";
type CaseStatus = "Open" | "Review" | "Escalated" | "Closed";
type Customer = {
  name: string;
  industry: string;
  status: string;
  risk: RiskLevel;
  revenue: number;
  health: number;
  nps: number;
  tickets: number;
  kyc: string;
};

const customers: Customer[] = [
  { name: "Apex Retail", industry: "Retail", status: "Active", risk: "Low", revenue: 42000, health: 94, nps: 72, tickets: 4, kyc: "Verified" },
  { name: "Nova Finance", industry: "FinTech", status: "Review", risk: "High", revenue: 31500, health: 68, nps: 41, tickets: 18, kyc: "Enhanced Due Diligence" },
  { name: "Bright SaaS", industry: "SaaS", status: "Active", risk: "Medium", revenue: 24700, health: 82, nps: 58, tickets: 9, kyc: "Verified" },
  { name: "Urban Pay", industry: "Payments", status: "Pending KYC", risk: "High", revenue: 18900, health: 59, nps: 33, tickets: 22, kyc: "Pending Review" },
  { name: "CloudKart", industry: "Ecommerce", status: "Active", risk: "Low", revenue: 37800, health: 91, nps: 69, tickets: 6, kyc: "Verified" },
];

const revenueData = [
  { month: "Jan", revenue: 45, risk: 32, customers: 88 },
  { month: "Feb", revenue: 62, risk: 38, customers: 97 },
  { month: "Mar", revenue: 58, risk: 44, customers: 108 },
  { month: "Apr", revenue: 81, risk: 57, customers: 119 },
  { month: "May", revenue: 96, risk: 71, customers: 132 },
  { month: "Jun", revenue: 154, risk: 87, customers: 148 },
];

const riskData = [
  { risk: "Low", count: 2 },
  { risk: "Medium", count: 1 },
  { risk: "High", count: 2 },
];

const healthData = [
  { name: "Healthy", value: 3 },
  { name: "At Risk", value: 1 },
  { name: "Critical", value: 1 },
];

const pieColors = ["#22c55e", "#eab308", "#ef4444"];

const cases: { id: string; customer: string; type: string; score: number; status: CaseStatus; owner: string; sla: string }[] = [
  { id: "CASE-1042", customer: "Nova Finance", type: "PEP Match", score: 92, status: "Escalated", owner: "AML Analyst", sla: "2h left" },
  { id: "CASE-1043", customer: "Urban Pay", type: "Sanctions Review", score: 88, status: "Open", owner: "Compliance Team", sla: "6h left" },
  { id: "CASE-1044", customer: "Bright SaaS", type: "Adverse Media", score: 71, status: "Review", owner: "Risk Team", sla: "1d left" },
  { id: "CASE-1045", customer: "Apex Retail", type: "KYC Refresh", score: 43, status: "Closed", owner: "Operations", sla: "Done" },
];

const transactions = [
  ["TXN-9011", "Nova Finance", "$18,400", "Cross-border transfer", "High"],
  ["TXN-9012", "Urban Pay", "$11,200", "Velocity spike", "High"],
  ["TXN-9013", "Bright SaaS", "$7,900", "Unusual activity", "Medium"],
  ["TXN-9014", "CloudKart", "$3,200", "Normal payment", "Low"],
];

const alerts = [
  "Nova Finance flagged for PEP match",
  "Urban Pay KYC review pending",
  "High-value cross-border transfer detected",
  "Velocity spike found in Payments segment",
];

const activities = [
  ["09:15 AM", "AI Risk Engine flagged Nova Finance for PEP match"],
  ["10:05 AM", "Urban Pay moved to pending KYC review"],
  ["11:20 AM", "Compliance analyst escalated CASE-1042"],
  ["12:10 PM", "Customer Success created outreach task for Urban Pay"],
  ["02:40 PM", "Executive report generated for board review"],
];

const auditTrail = [
  ["System", "Created risk event for Nova Finance", "Immutable"],
  ["AML Analyst", "Added notes to CASE-1042", "Reviewed"],
  ["Compliance Lead", "Approved escalation workflow", "Approved"],
  ["Customer Success", "Scheduled Urban Pay outreach", "Pending"],
];

const dataQuality = [
  ["KYC Completeness", 86, "2 records need review"],
  ["Duplicate Alerts", 94, "Low duplication risk"],
  ["Freshness Score", 91, "Updated within SLA"],
  ["Owner Assignment", 88, "1 case missing senior owner"],
];

const globalRiskExposure = [
  { region: "India", exposure: "$64K", risk: "Medium", x: "58%", y: "56%" },
  { region: "UAE", exposure: "$38K", risk: "High", x: "50%", y: "48%" },
  { region: "Singapore", exposure: "$29K", risk: "Low", x: "67%", y: "63%" },
  { region: "United Kingdom", exposure: "$41K", risk: "Medium", x: "43%", y: "37%" },
  { region: "United States", exposure: "$72K", risk: "High", x: "24%", y: "45%" },
];

const portfolioScores = [
  ["Business Impact", 96],
  ["Analytics Thinking", 98],
  ["Product Design", 95],
  ["AML Domain", 94],
  ["Executive Storytelling", 97],
];

const skillBadges = [
  "CRM Analytics",
  "AML Compliance",
  "Customer Success",
  "Risk Intelligence",
  "Dashboard Design",
  "Product Thinking",
  "Executive Reporting",
  "Frontend Engineering",
];

const systemHealth = [
  ["Platform Uptime", "99.9%", "Operational"],
  ["Model Accuracy", "94%", "Stable"],
  ["Compliance Coverage", "91%", "Strong"],
  ["Data Pipeline", "Healthy", "Live"],
];

const investigationEvidence = [
  "PEP match confidence above 90%",
  "Velocity spike detected in last transaction window",
  "Cross-border transfer above normal customer pattern",
  "Pending KYC review blocks automated approval",
];




function AnimatedCloudBackground({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes cloudMoveLeft {
          0% { transform: translate3d(-45vw, 0, 0) scale(0.95); }
          100% { transform: translate3d(120vw, -3vh, 0) scale(1.05); }
        }

        @keyframes cloudMoveRight {
          0% { transform: translate3d(115vw, 0, 0) scale(1); }
          100% { transform: translate3d(-55vw, 4vh, 0) scale(0.95); }
        }

        @keyframes cloudFloat {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -18px; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.24; transform: scale(1); }
          50% { opacity: 0.48; transform: scale(1.1); }
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.7); }
        }

        .real-cloud {
          position: absolute;
          width: 360px;
          height: 120px;
          border-radius: 9999px;
          background:
            radial-gradient(circle at 18% 58%, rgba(255,255,255,0.78) 0 23%, transparent 24%),
            radial-gradient(circle at 34% 38%, rgba(255,255,255,0.82) 0 30%, transparent 31%),
            radial-gradient(circle at 54% 43%, rgba(255,255,255,0.76) 0 34%, transparent 35%),
            radial-gradient(circle at 75% 58%, rgba(255,255,255,0.68) 0 25%, transparent 26%),
            linear-gradient(180deg, rgba(255,255,255,0.55), rgba(147,197,253,0.22));
          filter: blur(2px);
          opacity: 0.38;
          box-shadow:
            0 25px 80px rgba(125, 211, 252, 0.18),
            inset 0 -24px 45px rgba(56, 189, 248, 0.14),
            inset 0 18px 35px rgba(255,255,255,0.35);
          mix-blend-mode: screen;
        }

        .real-cloud::before {
          content: "";
          position: absolute;
          left: 42px;
          top: -48px;
          width: 135px;
          height: 135px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.62);
          box-shadow:
            95px 18px 0 15px rgba(255,255,255,0.58),
            185px 48px 0 -8px rgba(255,255,255,0.46);
          filter: blur(2px);
        }

        .real-cloud::after {
          content: "";
          position: absolute;
          inset: 56px 24px 14px 24px;
          border-radius: 9999px;
          background: linear-gradient(90deg, rgba(34,211,238,0.12), rgba(168,85,247,0.12), rgba(255,255,255,0.14));
          filter: blur(18px);
        }

        .cloud-light {
          mix-blend-mode: normal;
          opacity: 0.46;
        }

        .move-left { animation: cloudMoveLeft 48s linear infinite; }
        .move-left-slow { animation: cloudMoveLeft 70s linear infinite; }
        .move-right { animation: cloudMoveRight 58s linear infinite; }
        .float-cloud { animation: cloudFloat 8s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 10s ease-in-out infinite; }
        .star-dot { animation: starTwinkle 3.6s ease-in-out infinite; }
      `}</style>

      <div className={darkMode ? "absolute inset-0 bg-[#020617]" : "absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-cyan-50"} />

      <div className={darkMode ? "absolute left-[-15%] top-[-10%] h-[620px] w-[620px] rounded-full bg-cyan-500/24 blur-[140px] glow-pulse" : "absolute left-[-15%] top-[-10%] h-[620px] w-[620px] rounded-full bg-cyan-300/35 blur-[140px] glow-pulse"} />
      <div className={darkMode ? "absolute right-[-18%] top-[10%] h-[720px] w-[720px] rounded-full bg-purple-500/20 blur-[150px] glow-pulse" : "absolute right-[-18%] top-[10%] h-[720px] w-[720px] rounded-full bg-purple-300/24 blur-[150px] glow-pulse"} />
      <div className={darkMode ? "absolute bottom-[-25%] left-[30%] h-[720px] w-[720px] rounded-full bg-blue-500/22 blur-[160px] glow-pulse" : "absolute bottom-[-25%] left-[30%] h-[720px] w-[720px] rounded-full bg-blue-300/28 blur-[160px] glow-pulse"} />

      <div className="absolute inset-0 opacity-100">
        <div className={darkMode ? "real-cloud move-left float-cloud" : "real-cloud cloud-light move-left float-cloud"} style={{ top: "12%", animationDelay: "-10s" }} />
        <div className={darkMode ? "real-cloud move-right float-cloud" : "real-cloud cloud-light move-right float-cloud"} style={{ top: "30%", width: "430px", height: "140px", animationDelay: "-24s" }} />
        <div className={darkMode ? "real-cloud move-left-slow float-cloud" : "real-cloud cloud-light move-left-slow float-cloud"} style={{ top: "52%", width: "520px", height: "155px", opacity: 0.3, animationDelay: "-35s" }} />
        <div className={darkMode ? "real-cloud move-right float-cloud" : "real-cloud cloud-light move-right float-cloud"} style={{ top: "74%", width: "460px", height: "145px", opacity: 0.32, animationDelay: "-42s" }} />
      </div>

      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 34 }).map((_, index) => (
          <span
            key={index}
            className={darkMode ? "star-dot absolute h-1 w-1 rounded-full bg-cyan-200" : "star-dot absolute h-1 w-1 rounded-full bg-cyan-500"}
            style={{
              left: `${(index * 29) % 100}%`,
              top: `${(index * 47) % 100}%`,
              animationDelay: `${(index % 10) * 0.28}s`,
            }}
          />
        ))}
      </div>

      <div className={darkMode ? "absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px]" : "absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:90px_90px]"} />
      <div className={darkMode ? "absolute inset-0 bg-gradient-to-r from-[#020617]/85 via-[#020617]/58 to-[#020617]/34" : "absolute inset-0 bg-gradient-to-r from-white/80 via-white/52 to-white/26"} />
      <div className={darkMode ? "absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/78" : "absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/70"} />
    </div>
  );
}

function getRiskClass(risk: string) {
  if (risk === "High") return "font-bold text-red-400";
  if (risk === "Medium") return "font-bold text-yellow-400";
  return "font-bold text-green-400";
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("All");
  const [selectedInsight, setSelectedInsight] = useState("risk");
  const [showAlerts, setShowAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("CEO");
  const [roleMode, setRoleMode] = useState<RoleMode>("Executive");
  const [query, setQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [playbook, setPlaybook] = useState({ kyc: false, escalate: false, transaction: false, outreach: false });
  const [scenario, setScenario] = useState({ revenueLift: 12, riskReduction: 18, healthLift: 9 });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "ai", text: "Ask me about highest risk customer, churn, AML summary, revenue forecast or next action." },
  ]);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showRecruiterDeck, setShowRecruiterDeck] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState("CASE-1042");

  const totalRevenue = customers.reduce((sum, c) => sum + c.revenue, 0);
  const highRisk = customers.filter((c) => c.risk === "High").length;
  const avgHealth = Math.round(customers.reduce((sum, c) => sum + c.health, 0) / customers.length);
  const totalTickets = customers.reduce((sum, c) => sum + c.tickets, 0);
  const completedSteps = Object.values(playbook).filter(Boolean).length;

  const simulatedRevenue = Math.round(totalRevenue * (1 + scenario.revenueLift / 100));
  const simulatedRisk = Math.max(0, 87 - scenario.riskReduction);
  const simulatedHealth = Math.min(100, avgHealth + scenario.healthLift);
  const revenueAtRisk = customers.filter((c) => c.risk === "High").reduce((sum, c) => sum + c.revenue, 0);
  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const overallPortfolioScore = Math.round(portfolioScores.reduce((sum, item) => sum + Number(item[1]), 0) / portfolioScores.length);

  const filteredCustomers = useMemo(() => {
    return riskFilter === "All" ? customers : customers.filter((c) => c.risk === riskFilter);
  }, [riskFilter]);

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const customerResults = customers
      .filter((c) => `${c.name} ${c.industry} ${c.status} ${c.risk} ${c.kyc}`.toLowerCase().includes(q))
      .map((c) => ({ type: "Customer", title: c.name, subtitle: `${c.industry} • ${c.risk} risk`, customer: c }));

    const caseResults = cases
      .filter((c) => `${c.id} ${c.customer} ${c.type} ${c.status} ${c.owner}`.toLowerCase().includes(q))
      .map((c) => ({ type: "Case", title: c.id, subtitle: `${c.customer} • ${c.status}`, customer: customers.find((x) => x.name === c.customer) || null }));

    const txnResults = transactions
      .filter((t) => t.join(" ").toLowerCase().includes(q))
      .map((t) => ({ type: "Transaction", title: t[0], subtitle: `${t[1]} • ${t[4]} risk`, customer: customers.find((x) => x.name === t[1]) || null }));

    return [...customerResults, ...caseResults, ...txnResults].slice(0, 6);
  }, [query]);

  const aiInsight =
    selectedInsight === "risk"
      ? "Nova Finance and Urban Pay require immediate AML review due to high-risk profiles, weak health score and suspicious transaction patterns."
      : selectedInsight === "churn"
      ? "Urban Pay has the highest churn risk because of pending KYC, low NPS, high support tickets and weak customer health."
      : "Recommended action: escalate high-risk cases, refresh KYC documents, prioritize analyst review and schedule customer success outreach.";

  const viewSummary =
    viewMode === "CEO"
      ? "Executive view focused on revenue, growth, risk and business impact."
      : viewMode === "CRO"
      ? "Revenue view focused on customer growth, retention and account health."
      : viewMode === "AML"
      ? "Compliance view focused on high-risk customers, AML alerts and investigation workflow."
      : "Customer success view focused on health score, support tickets, churn risk and outreach priority.";

  const roleSummary =
    roleMode === "Executive"
      ? "Executive mode highlights board-level KPIs, growth, risk and business value."
      : roleMode === "AML Analyst"
      ? "AML Analyst mode highlights high-risk accounts, investigation queues and case escalation."
      : roleMode === "Customer Success"
      ? "Customer Success mode highlights churn risk, health scores and outreach priorities."
      : "Admin mode gives full platform visibility across CRM, compliance and operations.";

  const sendChat = () => {
    const question = chatInput.trim();
    if (!question) return;

    const lower = question.toLowerCase();
    const reply = lower.includes("highest") || lower.includes("risk")
      ? "Highest risk customers are Nova Finance and Urban Pay. Nova Finance has a 92 PEP match score and Urban Pay has pending KYC plus velocity spike activity."
      : lower.includes("churn")
      ? "Urban Pay has the strongest churn signal: health 59%, NPS 33 and 22 support tickets. Recommended action is customer success outreach within 24 hours."
      : lower.includes("revenue") || lower.includes("forecast")
      ? `Scenario forecast shows revenue can move from $${totalRevenue.toLocaleString()} to $${simulatedRevenue.toLocaleString()} if growth initiatives deliver ${scenario.revenueLift}% lift.`
      : lower.includes("aml") || lower.includes("compliance")
      ? "AML summary: 2 high-risk accounts, 2 urgent alerts, one escalated PEP case and one sanctions review requiring analyst action."
      : "Recommended next action: complete the risk playbook, escalate CASE-1042, refresh Urban Pay KYC and export the board report.";

    setChatMessages((prev) => [...prev, { from: "user", text: question }, { from: "ai", text: reply }]);
    setChatInput("");
  };

  
  const exportReport = () => {
    const reportHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Nexus360 V8 Premium Executive Report</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: #020617;
      color: white;
      padding: 42px;
    }
    .container {
      max-width: 1120px;
      margin: auto;
      background: linear-gradient(135deg, rgba(8,47,73,.94), rgba(15,23,42,.98));
      border: 1px solid rgba(34,211,238,.38);
      border-radius: 30px;
      padding: 44px;
      box-shadow: 0 0 70px rgba(34,211,238,.25);
    }
    h1 { font-size: 54px; margin: 0 0 10px; color: #22d3ee; letter-spacing: -1px; }
    h2 { margin-top: 40px; color: #67e8f9; border-bottom: 1px solid rgba(255,255,255,.16); padding-bottom: 12px; }
    p { line-height: 1.75; }
    .subtitle { color: #cbd5e1; font-size: 18px; max-width: 920px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 22px; }
    .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 22px; }
    .card { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); border-radius: 22px; padding: 22px; }
    .label { color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; }
    .value { font-size: 34px; font-weight: 900; margin-top: 8px; color: #22d3ee; }
    .green { color: #4ade80; }
    .red { color: #fb7185; }
    .yellow { color: #facc15; }
    ul { line-height: 1.95; color: #e2e8f0; padding-left: 22px; }
    .score { font-size: 78px; font-weight: 900; color: #4ade80; line-height: 1; }
    .badge { display:inline-block; margin:6px 6px 0 0; padding:10px 14px; border-radius:999px; border:1px solid rgba(74,222,128,.35); color:#86efac; background:rgba(74,222,128,.08); font-weight:700; font-size:13px; }
    .footer { margin-top: 42px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.15); color: #94a3b8; }
    .cover { padding: 28px; border-radius: 28px; background: radial-gradient(circle at top left, rgba(34,211,238,.22), transparent 35%), radial-gradient(circle at bottom right, rgba(168,85,247,.20), transparent 40%), rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); }
    @media print {
      body { background: white; color: black; padding: 0; }
      .container { box-shadow: none; background: white; color: black; border: none; }
      .card, .cover { border: 1px solid #ddd; background: #fff; }
      h1, h2, .value { color: #0891b2; }
      .subtitle, ul, .footer { color: #334155; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="cover">
      <h1>🚀 Nexus360 V8 Cloud Edition</h1>
      <p class="subtitle">
        AI Powered CRM, AML, Customer Success & Executive Risk Intelligence Platform.<br/>
        Built as a recruiter-ready SaaS portfolio project by <b>Chetendra Singh Jadoun</b>.
      </p>
    </div>

    <h2>Executive Summary</h2>
    <p class="subtitle">
      Nexus360 V8 is a premium interactive dashboard combining CRM analytics, AML/KYC monitoring,
      suspicious transaction detection, case management, customer 360 profiles, AI copilot workflows,
      scenario simulation, global risk mapping, audit trail, system health monitoring and live animated cloud UI.
    </p>

    <h2>Key Metrics</h2>
    <div class="grid">
      <div class="card"><div class="label">Total Revenue</div><div class="value">$${totalRevenue.toLocaleString()}</div></div>
      <div class="card"><div class="label">Simulated Revenue</div><div class="value green">$${simulatedRevenue.toLocaleString()}</div></div>
      <div class="card"><div class="label">Active Customers</div><div class="value">${customers.length}</div></div>
      <div class="card"><div class="label">High Risk Accounts</div><div class="value red">${highRisk}</div></div>
      <div class="card"><div class="label">Average Health</div><div class="value">${avgHealth}%</div></div>
      <div class="card"><div class="label">AI Risk Score</div><div class="value yellow">87%</div></div>
    </div>

    <h2>Business Impact</h2>
    <div class="grid">
      <div class="card"><div class="label">Reporting Time Saved</div><div class="value green">60%</div></div>
      <div class="card"><div class="label">Risk Visibility Improved</div><div class="value green">42%</div></div>
      <div class="card"><div class="label">Compliance Review Faster</div><div class="value green">35%</div></div>
    </div>

    <h2>Recruiter Signal</h2>
    <div class="grid2">
      <div class="card">
        <div class="label">Overall Portfolio Score</div>
        <div class="score">${overallPortfolioScore}/100</div>
      </div>
      <div class="card">
        <div class="label">Role Fit</div>
        <p class="subtitle">Business Analyst, Data Analyst, CRM Analyst, AML Analyst, Customer Success Analyst and Dashboard/Product Analytics roles.</p>
      </div>
    </div>

    <h2>Features Demonstrated</h2>
    <ul>
      <li>Executive War Room and Boardroom Mode</li>
      <li>CRM Analytics and Customer 360 Profile</li>
      <li>AML/KYC Risk Monitoring and Case Kanban</li>
      <li>AI Copilot Sidebar and AI Chat Simulator</li>
      <li>Scenario Simulator and Business Impact Forecasting</li>
      <li>Global Risk Map and Investigation Workspace</li>
      <li>Audit Trail, SLA Tracker and Data Quality Monitor</li>
      <li>Live animated cloud background with premium SaaS UI</li>
    </ul>

    <h2>Skills Mapping</h2>
    <div>
      <span class="badge">CRM Analytics</span>
      <span class="badge">AML Compliance</span>
      <span class="badge">Customer Success</span>
      <span class="badge">Risk Intelligence</span>
      <span class="badge">Dashboard Design</span>
      <span class="badge">Product Thinking</span>
      <span class="badge">Executive Reporting</span>
      <span class="badge">Frontend Engineering</span>
    </div>

    <h2>Tech Stack</h2>
    <ul>
      <li>Next.js App Router</li>
      <li>TypeScript</li>
      <li>Tailwind CSS</li>
      <li>Recharts</li>
      <li>Framer Motion</li>
      <li>Single-file interactive SaaS dashboard architecture</li>
    </ul>

    <h2>Why Hire Me</h2>
    <p class="subtitle">
      This project shows that I can build more than charts. I can understand business problems,
      design executive dashboards, create analyst workflows, think like a product builder,
      and present data in a way that helps teams make decisions.
    </p>

    <div class="footer">
      Generated from Nexus360 V8 Cloud Edition • Built by Chetendra Singh Jadoun
    </div>
  </div>
</body>
</html>
`;

    const blob = new Blob([reportHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Nexus360-V8-Premium-Executive-Report.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const pageClass = presentationMode
    ? "min-h-screen overflow-hidden bg-black text-white"
    : darkMode
    ? "min-h-screen overflow-hidden bg-[#020617] text-white"
    : "min-h-screen overflow-hidden bg-slate-100 text-slate-950";
  const cardClass = darkMode ? "border border-white/10 bg-white/10 backdrop-blur-xl" : "border border-slate-200 bg-white shadow-xl";
  const rowClass = darkMode ? "rounded-2xl bg-white/10 p-4 text-sm" : "rounded-2xl bg-slate-100 p-4 text-sm";
  const muted = darkMode ? "text-slate-300" : "text-slate-600";

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 text-white">
        <AnimatedCloudBackground darkMode={true} />

        <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black text-cyan-300">🚀 Nexus360 V8</h1>
            <p className="mt-3 text-slate-300">Cloud Edition Recruiter Demo Login</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-slate-400">Email</p>
              <p className="mt-1 font-bold text-cyan-200">recruiter@nexus360.com</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs text-slate-400">Password</p>
              <p className="mt-1 font-bold text-cyan-200">demo123</p>
            </div>

            <button onClick={() => setLoggedIn(true)} className="w-full rounded-2xl bg-cyan-400 px-6 py-4 font-black text-black transition hover:scale-[1.02]">
              Enter Cloud Edition Dashboard
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            CRM Analyst • AML Analyst • Customer Success • Dashboard Portfolio
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className={pageClass}>
      <AnimatedCloudBackground darkMode={darkMode} />
      <div className="pointer-events-none fixed inset-0">
        <div className={darkMode ? "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.16),transparent_40%)]" : "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_35%)]"} />
      </div>

      <nav className={darkMode ? "sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl" : "sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-2xl"}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-14">
          <div>
            <h1 className="text-2xl font-black text-cyan-400">🚀 Nexus360 V8</h1>
            <p className={darkMode ? "text-xs text-slate-400" : "text-xs text-slate-600"}>Cloud Edition AI Enterprise Intelligence Platform</p>
          </div>

          <div className="hidden gap-6 text-sm font-bold lg:flex">
            <a href="#war-room" className="hover:text-cyan-400">War Room</a>
            <a href="#dashboard" className="hover:text-cyan-400">Dashboard</a>
            <a href="#command" className="hover:text-cyan-400">Command</a>
            <a href="#simulator" className="hover:text-cyan-400">Simulator</a>
            <a href="#recruiter" className="hover:text-cyan-400">Hire View</a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-bold text-cyan-400">
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button onClick={() => setPresentationMode(!presentationMode)} className="hidden rounded-full border border-purple-400/40 px-4 py-2 text-sm font-bold text-purple-400 md:block">
              {presentationMode ? "Exit Board" : "Boardroom"}
            </button>
            <button onClick={() => setShowRecruiterDeck(true)} className="hidden rounded-full border border-green-400/40 px-4 py-2 text-sm font-bold text-green-400 md:block">
              Hire View
            </button>
            <button onClick={() => setShowAlerts(!showAlerts)} className="relative rounded-full border border-yellow-400/40 px-4 py-2 text-sm font-bold text-yellow-400">
              🔔
              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 text-xs text-white">4</span>
            </button>
            <button onClick={exportReport} className="hidden rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 font-bold text-cyan-400 md:block">
              Export
            </button>
          </div>
        </div>
      </nav>

      {showAlerts && (
        <div className="fixed right-6 top-24 z-50 w-[340px] rounded-[2rem] border border-yellow-400/30 bg-[#020617]/95 p-6 text-white shadow-2xl backdrop-blur-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">Notification Center</p>
          <div className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-2xl bg-white/10 p-4 text-sm text-slate-200">{alert}</div>
            ))}
          </div>
        </div>
      )}

      <aside className="fixed right-6 top-36 z-40 hidden w-[340px] rounded-[2rem] border border-cyan-400/20 bg-[#020617]/90 p-6 text-white shadow-2xl backdrop-blur-2xl xl:block">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">AI Assistant</p>
        <h3 className="mt-3 text-2xl font-black">Risk Copilot</h3>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            ["risk", "Risk"],
            ["churn", "Churn"],
            ["action", "Action"],
          ].map(([key, label]) => (
            <button key={key} onClick={() => setSelectedInsight(key)} className={selectedInsight === key ? "rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-black" : "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white"}>
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/10 p-4">
          <p className="text-sm leading-relaxed text-slate-200">{aiInsight}</p>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">AI Chat</p>
          <div className="mt-3 max-h-44 space-y-2 overflow-y-auto pr-1">
            {chatMessages.map((msg, index) => (
              <div key={`${msg.from}-${index}`} className={msg.from === "ai" ? "rounded-2xl bg-cyan-400/10 p-3 text-xs text-slate-200" : "rounded-2xl bg-purple-400/10 p-3 text-xs text-slate-200"}>
                <span className="font-bold text-cyan-300">{msg.from === "ai" ? "AI" : "You"}:</span> {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Ask risk..." className="min-w-0 flex-1 rounded-xl bg-white/10 px-3 py-2 text-xs outline-none" />
            <button onClick={sendChat} className="rounded-xl bg-cyan-400 px-3 py-2 text-xs font-black text-black">Send</button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-red-500/10 p-4">
            <p className="text-xs text-slate-400">Priority</p>
            <p className="mt-1 font-black text-red-300">High</p>
          </div>
          <div className="rounded-2xl bg-cyan-500/10 p-4">
            <p className="text-xs text-slate-400">Playbook</p>
            <p className="mt-1 font-black text-cyan-300">{completedSteps}/4 Done</p>
          </div>
        </div>
      </aside>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-14 xl:pr-[390px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-400">
            🏆 V8 Cloud Edition SaaS Demo • CRM + AML + AI Copilot + Simulation
          </div>
          <h2 className="max-w-6xl text-5xl font-black leading-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] md:text-7xl">
            AI Powered CRM, AML & Executive Risk Command Center.
          </h2>
          <p className={`mt-8 max-w-3xl text-xl font-semibold leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] ${muted}`}>
            A premium portfolio product with command search, customer 360, role-based views, AI chat, kanban cases, risk simulation, audit trail and board reporting.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Revenue", "$218K", "+24.6%", "text-cyan-400"],
              ["Customers", "148", "+18.1%", "text-green-400"],
              ["AML Alerts", "34", "High priority", "text-yellow-400"],
              ["Cases Closed", "92%", "This month", "text-purple-400"],
            ].map(([label, value, sub, color]) => (
              <motion.div whileHover={{ y: -6 }} key={label} className={`rounded-3xl p-6 ${cardClass}`}>
                <p className={`text-sm font-bold ${color}`}>{label}</p>
                <h3 className="mt-3 text-4xl font-black">{value}</h3>
                <p className={`mt-2 text-sm ${muted}`}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      <section id="war-room" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-8 ${cardClass}`}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-400">Executive War Room</p>
              <h2 className="mt-3 text-5xl font-black">Board Attention Dashboard</h2>
              <p className={`mt-4 max-w-3xl ${muted}`}>One-screen decision layer for hiring managers, founders and executives: what is growing, what is risky and what action should happen next.</p>
            </div>
            <button onClick={() => setShowRecruiterDeck(true)} className="rounded-full bg-green-400 px-6 py-4 font-black text-black">Open Hiring Manager View</button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ["Revenue at Risk", "$" + revenueAtRisk.toLocaleString(), "High-risk ARR exposure", "text-red-400"],
              ["AML Exposure", "87%", "Requires board visibility", "text-yellow-400"],
              ["Churn Exposure", "2 accounts", "Urban Pay + Nova Finance", "text-orange-400"],
              ["Playbook Progress", completedSteps + "/4", "Action completion", "text-cyan-400"],
              ["Portfolio Score", overallPortfolioScore + "/100", "Recruiter signal", "text-green-400"],
            ].map(([label, value, text, color]) => (
              <motion.div whileHover={{ y: -5 }} key={label} className={darkMode ? "rounded-3xl border border-white/10 bg-black/20 p-6" : "rounded-3xl border border-slate-200 bg-slate-50 p-6"}>
                <p className={`text-sm font-bold ${color}`}>{label}</p>
                <h3 className="mt-3 text-3xl font-black">{value}</h3>
                <p className={`mt-2 text-xs ${muted}`}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="recruiter" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-8 ${cardClass}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">Hiring Manager Mode</p>
          <h2 className="mt-3 text-5xl font-black">Why This Project Should Get an Interview</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className={darkMode ? "rounded-[2rem] bg-green-400/10 p-7" : "rounded-[2rem] bg-green-50 p-7"}>
              <p className="text-sm text-green-400">Overall Portfolio Signal</p>
              <h3 className="mt-4 text-7xl font-black text-green-400">{overallPortfolioScore}</h3>
              <p className={`mt-4 ${muted}`}>Combines business analytics, AML domain knowledge, SaaS UI thinking, customer intelligence, workflow design and executive storytelling.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {skillBadges.map((badge) => <span key={badge} className="rounded-full border border-green-400/30 px-3 py-2 text-xs font-bold text-green-400">{badge}</span>)}
              </div>
            </div>

            <div className="space-y-4">
              {portfolioScores.map(([label, score]) => (
                <div key={String(label)} className={rowClass}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{label}</p>
                    <p className="font-black text-green-400">{score}/100</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-green-400" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="global-risk" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-8 ${cardClass}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Global Risk Map</p>
          <h2 className="mt-3 text-5xl font-black">Regional Exposure Intelligence</h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.20),transparent_60%)]">
              <div className="absolute inset-8 rounded-[50%] border border-cyan-400/20" />
              <div className="absolute inset-16 rounded-[50%] border border-purple-400/20" />
              <div className="absolute left-[18%] top-[32%] h-16 w-36 rounded-full border border-cyan-400/20 bg-cyan-400/10 blur-sm" />
              <div className="absolute right-[20%] top-[44%] h-20 w-44 rounded-full border border-purple-400/20 bg-purple-400/10 blur-sm" />
              {globalRiskExposure.map((item) => (
                <button key={item.region} onClick={() => setQuery(item.region)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: item.x, top: item.y }}>
                  <span className={item.risk === "High" ? "block h-5 w-5 animate-pulse rounded-full bg-red-400 shadow-[0_0_30px_rgba(248,113,113,0.9)]" : item.risk === "Medium" ? "block h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_24px_rgba(250,204,21,0.8)]" : "block h-4 w-4 rounded-full bg-green-400 shadow-[0_0_24px_rgba(74,222,128,0.8)]"} />
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {globalRiskExposure.map((item) => (
                <div key={item.region} className={rowClass}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{item.region}</p>
                    <p className={getRiskClass(item.risk)}>{item.risk}</p>
                  </div>
                  <p className={`mt-1 text-sm ${muted}`}>Exposure: {item.exposure}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="investigation" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-8 ${cardClass}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-400">AI Investigation Workspace</p>
              <h2 className="mt-3 text-5xl font-black">Case Evidence Room</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {cases.map((c) => (
                <button key={c.id} onClick={() => setSelectedCaseId(c.id)} className={selectedCaseId === c.id ? "rounded-full bg-red-400 px-4 py-2 text-sm font-bold text-black" : "rounded-full border border-red-400/30 px-4 py-2 text-sm font-bold text-red-400"}>{c.id}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className={darkMode ? "rounded-[2rem] bg-red-500/10 p-6" : "rounded-[2rem] bg-red-50 p-6"}>
              <p className="text-sm text-red-400">Selected Case</p>
              <h3 className="mt-2 text-4xl font-black">{selectedCase.id}</h3>
              <p className={`mt-3 ${muted}`}>{selectedCase.customer} • {selectedCase.type}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-400">Score</p><p className="text-2xl font-black text-red-400">{selectedCase.score}</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-400">SLA</p><p className="text-2xl font-black text-yellow-400">{selectedCase.sla}</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-400">Owner</p><p className="text-sm font-black text-cyan-400">{selectedCase.owner}</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-slate-400">Status</p><p className="text-sm font-black text-green-400">{selectedCase.status}</p></div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {investigationEvidence.map((evidence) => (
                <div key={evidence} className={rowClass}>
                  <p className="font-bold text-cyan-400">Evidence</p>
                  <p className={`mt-2 ${muted}`}>{evidence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section id="command" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-7 ${cardClass}`}>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Command Palette</p>
              <h2 className="mt-3 text-4xl font-black">Search Customer, Case or Transaction</h2>
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try: Nova, CASE-1042, High..." className={darkMode ? "w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none md:w-[420px]" : "w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-950 outline-none md:w-[420px]"} />
          </div>

          {query && (
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {searchResults.length > 0 ? searchResults.map((result) => (
                <button key={`${result.type}-${result.title}`} onClick={() => result.customer && setSelectedCustomer(result.customer)} className={darkMode ? "rounded-2xl bg-white/10 p-4 text-left hover:bg-cyan-400/10" : "rounded-2xl bg-slate-100 p-4 text-left hover:bg-cyan-50"}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{result.type}</p>
                  <h3 className="mt-2 text-xl font-black">{result.title}</h3>
                  <p className={`mt-1 text-sm ${muted}`}>{result.subtitle}</p>
                </button>
              )) : <p className={muted}>No matching demo records found.</p>}
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className={`rounded-[2rem] p-7 ${cardClass}`}>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Role Switcher</p>
            <h2 className="mt-3 text-4xl font-black">Product Mode</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {(["Executive", "AML Analyst", "Customer Success", "Admin"] as RoleMode[]).map((role) => (
                <button key={role} onClick={() => setRoleMode(role)} className={roleMode === role ? "rounded-full bg-purple-400 px-5 py-3 font-bold text-black" : "rounded-full border border-purple-400/30 px-5 py-3 font-bold text-purple-400"}>
                  {role}
                </button>
              ))}
            </div>
            <p className={`mt-6 ${muted}`}>{roleSummary}</p>
          </div>

          <div className={`rounded-[2rem] p-7 ${cardClass}`}>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Live Activity Feed</p>
            <h2 className="mt-3 text-4xl font-black">Today’s Activity</h2>
            <div className="mt-6 space-y-3">
              {activities.map(([time, text]) => (
                <div key={time} className={rowClass}>
                  <p className="font-bold text-cyan-400">{time}</p>
                  <p className={`mt-1 ${muted}`}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="simulator" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-7 ${cardClass}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">Scenario Simulator</p>
          <h2 className="mt-3 text-4xl font-black">What-If Business Impact</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div>
              <label className="font-bold text-cyan-400">Revenue Lift: {scenario.revenueLift}%</label>
              <input type="range" min="0" max="40" value={scenario.revenueLift} onChange={(e) => setScenario({ ...scenario, revenueLift: Number(e.target.value) })} className="mt-4 w-full" />
            </div>
            <div>
              <label className="font-bold text-red-400">Risk Reduction: {scenario.riskReduction}%</label>
              <input type="range" min="0" max="40" value={scenario.riskReduction} onChange={(e) => setScenario({ ...scenario, riskReduction: Number(e.target.value) })} className="mt-4 w-full" />
            </div>
            <div>
              <label className="font-bold text-green-400">Health Lift: {scenario.healthLift}%</label>
              <input type="range" min="0" max="20" value={scenario.healthLift} onChange={(e) => setScenario({ ...scenario, healthLift: Number(e.target.value) })} className="mt-4 w-full" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Simulated Revenue", "$" + simulatedRevenue.toLocaleString(), "text-cyan-400"],
              ["Simulated Risk Score", simulatedRisk + "%", "text-red-400"],
              ["Simulated Health", simulatedHealth + "%", "text-green-400"],
            ].map(([label, value, color]) => (
              <div key={label} className={`rounded-3xl p-6 ${darkMode ? "bg-white/10" : "bg-slate-100"}`}>
                <p className={`text-sm font-bold ${color}`}>{label}</p>
                <h3 className="mt-3 text-4xl font-black">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="playbook" className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-7 ${cardClass}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-red-400">Risk Playbook</p>
              <h2 className="mt-3 text-4xl font-black">High-Risk Action Checklist</h2>
            </div>
            <p className="rounded-full bg-cyan-400 px-5 py-3 font-black text-black">{completedSteps}/4 Completed</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["kyc", "Refresh KYC", "Request updated documents"],
              ["escalate", "Escalate Case", "Assign senior analyst"],
              ["transaction", "Review Transactions", "Check velocity spike"],
              ["outreach", "Customer Outreach", "Schedule success call"],
            ].map(([key, title, text]) => (
              <button key={key} onClick={() => setPlaybook((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))} className={(playbook[key as keyof typeof playbook] ? "border-green-400/50 bg-green-500/20" : darkMode ? "border-white/10 bg-white/10" : "border-slate-200 bg-white") + " rounded-3xl border p-6 text-left transition hover:-translate-y-1"}>
                <p className="text-3xl">{playbook[key as keyof typeof playbook] ? "✅" : "⬜"}</p>
                <h3 className="mt-4 text-xl font-black">{title}</h3>
                <p className={`mt-2 text-sm ${muted}`}>{text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="dashboard" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Executive Dashboard</p>
        <h2 className="mt-4 text-5xl font-black">Business Performance Overview</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {(["CEO", "CRO", "AML", "CS"] as ViewMode[]).map((view) => (
            <button key={view} onClick={() => setViewMode(view)} className={viewMode === view ? "rounded-full bg-cyan-400 px-5 py-3 font-bold text-black" : "rounded-full border border-cyan-400/30 px-5 py-3 font-bold text-cyan-400"}>
              {view} View
            </button>
          ))}
        </div>

        <div className={`mt-6 rounded-3xl p-6 ${cardClass}`}>
          <p className={muted}>{viewSummary}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Total Revenue", "$" + totalRevenue.toLocaleString(), "Portfolio metric"],
            ["Avg Health Score", avgHealth + "%", "Customer success"],
            ["High Risk Accounts", highRisk.toString(), "AML review needed"],
            ["Open Tickets", totalTickets.toString(), "Support workload"],
            ["Case Closure", "92%", "Investigation KPI"],
            ["Fraud Risk Score", "87", "AI engine"],
          ].map(([label, value, status]) => (
            <motion.div whileHover={{ y: -5 }} key={label} className={`rounded-3xl p-7 ${cardClass}`}>
              <p className={`text-sm ${muted}`}>{label}</p>
              <h3 className="mt-4 text-4xl font-black">{value}</h3>
              <p className="mt-3 text-sm font-bold text-cyan-400">{status}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className={`rounded-[2rem] p-8 ${cardClass}`}>
            <h3 className="mb-6 text-2xl font-bold text-cyan-400">Revenue Growth Trend</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#22d3ee" fill="#0891b2" fillOpacity={0.35} strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${cardClass}`}>
            <h3 className="mb-6 text-2xl font-bold text-purple-400">Customer Growth</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="customers" stroke="#a78bfa" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section id="crm" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-400">CRM Intelligence</p>
        <h2 className="mt-4 text-5xl font-black">Customer Success Command Center</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className={`overflow-x-auto rounded-[2rem] p-6 ${cardClass}`}>
            <div className="min-w-[750px]">
              <div className="grid grid-cols-6 rounded-2xl bg-cyan-400/10 p-4 text-sm font-bold text-cyan-400">
                <p>Customer</p><p>Industry</p><p>Status</p><p>Risk</p><p>Revenue</p><p>Health</p>
              </div>
              <div className="mt-4 space-y-3">
                {customers.map((c) => (
                  <button key={c.name} onClick={() => setSelectedCustomer(c)} className={`${rowClass} grid w-full grid-cols-6 text-left transition hover:bg-cyan-400/10`}>
                    <p className="font-bold">{c.name}</p>
                    <p>{c.industry}</p>
                    <p>{c.status}</p>
                    <p className={getRiskClass(c.risk)}>{c.risk}</p>
                    <p>${c.revenue.toLocaleString()}</p>
                    <p className="font-bold text-cyan-400">{c.health}%</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${cardClass}`}>
            <h3 className="mb-6 text-2xl font-bold text-purple-400">Health Distribution</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={healthData} dataKey="value" nameKey="name" outerRadius={120} label>
                    {healthData.map((_, index) => <Cell key={index} fill={pieColors[index]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section id="aml" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-red-400">AML / KYC Monitoring</p>
        <h2 className="mt-4 text-5xl font-black">Risk Screening Matrix</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {(["All", "Low", "Medium", "High"] as RiskFilter[]).map((item) => (
            <button key={item} onClick={() => setRiskFilter(item)} className={riskFilter === item ? "rounded-full bg-cyan-400 px-5 py-3 font-bold text-black" : "rounded-full border border-cyan-400/30 px-5 py-3 font-bold text-cyan-400"}>
              {item} Risk
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {filteredCustomers.map((c) => (
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => setSelectedCustomer(c)} key={c.name} className={(c.risk === "High" ? "rounded-3xl border border-red-400/30 bg-red-500/20 p-6" : c.risk === "Medium" ? "rounded-3xl border border-yellow-400/30 bg-yellow-500/20 p-6" : "rounded-3xl border border-green-400/30 bg-green-500/20 p-6") + " text-left"}>
              <p className="text-xl font-bold">{c.name}</p>
              <p className={`mt-3 text-sm ${muted}`}>KYC: {c.kyc}</p>
              <p className={`mt-2 text-sm ${muted}`}>Revenue: ${c.revenue.toLocaleString()}</p>
              <p className="mt-5 font-bold">Risk Level: {c.risk}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className={`rounded-[2rem] p-8 ${cardClass}`}>
            <h3 className="mb-6 text-2xl font-bold text-red-400">AML Risk Distribution</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="risk" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#fb7185" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${cardClass}`}>
            <h3 className="mb-6 text-2xl font-bold text-cyan-400">AI Risk Gauge</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{ name: "Risk", value: 87, fill: "#ef4444" }]} startAngle={180} endAngle={0}>
                  <RadialBar dataKey="value" cornerRadius={20} />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-5xl font-black text-red-400">87%</p>
            <p className={`mt-2 text-center ${muted}`}>High priority compliance risk</p>
          </div>
        </div>
      </section>

      <section id="kanban" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">Case Kanban</p>
        <h2 className="mt-4 text-5xl font-black">Investigation Workflow Board</h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {(["Open", "Review", "Escalated", "Closed"] as CaseStatus[]).map((status) => (
            <div key={status} className={`rounded-[2rem] p-5 ${cardClass}`}>
              <h3 className="text-xl font-black text-cyan-400">{status}</h3>
              <div className="mt-5 space-y-4">
                {cases.filter((c) => c.status === status).map((c) => (
                  <div key={c.id} className={darkMode ? "rounded-2xl bg-white/10 p-4" : "rounded-2xl bg-slate-100 p-4"}>
                    <p className="font-black">{c.id}</p>
                    <p className={`mt-1 text-sm ${muted}`}>{c.customer}</p>
                    <p className="mt-2 text-sm text-red-400">Score: {c.score}</p>
                    <p className="mt-1 text-xs text-yellow-400">SLA: {c.sla}</p>
                  </div>
                ))}
                {cases.filter((c) => c.status === status).length === 0 && <p className={`text-sm ${muted}`}>No active cards</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="audit" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className={`rounded-[2rem] p-7 ${cardClass}`}>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Audit Trail</p>
            <h2 className="mt-3 text-4xl font-black">Compliance Activity Log</h2>
            <div className="mt-6 space-y-3">
              {auditTrail.map(([actor, action, status]) => (
                <div key={`${actor}-${action}`} className={rowClass}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-bold text-cyan-400">{actor}</p>
                    <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-yellow-400">{status}</p>
                  </div>
                  <p className={`mt-2 ${muted}`}>{action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${cardClass}`}>
            <p className="text-sm uppercase tracking-[0.3em] text-green-400">Data Quality Monitor</p>
            <h2 className="mt-3 text-4xl font-black">Operational Readiness</h2>
            <div className="mt-6 space-y-4">
              {dataQuality.map(([label, score, note]) => (
                <div key={String(label)} className={rowClass}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{label}</p>
                    <p className="font-black text-green-400">{score}%</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-green-400" style={{ width: `${score}%` }} />
                  </div>
                  <p className={`mt-2 text-xs ${muted}`}>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-orange-400">Transaction Monitoring</p>
        <h2 className="mt-4 text-5xl font-black">Suspicious Activity Queue</h2>
        <div className={`mt-10 overflow-x-auto rounded-[2rem] p-6 ${cardClass}`}>
          <div className="min-w-[700px] space-y-3">
            {transactions.map(([id, customer, amount, reason, risk]) => (
              <div key={id} className={`${rowClass} grid grid-cols-5`}>
                <p className="font-bold">{id}</p>
                <p>{customer}</p>
                <p>{amount}</p>
                <p>{reason}</p>
                <p className={getRiskClass(risk)}>{risk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="system-health" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-green-400">System Health Center</p>
        <h2 className="mt-4 text-5xl font-black">Enterprise Readiness Monitor</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {systemHealth.map(([label, value, status]) => (
            <div key={label} className={`rounded-3xl p-6 ${cardClass}`}>
              <p className="text-sm font-bold text-green-400">{label}</p>
              <h3 className="mt-3 text-3xl font-black">{value}</h3>
              <p className={`mt-2 text-xs ${muted}`}>{status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Board Report Preview</p>
        <h2 className="mt-4 text-5xl font-black">Executive Storytelling Layer</h2>
        <div className={`mt-10 rounded-[2rem] p-8 ${cardClass}`}>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm text-green-400">Growth</p>
              <h3 className="mt-2 text-3xl font-black">Revenue up 24.6%</h3>
              <p className={`mt-3 text-sm ${muted}`}>Customer expansion and stronger retention are driving business growth.</p>
            </div>
            <div>
              <p className="text-sm text-red-400">Risk</p>
              <h3 className="mt-2 text-3xl font-black">2 high-risk accounts</h3>
              <p className={`mt-3 text-sm ${muted}`}>Nova Finance and Urban Pay need priority compliance attention.</p>
            </div>
            <div>
              <p className="text-sm text-cyan-400">Action</p>
              <h3 className="mt-2 text-3xl font-black">Escalate + outreach</h3>
              <p className={`mt-3 text-sm ${muted}`}>AML and customer success teams should coordinate next steps.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="case-study" className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-14 xl:pr-[390px]">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Portfolio Architecture</p>
        <h2 className="mt-4 text-5xl font-black">How This Product Is Built</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            ["Frontend", "Next.js App Router, TypeScript, Tailwind CSS"],
            ["Visualization", "Recharts dashboards, risk gauge, trend analytics"],
            ["UX Layer", "Role switcher, command palette, modal workflows, kanban and simulator"],
            ["Business Logic", "CRM health, AML risk, churn, SLA, data quality and case prioritization"],
          ].map(([title, text]) => (
            <motion.div whileHover={{ y: -5 }} key={title} className={`rounded-3xl p-8 ${cardClass}`}>
              <h3 className="text-2xl font-bold text-cyan-400">{title}</h3>
              <p className={`mt-4 leading-relaxed ${muted}`}>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-14 xl:pr-[390px]">
        <div className={`rounded-[2rem] p-8 text-center ${cardClass}`}>
          <h3 className="text-4xl font-black text-cyan-400">Nexus360 V8</h3>
          <p className="mt-3 text-xl font-bold">Final Boss AI Powered Enterprise Intelligence Platform</p>
          <p className={`mt-6 ${muted}`}>Developed & Deployed By</p>
          <h4 className="mt-2 text-2xl font-black">Chetendra Singh Jadoun</h4>
          <p className={`mt-5 text-sm uppercase tracking-[0.25em] ${muted}`}>
            CRM Analytics | AML Compliance | Customer Success | AI Risk Intelligence
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="https://github.com/chetendrasince1999" target="_blank" rel="noopener noreferrer" className="rounded-full border border-cyan-400/40 px-5 py-3 font-bold text-cyan-400">GitHub</a>
            <a href="#case-study" className="rounded-full border border-purple-400/40 px-5 py-3 font-bold text-purple-400">Architecture</a>
            <button onClick={exportReport} className="rounded-full bg-cyan-400 px-5 py-3 font-bold text-black">Download Report</button>
          </div>
        </div>
      </footer>


      {showRecruiterDeck && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-green-400/30 bg-[#020617] p-8 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-green-300">Hiring Manager View</p>
                <h2 className="mt-3 text-5xl font-black">Why Nexus360 V8 deserves an interview</h2>
                <p className="mt-4 max-w-3xl text-slate-300">This project shows product thinking, analytics storytelling, CRM/AML understanding, interactive frontend engineering and executive-grade presentation.</p>
              </div>
              <button onClick={() => setShowRecruiterDeck(false)} className="rounded-full bg-white/10 px-4 py-2 font-bold">✕</button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {[
                ["Overall Score", overallPortfolioScore + "/100"],
                ["Features", "25+"],
                ["Domain Areas", "CRM + AML"],
                ["Install Risk", "Zero extra"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white/10 p-6">
                  <p className="text-sm text-slate-400">{label}</p>
                  <h3 className="mt-3 text-3xl font-black text-green-300">{value}</h3>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ["Business Problem", "Disconnected CRM, AML, compliance and executive reporting workflows."],
                ["Solution", "Single AI-powered command center with customer 360, risk scoring, case workflow and board reporting."],
                ["Why it matters", "Recruiters can see business logic, product thinking and practical dashboards in one demo."],
                ["Role Fit", "CRM Analyst, AML Analyst, Customer Success, Business Analyst, Data Analyst and Dashboard roles."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl bg-cyan-400/10 p-6">
                  <h3 className="text-2xl font-bold text-cyan-300">{title}</h3>
                  <p className="mt-3 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-cyan-400/20 bg-[#020617] p-8 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Customer 360 Profile</p>
                <h2 className="mt-3 text-4xl font-black">{selectedCustomer.name}</h2>
                <p className="mt-2 text-slate-300">{selectedCustomer.industry} • {selectedCustomer.status}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="rounded-full bg-white/10 px-4 py-2 font-bold">✕</button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Risk", selectedCustomer.risk],
                ["Revenue", "$" + selectedCustomer.revenue.toLocaleString()],
                ["Health", selectedCustomer.health + "%"],
                ["NPS", selectedCustomer.nps],
                ["Tickets", selectedCustomer.tickets],
                ["KYC", selectedCustomer.kyc],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-black text-cyan-300">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-cyan-400/10 p-5">
                <p className="font-bold text-cyan-300">AI Recommendation</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  {selectedCustomer.risk === "High"
                    ? "Prioritize enhanced due diligence, review recent transactions and assign this account to an AML analyst."
                    : selectedCustomer.risk === "Medium"
                    ? "Monitor account health and schedule proactive customer success outreach."
                    : "Customer is healthy. Maintain relationship and continue standard monitoring."}
                </p>
              </div>
              <div className="rounded-3xl bg-purple-400/10 p-5">
                <p className="font-bold text-purple-300">Timeline</p>
                <div className="mt-3 space-y-2 text-sm text-slate-200">
                  <p>• Customer health reviewed</p>
                  <p>• KYC status checked</p>
                  <p>• Risk score generated</p>
                  <p>• Recommended action assigned</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 rounded-full bg-cyan-400 px-5 py-4 text-2xl font-black text-black shadow-xl">
        ↑
      </button>
    </main>
  );
}
