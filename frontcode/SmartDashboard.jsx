import React, { useState, useMemo } from 'react';
import { 
  Activity, ShieldAlert, CheckCircle, Users, 
  PhoneCall, Server, Lock, Layers, 
  LayoutGrid, Settings, Bell, Search, 
  MoreVertical, ArrowRight, PlayCircle, Globe,
  Mic, Fingerprint, HeartPulse, FileText, ChevronDown, Sparkles, X,
  CreditCard, Home, Briefcase, Smartphone, AlertTriangle, PieChart, Wallet,
  UploadCloud, FileUp, Loader2, Clock, AlertOctagon, Zap, BarChart3, Receipt,
  Eye, EyeOff, ShieldCheck, Skull
} from 'lucide-react';

// --- EXPANDED LANGUAGE LIST ---
const LANGUAGES = [
  { code: 'hi', name: 'Hindi (हिंदी)', type: 'Indian' },
  { code: 'bn', name: 'Bengali (বাংলা)', type: 'Indian' },
  { code: 'te', name: 'Telugu (తెలుగు)', type: 'Indian' },
  { code: 'mr', name: 'Marathi (मराठी)', type: 'Indian' },
  { code: 'ta', name: 'Tamil (தமிழ்)', type: 'Indian' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)', type: 'Indian' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', type: 'Indian' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', type: 'Indian' },
  { code: 'ur', name: 'Urdu (اردو)', type: 'Indian' },
  { code: 'en', name: 'English', type: 'Global' },
  { code: 'es', name: 'Spanish', type: 'Global' },
  { code: 'fr', name: 'French', type: 'Global' },
];

// --- 1. DETAILED MOCK DATA (With PII & Profanity) ---
const DETAILED_MOCK_DATA = {
  risk_score: 85,
  risk_reasons: ["Profanity Detected", "High Stress", "PII Leak Risk"],
  overall_emotion: "Hostile / Anxious",
  physics: { pitch: 235, jitter: 0.06 },
  
  // 💰 Financials
  financial_timeline: [
    { time: "00:12", term: "Outstanding EMI", value: "₹50,000", type: "money" },
    { time: "00:25", term: "Promise Date", value: "Friday, 14th", type: "date" }
  ],

  // 🤬 Profanity Timeline
  profanity_timeline: [
    { time: "00:19", word: "bullsh*t", category: "Obscene", severity: "High" },
    { time: "00:21", word: "damn", category: "Mild", severity: "Low" }
  ],

  // 🔐 PII (Protected Data)
  pii_data: [
    { time: "00:05", type: "PERSON", value: "Vikram Malhotra" },
    { time: "00:12", type: "PHONE", value: "+91-98765-XXXXX" },
    { time: "00:15", type: "PAN_CARD", value: "ABCDE1234F" },
    { time: "00:30", type: "ACCOUNT", value: "Acct #88291002" }
  ],

  // The Transcript
  segments: [
    { 
      speaker: 'Agent', start: 5.0, end: 8.5, 
      text: 'Good morning, am I speaking with Mr. Vikram Malhotra?',
      emotion: 'Neutral', reason: 'Standard Greeting', financials: []
    },
    { 
      speaker: 'Customer', start: 18.2, end: 23.0, 
      text: 'This is absolute bullsh*t! I told you I had an emergency!',
      emotion: 'Anger', reason: 'Profanity + High Volume', financials: []
    },
    { 
      speaker: 'Agent', start: 23.5, end: 25.0, 
      text: 'Sir, please calm down. We need the PAN details for verification.',
      emotion: 'Polite', reason: 'De-escalation attempt', financials: []
    },
    { 
      speaker: 'Customer', start: 25.5, end: 30.0, 
      text: 'Fine. It is ABCDE1234F. Just fix this damn account.',
      emotion: 'Frustrated', reason: 'Resignation + Mild Profanity', financials: []
    }
  ]
};

const INITIAL_CALLS = [
  { id: 'TX-101', name: 'Aarav Patel', intent: 'Balance Inquiry', priority: 'Low', domain: 'retail', time: '10:42 AM' },
  { id: 'TX-201', name: 'Rohan Gupta', intent: 'Block Lost Card', priority: 'High', domain: 'cards', time: '10:30 AM' },
  { id: 'TX-301', name: 'Vikram Malhotra', intent: 'Home Loan EMI', priority: 'Medium', domain: 'loans', time: '10:40 AM' },
  { id: 'TX-501', name: 'Anjali Devi', intent: 'Phishing Report', priority: 'High', domain: 'fraud', time: '10:15 AM' },
];

export default function SmartDashboard({ onLogout }) {
  const [view, setView] = useState('landing'); 
  const [language, setLanguage] = useState('en'); 

  return (
    <div style={{fontFamily: '"Inter", sans-serif', margin: 0, padding: 0}}>
      {view === 'landing' ? (
        <LandingPage onLogin={() => setView('dashboard')} />
      ) : (
        <DashboardView 
          onLogout={() => setView('landing')} 
          language={language} 
          setLanguage={setLanguage} 
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENT: LANDING PAGE
// ==========================================
const LandingPage = ({ onLogin }) => (
  <div style={styles.landingContainer}>
    <nav style={styles.navBar}>
      <div style={styles.logoSection}>
        <div style={styles.logoIcon}><Activity color="#EA580C" size={24} /></div>
        <span style={styles.logoText}>FinVoice<span style={{color:'#EA580C'}}>.ai</span></span>
      </div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.link}>Product</a>
        <a href="#" style={styles.link}>Security</a>
        <button onClick={onLogin} style={styles.loginBtn}>Login to Portal</button>
      </div>
    </nav>

    <header style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Universal Financial <br/><span style={styles.gradientText}>Audio Intelligence</span></h1>
        <p style={styles.heroSub}>
          Transform unstructured banking voice interactions into structured, reviewable, 
          and compliant digital records. Secured by Post-Quantum Cryptography.
        </p>
        <div style={styles.heroButtons}>
          <button onClick={onLogin} style={styles.primaryBtn}>
            Launch Platform <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      <div style={styles.heroVisual}>
        <div style={styles.glassCard}>
          <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
            <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#EF4444'}}></div>
            <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#F97316'}}></div>
            <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#10B981'}}></div>
          </div>
          <div style={{fontSize:'14px', color:'#7C2D12', marginBottom:'10px'}}>Processing Audio Stream...</div>
          <div style={styles.featureRow}>
            <div style={styles.featureTag}><HeartPulse size={12}/> Stress: Low</div>
            <div style={styles.featureTag}><Fingerprint size={12}/> Auth: Verified</div>
          </div>
          <div style={{height:'40px', background:'rgba(234, 88, 12, 0.1)', borderRadius:'8px', marginBottom:'10px', width:'80%'}}></div>
          <div style={{height:'40px', background:'rgba(234, 88, 12, 0.05)', borderRadius:'8px', width:'60%'}}></div>
          <div style={{marginTop:'20px', padding:'10px', background:'rgba(21, 128, 61, 0.1)', borderRadius:'8px', color:'#15803d', fontSize:'12px', fontWeight:'bold'}}>
            ✓ Intent: Promise to Pay (98%)
          </div>
        </div>
      </div>
    </header>
  </div>
);

// ==========================================
// COMPONENT: MAIN DASHBOARD
// ==========================================
const DashboardView = ({ onLogout, language, setLanguage }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardCalls, setDashboardCalls] = useState(INITIAL_CALLS);

  return (
    <div style={styles.dashboardContainer}>
      
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}><Activity color="#EA580C" size={24} /></div>
          <span style={styles.logoText}>FinVoice<span style={{color:'#FFF'}}>.ai</span></span>
        </div>

        <div style={styles.navMenu}>
          <NavItem icon={<LayoutGrid size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<FileText size={20} />} label="Transcripts" active={activeTab === 'transcripts'} onClick={() => setActiveTab('transcripts')} />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>

        <div style={styles.proCard}>
          <div style={styles.proIcon}><Lock size={16} color="#EA580C" /></div>
          <div style={{fontSize:'12px', color:'white', marginBottom:'8px', fontWeight:'600'}}>PQC Security Active</div>
          <div style={{fontSize:'10px', color:'rgba(255,255,255,0.9)'}}>Quantum-Safe Encryption</div>
        </div>

        <div onClick={onLogout} style={{...styles.navItem, marginTop:'20px', color:'#FFEDD5'}}>
             <ArrowRight size={20} style={{transform:'rotate(180deg)'}} /> <span>Logout</span>
        </div>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          
          <LanguageSelector currentLang={language} setLang={setLanguage} />

          <div style={styles.headerActions}>
            <div style={styles.searchBar}>
              <Search size={18} color="#EA580C" />
              <input type="text" placeholder="Search transcripts..." style={styles.searchInput} />
            </div>
            <div style={styles.iconBtn}><Bell size={20} /></div>
            <div style={styles.profilePic}>AD</div>
          </div>
        </header>

        <div style={styles.scrollableContent}>
          {activeTab === 'overview' ? (
            <OverviewTab calls={dashboardCalls} />
          ) : (
            <TranscriptTab 
              language={language} 
              setCalls={setDashboardCalls} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

// --- COMPONENT: SEARCHABLE LANGUAGE SELECTOR ---
const LanguageSelector = ({ currentLang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(lang => 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedLangName = LANGUAGES.find(l => l.code === currentLang)?.name || 'English';

  return (
    <div style={{position: 'relative', zIndex: 50}}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={styles.langTrigger}
      >
        <Globe size={16} color="#EA580C" />
        <span>{selectedLangName}</span>
        <ChevronDown size={14} color="#78716C" />
      </button>

      {isOpen && (
        <div style={styles.langDropdown}>
          <div style={styles.langSearchBox}>
            <Search size={14} color="#9CA3AF" />
            <input 
              autoFocus
              type="text" 
              placeholder="Search language..." 
              style={styles.langSearchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div style={styles.langList}>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map(lang => (
                <div 
                  key={lang.code}
                  onClick={() => {
                    setLang(lang.code);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  style={{
                    ...styles.langItem,
                    background: currentLang === lang.code ? '#FFF7ED' : 'white',
                    color: currentLang === lang.code ? '#EA580C' : '#431407',
                    borderLeft: currentLang === lang.code ? '3px solid #EA580C' : '3px solid transparent'
                  }}
                >
                  <div style={{fontSize:'12px', fontWeight: lang.type === 'Indian' ? '700' : '400'}}>
                    {lang.name}
                  </div>
                  {lang.type === 'Indian' && <span style={styles.indianTag}>IN</span>}
                </div>
              ))
            ) : (
              <div style={{padding:'8px 12px', fontSize:'12px', color:'#9CA3AF'}}>No language found</div>
            )}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          style={{position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:40}} 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

// --- TAB: OVERVIEW (DOMAIN + PRIORITY) ---
const OverviewTab = ({ calls }) => {
  const retailCalls = calls.filter(c => c.domain === 'retail');
  const cardsCalls = calls.filter(c => c.domain === 'cards');
  const loansCalls = calls.filter(c => c.domain === 'loans');
  const techCalls = calls.filter(c => c.domain === 'tech');
  const fraudCalls = calls.filter(c => c.domain === 'fraud');
  const corpCalls = calls.filter(c => c.domain === 'corporate');
  const crossCalls = calls.filter(c => c.domain === 'thirdparty');

  return (
    <>
      <div style={styles.pageHeader}>
        <h1 style={styles.h1}>Domain Priority Monitor</h1>
        <p style={styles.p}>Real-time analysis across 7 banking verticals.</p>
      </div>

      <div style={styles.statsGrid}>
        <StatCard label="Critical Priority Queue" value={calls.filter(c => c.priority === 'High').length} icon={<AlertOctagon color="#EF4444" />} trend="+5%" color="#EF4444" />
        <StatCard label="Avg Confidence" value="96%" icon={<CheckCircle color="#10B981" />} trend="+2.4%" color="#10B981" />
        <StatCard label="Active Interactions" value={calls.length} icon={<PhoneCall color="#EA580C" />} trend="Stable" color="#EA580C" />
        <StatCard label="PQC Encryption" value="Active" icon={<Lock color="#8B5CF6" />} trend="Secured" color="#8B5CF6" />
      </div>

      <div style={styles.domainGrid}>
        <DomainCard title="Retail Banking" icon={<Wallet size={18} color="#EA580C"/>} calls={retailCalls} />
        <DomainCard title="Card Services" icon={<CreditCard size={18} color="#EA580C"/>} calls={cardsCalls} />
        <DomainCard title="Loans & Mortgages" icon={<Home size={18} color="#EA580C"/>} calls={loansCalls} />
        <DomainCard title="Technical Support" icon={<Smartphone size={18} color="#EA580C"/>} calls={techCalls} />
        <DomainCard title="Fraud & Disputes" icon={<AlertTriangle size={18} color="#EA580C"/>} calls={fraudCalls} />
        <DomainCard title="Corporate / SME" icon={<Briefcase size={18} color="#EA580C"/>} calls={corpCalls} />
        <DomainCard title="3rd Party Products" icon={<PieChart size={18} color="#EA580C"/>} calls={crossCalls} />
      </div>
    </>
  );
};

// --- HELPER: DOMAIN CARD ---
const DomainCard = ({ title, icon, calls }) => (
  <div style={styles.card}>
    <div style={styles.cardHeader}>
      <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
        {icon}
        <h3>{title}</h3>
      </div>
      <span style={styles.domainCount}>{calls.length}</span>
    </div>
    <div style={styles.list}>
      {calls.length > 0 ? (
        calls.map((call, i) => <CallItem key={i} call={call} />)
      ) : (
        <div style={{fontSize:'12px', color:'#A8A29E', fontStyle:'italic'}}>No active calls</div>
      )}
    </div>
  </div>
);

// --- HELPER: CALL ITEM ROW ---
const CallItem = ({ call }) => (
  <div style={styles.listItem}>
    <div style={styles.avatarSmall}>{call.name.charAt(0)}</div>
    <div style={{flex:1}}>
      <div style={styles.itemName}>{call.name}</div>
      <div style={styles.itemSub}>{call.intent}</div>
    </div>
    <div style={{textAlign:'right'}}>
      <PriorityBadge level={call.priority} />
    </div>
  </div>
);

// ==========================================
// 🚀 TAB: TRANSCRIPT DETAIL (WITH PII & PROFANITY)
// ==========================================
const TranscriptTab = ({ language, setCalls }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState(null); 
  const [piiUnlocked, setPiiUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);

  // --- SIMULATE UPLOAD ---
  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setData(DETAILED_MOCK_DATA);
      setIsProcessing(false);
    }, 2000);
  };

  // --- PII UNLOCK LOGIC ---
  const handleUnlockPII = () => {
    if (passwordInput === "admin123") {
      setPiiUnlocked(true);
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
    }
  };

  return (
    <>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.h1}>AI Compliance & Analysis</h1>
          <p style={styles.p}>Detect Profanity, Protect PII, and Analyze Voice Physics.</p>
        </div>
        
        <button 
          onClick={handleSimulatedUpload} 
          disabled={isProcessing}
          style={{
            ...styles.uploadBtn, 
            opacity: isProcessing ? 0.7 : 1, 
            cursor: isProcessing ? 'wait' : 'pointer'
          }}
        >
          {isProcessing ? (
            <><Loader2 size={18} className="animate-spin" /> Scanning Audio...</>
          ) : (
            <><UploadCloud size={18} /> Upload Audio File (Demo)</>
          )}
        </button>
      </div>

      <div style={styles.transcriptGrid}>
        
        {/* --- LEFT: TRANSCRIPT --- */}
        <div style={styles.card}>
          <div style={{...styles.cardHeader, marginBottom:'20px'}}>
            <h3>{data ? "Live Transcript" : "Waiting for Upload..."}</h3>
            {data && <PriorityBadge level="High" />}
          </div>
          
          <div style={styles.audioPlayer}>
            <div style={styles.playBtn}><PlayCircle size={24} fill="#EA580C" stroke="none" /></div>
            <div style={styles.waveform}></div>
            <span style={{fontSize:'12px', fontWeight:'600', color:'#431407'}}>
               {data ? "00:30 / 03:15" : "--:--"}
            </span>
          </div>

          <div style={styles.chatContainer}>
            {data ? (
               data.segments.map((seg, i) => (
                <div key={i} style={{
                    ...styles.chatBubble, 
                    alignSelf: seg.speaker === 'Customer' ? 'flex-start' : 'flex-end',
                    background: seg.speaker === 'Customer' ? 'white' : '#FFF7ED',
                    border: seg.speaker === 'Customer' ? '1px solid #E7D5C9' : '1px solid #FFEDD5'
                  }}>
                  <div style={styles.chatHeader}>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                        <span style={{fontWeight:'bold', color:'#EA580C'}}>{seg.speaker}</span>
                        <span style={{color:'#9CA3AF', fontSize:'10px'}}>
                             {seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s
                        </span>
                    </div>
                    {/* EMOTION BADGE */}
                    <div style={styles.emotionBadge}>
                        <Zap size={10} /> {seg.emotion}
                    </div>
                  </div>
                  
                  <p style={{margin:'8px 0', color:'#431407', fontSize:'15px', lineHeight:'1.5'}}>{seg.text}</p>
                  
                  {/* REASONING & FINANCIALS */}
                  <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'8px'}}>
                      <span style={styles.tagReason}>
                          <Sparkles size={10} /> {seg.reason}
                      </span>
                  </div>
                </div>
               ))
            ) : (
                <div style={{textAlign:'center', padding:'40px', color:'#A8A29E'}}>
                    <FileUp size={48} style={{marginBottom:'16px', opacity:0.5}} />
                    <p>Upload a file to see granular timestamps and reasoning.</p>
                </div>
            )}
          </div>
        </div>

        {/* --- RIGHT: AI INTELLIGENCE --- */}
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
          
          {/* 1. RISK SCORE */}
          <div style={styles.card}>
            <h3 style={styles.cardHeaderSmall}>Risk Intelligence</h3>
            <div style={{textAlign:'center', padding:'10px 0'}}>
              <div style={{
                ...styles.riskCircle,
                borderColor: data ? (data.risk_score > 50 ? '#EF4444' : '#10B981') : '#E5E7EB' 
              }}>
                {data ? data.risk_score : '--'}
                <span style={{fontSize:'12px', fontWeight:'normal', marginTop:'5px'}}>Risk Score</span>
              </div>
            </div>
            <div style={styles.tagsContainer}>
              {data && data.risk_reasons.map((r, i) => (
                  <span key={i} style={styles.tagStress}>⚠️ {r}</span>
              ))}
            </div>
          </div>

          {/* 2. PROFANITY DETECTOR (NEW!) */}
          <div style={styles.card}>
            <h3 style={styles.cardHeaderSmall}>Profanity & Toxicity Monitor</h3>
            {data && data.profanity_timeline.length > 0 ? (
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    {data.profanity_timeline.map((item, i) => (
                        <div key={i} style={styles.profanityItem}>
                            <div style={styles.timelineTime}>{item.time}</div>
                            <div style={{flex:1}}>
                                <div style={{fontWeight:'700', color:'#B91C1C'}}>"{item.word}"</div>
                                <div style={{fontSize:'11px', color:'#78716C'}}>{item.category}</div>
                            </div>
                            <Skull size={16} color="#B91C1C" />
                        </div>
                    ))}
                </div>
            ) : <p style={{fontSize:'13px', color:'#10B981'}}>✅ No profanity detected.</p>}
          </div>

          {/* 3. PII VAULT (NEW! PASSWORD PROTECTED) */}
          <div style={styles.card}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
               <h3 style={{...styles.cardHeaderSmall, marginBottom:0}}>PII Vault (Sensitive)</h3>
               {piiUnlocked ? <ShieldCheck size={16} color="#10B981"/> : <Lock size={16} color="#EF4444"/>}
            </div>

            {!piiUnlocked ? (
               // LOCKED STATE
               <div style={styles.lockedBox}>
                  <ShieldAlert size={32} color="#EF4444" style={{marginBottom:'10px'}}/>
                  <p style={{fontSize:'12px', color:'#7F1D1D', fontWeight:'bold', marginBottom:'10px'}}>AUTHORIZED PERSONNEL ONLY</p>
                  
                  <div style={{display:'flex', gap:'8px'}}>
                    <input 
                      type="password" 
                      placeholder="Enter Admin Password" 
                      style={styles.passwordInput}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <button onClick={handleUnlockPII} style={styles.unlockBtn}>Unlock</button>
                  </div>
                  {showPasswordError && <p style={{fontSize:'10px', color:'red', marginTop:'5px'}}>Incorrect Password (Try: admin123)</p>}
               </div>
            ) : (
              // UNLOCKED STATE
               <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                   {data && data.pii_data.map((item, i) => (
                       <div key={i} style={styles.piiItem}>
                           <div style={styles.timelineTime}>{item.time}</div>
                           <div style={{flex:1}}>
                               <div style={{fontSize:'10px', color:'#0F766E', fontWeight:'bold'}}>{item.type}</div>
                               <div style={{fontWeight:'600', color:'#431407', fontFamily:'monospace'}}>{item.value}</div>
                           </div>
                           <Eye size={14} color="#0F766E" />
                       </div>
                   ))}
                   <button onClick={() => setPiiUnlocked(false)} style={styles.lockBtn}>Lock Vault</button>
               </div>
            )}
          </div>

          {/* 4. FINANCIAL TIMELINE */}
          <div style={styles.card}>
            <h3 style={styles.cardHeaderSmall}>Financial Entities</h3>
            {data ? (
                <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                    {data.financial_timeline.map((item, i) => (
                        <div key={i} style={styles.timelineItem}>
                            <div style={styles.timelineTime}>{item.time}</div>
                            <div style={{flex:1}}>
                                <div style={{fontSize:'12px', color:'#78716C'}}>{item.term}</div>
                                <div style={{fontWeight:'700', color:'#431407'}}>{item.value}</div>
                            </div>
                            <Receipt size={16} color="#EA580C" />
                        </div>
                    ))}
                </div>
            ) : <p style={{fontSize:'13px', color:'#A8A29E'}}>No entities detected.</p>}
          </div>

        </div>
      </div>
    </>
  );
};

// --- SUB COMPONENTS ---
const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} style={{...styles.navItem, background: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent', color: active ? 'white' : 'rgba(255,255,255,0.8)'}}>
    {icon} <span>{label}</span>
    {active && <div style={styles.activeIndicator}></div>}
  </div>
);
const StatCard = ({ label, value, icon, trend, color }) => (
  <div style={styles.statCard}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
      <div><div style={styles.statLabel}>{label}</div><div style={styles.statValue}>{value}</div></div>
      <div style={{padding:'8px', borderRadius:'8px', background: `${color}15`}}>{icon}</div>
    </div>
    <div style={{...styles.statTrend, color: color}}>{trend}</div>
  </div>
);
const PriorityBadge = ({ level }) => {
  let bg = '#ECFDF5'; let c = '#059669';
  if (level === 'High') { bg = '#FEF2F2'; c = '#DC2626'; }
  else if (level === 'Medium') { bg = '#FFFBEB'; c = '#D97706'; }
  return <span style={{fontSize:'11px', fontWeight:'700', padding:'4px 8px', borderRadius:'12px', background: bg, color: c, textTransform:'uppercase'}}>{level} Priority</span>;
};

// --- STYLES ---
const styles = {
  landingContainer: { minHeight: '100vh', background: '#F3ECE2', color: '#431407', display: 'flex', flexDirection: 'column' },
  navBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '32px' },
  link: { color: '#7C2D12', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  loginBtn: { background: '#EA580C', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 14px rgba(234, 88, 12, 0.4)' },
  hero: { flex: 1, display: 'flex', alignItems: 'center', padding: '0 8%', gap: '60px' },
  heroContent: { flex: 1 },
  heroTitle: { fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: '#431407' },
  gradientText: { background: 'linear-gradient(to right, #EA580C, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSub: { fontSize: '18px', color: '#7C2D12', lineHeight: '1.6', marginBottom: '40px', maxWidth: '500px' },
  heroButtons: { display: 'flex', gap: '16px' },
  primaryBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#431407', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  heroVisual: { flex: 1, display: 'flex', justifyContent: 'center' },
  glassCard: { width: '400px', height: '300px', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(234, 88, 12, 0.15)' },
  featureRow: { display: 'flex', gap: '10px', marginBottom: '15px' },
  featureTag: { fontSize: '10px', fontWeight: '600', background: 'white', padding: '4px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: '#7C2D12', border: '1px solid #E5E5E5' },
  
  dashboardContainer: { display: 'flex', height: '100vh', fontFamily: '"Inter", sans-serif', background: '#F3ECE2', overflow: 'hidden' },
  sidebar: { width: '260px', background: '#EA580C', color: 'white', display: 'flex', flexDirection: 'column', padding: '24px', flexShrink: 0 },
  logoSection: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' },
  logoIcon: { width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  logoText: { fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px', color: 'white' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s', position: 'relative' },
  activeIndicator: { position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '20px', background: 'white', borderRadius: '0 4px 4px 0' },
  proCard: { background: 'rgba(255,255,255,0.2)', borderRadius: '16px', padding: '20px', marginTop: 'auto', border: '1px solid rgba(255,255,255,0.3)' },
  proIcon: { width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' },
  
  mainContent: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { height: '80px', background: 'rgba(255,255,255,0.6)', borderBottom: '1px solid #E7D5C9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '10px 16px', borderRadius: '12px', width: '320px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  searchInput: { border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', width: '100%', color: '#431407' },
  headerActions: { display: 'flex', alignItems: 'center', gap: '20px' },
  iconBtn: { cursor: 'pointer', color: '#7C2D12' },
  profilePic: { width: '36px', height: '36px', background: '#FFCCBC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#431407' },
  
  langTrigger: { display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '12px', border: '1px solid #E7D5C9', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#431407', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  langDropdown: { position: 'absolute', top: '120%', left: '0', width: '220px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #E7D5C9', overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 100 },
  langSearchBox: { padding: '10px', borderBottom: '1px solid #F5F5F4', display: 'flex', alignItems: 'center', gap: '8px' },
  langSearchInput: { border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '13px', color: '#431407' },
  langList: { maxHeight: '240px', overflowY: 'auto' },
  langItem: { padding: '10px 16px', fontSize: '13px', cursor: 'pointer', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  indianTag: { fontSize: '10px', background: '#FFEDD5', color: '#C2410C', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },

  scrollableContent: { flex: 1, overflowY: 'auto', padding: '32px' },
  pageHeader: { marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  h1: { fontSize: '24px', fontWeight: '700', color: '#431407', margin: '0 0 8px 0' },
  p: { color: '#7C2D12', margin: 0 },
  
  uploadBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#EA580C', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)' },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' },
  statCard: { background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E7D5C9', boxShadow: '0 2px 8px rgba(234, 88, 12, 0.05)' },
  statLabel: { fontSize: '13px', fontWeight: '600', color: '#7C2D12', marginBottom: '4px' },
  statValue: { fontSize: '28px', fontWeight: '700', color: '#431407' },
  statTrend: { fontSize: '12px', fontWeight: '600', marginTop: '12px' },
  
  domainGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  
  card: { background: 'white', borderRadius: '16px', border: '1px solid #E7D5C9', boxShadow: '0 2px 8px rgba(234, 88, 12, 0.05)', padding: '24px', height: '100%' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '16px', fontWeight: '700', color: '#431407' },
  domainCount: { fontSize: '12px', background: '#FFF7ED', color: '#EA580C', padding: '4px 8px', borderRadius: '12px', fontWeight: '600' },
  
  list: { display: 'flex', flexDirection: 'column', gap: '16px' },
  listItem: { display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #E7D5C9' },
  avatarSmall: { width: '32px', height: '32px', background: '#F3ECE2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#EA580C' },
  itemName: { fontSize: '14px', fontWeight: '600', color: '#431407' },
  itemSub: { fontSize: '12px', color: '#7C2D12', marginTop: '2px' },
  
  transcriptGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' },
  audioPlayer: { background: '#F3ECE2', padding: '15px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' },
  playBtn: { width: '30px', height: '30px', cursor:'pointer' },
  waveform: { flex: 1, height: '4px', background: '#D6D3D1', borderRadius: '2px', position: 'relative' },
  chatContainer: { display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' },
  chatBubble: { padding: '20px', borderRadius: '16px', width: '90%', display: 'flex', flexDirection: 'column', boxShadow:'0 2px 4px rgba(0,0,0,0.03)' },
  chatHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  
  // NEW STYLES
  riskCircle: { width: '100px', height: '100px', borderRadius: '50%', border: '8px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', margin: '0 auto', color: '#431407' },
  tagsContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '16px' },
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E7D5C9', color: '#431407', fontSize: '14px' },
  cardHeaderSmall: { fontSize: '14px', fontWeight: '700', color: '#431407', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  
  tagEntity: { fontSize: '10px', background: '#F0FDFA', color: '#0F766E', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', border: '1px solid #CCFBF1' },
  tagReason: { fontSize: '10px', background: '#F3F4F6', color: '#4B5563', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', border: '1px solid #E5E7EB', display:'flex', alignItems:'center', gap:'4px' },
  tagStress: { fontSize: '10px', background: '#FEF2F2', color: '#B91C1C', padding: '4px 8px', borderRadius: '6px', fontWeight: '600', border: '1px solid #FECACA' },
  
  emotionBadge: { fontSize: '10px', fontWeight: '700', background: '#FFF7ED', color: '#EA580C', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' },

  timelineItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#F3ECE2', borderRadius: '10px' },
  profanityItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#FEF2F2', borderRadius: '10px', border:'1px solid #FECACA' },
  piiItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#F0FDFA', borderRadius: '10px', border:'1px solid #CCFBF1' },
  timelineTime: { fontSize: '11px', fontWeight: '700', color: '#EA580C', background: 'white', padding: '2px 6px', borderRadius: '4px' },
  
  lockedBox: { background: '#FEF2F2', padding: '20px', borderRadius: '12px', display:'flex', flexDirection:'column', alignItems:'center', border:'2px dashed #EF4444' },
  passwordInput: { padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '12px' },
  unlockBtn: { background: '#EF4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  lockBtn: { background: '#6B7280', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', alignSelf:'flex-end', marginTop:'5px' }
};