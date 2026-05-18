// app-main.jsx — Root app with routing, tweaks, mobile nav

const { useState, useEffect } = React;

// ── Tweaks defaults ──────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "viewMode": "desktop",
  "accentColor": "#3D8B5E",
  "darkNav": true,
  "compactDensity": false,
  "showMobileFrame": true
}/*EDITMODE-END*/;

// ── Main App ─────────────────────────────────────────────────────────────────
const App = () => {
  const [screen, setScreen] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sync accent color
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accentColor);
    document.documentElement.style.setProperty('--nav-bg', tweaks.darkNav ? '#1E3A2F' : tweaks.accentColor);
  }, [tweaks.accentColor, tweaks.darkNav]);

  // Detect viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Tweaks host protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (key, value) => {
    const next = typeof key === 'object' ? { ...tweaks, ...key } : { ...tweaks, [key]: value };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
  };

  const handleLogin = () => { setLoggedIn(true); setScreen('dashboard'); };
  const handleNav = (id) => {
    if (id === 'login') { setLoggedIn(false); setScreen('login'); return; }
    setScreen(id);
  };

  const alertCount = DATA.alerts.filter(a => !a.resolved).length;

  // Auth screens (full-page, no shell)
  if (!loggedIn || screen === 'login') {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        {tweaksOpen && <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => { setTweaksOpen(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }} />}
      </>
    );
  }

  const mobileView = tweaks.viewMode === 'mobile' || isMobile;

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard': return <DashboardScreen onNav={handleNav} />;
      case 'fields': return <FieldsScreen onNav={handleNav} />;
      case 'lots': return <LotsScreen onNav={handleNav} />;
      case 'campaigns': return <CampaignsScreen />;
      case 'visits': return <VisitsScreen onNav={handleNav} />;
      case 'orders': return <OrdersScreen />;
      case 'alerts': return <AlertsScreen />;
      case 'history_pheno': return <HistoryPhenoScreen />;
      case 'history_sanitary': return <HistorySanitaryScreen />;
      case 'costs': return <CostsScreen />;
      case 'reports': return <ReportsScreen />;
      case 'advisors': return <AdvisorsScreen />;
      case 'pests_catalog': return <PestsCatalogScreen />;
      case 'profile': return <ProfileScreen />;
      case 'users': return <UsersScreen />;
      default: return <DashboardScreen onNav={handleNav} />;
    }
  };

  // Desktop layout
  if (!mobileView) {
    return (
      <div className="app-shell">
        <Sidebar active={screen} onNav={handleNav} alertCount={alertCount} />
        <div className="main-content">
          {renderScreen()}
        </div>
        {tweaksOpen && (
          <TweaksPanel
            tweaks={tweaks}
            setTweak={setTweak}
            onClose={() => { setTweaksOpen(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }}
          />
        )}
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 60, position: 'relative' }}>
      {/* Mobile topbar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--nav-bg)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 18, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 24, height: 24, background: 'var(--accent)', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🌱</span>
          PampaIQ
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {alertCount > 0 && (
            <button
              onClick={() => handleNav('alerts')}
              style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--critical)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            >
              <Icon name="alert" size={14} color="#fff" />
              <span style={{ position: 'absolute', top: -2, right: -2, background: '#fff', color: 'var(--critical)', fontSize: 9, fontWeight: 800, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>{alertCount}</span>
            </button>
          )}
          <Avatar initials="JP" size={30} />
        </div>
      </div>

      {/* Mobile content */}
      <div style={{ minHeight: 'calc(100vh - 104px)' }}>
        {renderScreen()}
      </div>

      <MobileNav active={screen} onNav={handleNav} alertCount={alertCount} />

      {tweaksOpen && (
        <TweaksPanel
          tweaks={tweaks}
          setTweak={setTweak}
          onClose={() => { setTweaksOpen(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }}
        />
      )}
    </div>
  );
};

// ── Tweaks Panel ─────────────────────────────────────────────────────────────
const TweaksPanel = ({ tweaks, setTweak, onClose }) => {
  const panelStyle = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 280,
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 2000,
    fontFamily: 'var(--font-body)',
    overflow: 'hidden',
  };

  const Row = ({ label, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--dark)', fontWeight: 500 }}>{label}</span>
      {children}
    </div>
  );

  const Toggle = ({ val, onChange }) => (
    <button onClick={() => onChange(!val)} style={{
      width: 40, height: 22, borderRadius: 11,
      background: val ? 'var(--accent)' : 'var(--border)',
      border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
      flexShrink: 0,
    }}>
      <span style={{
        position: 'absolute', top: 3, left: val ? 20 : 3,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );

  const accentOptions = [
    { color: '#3D8B5E', label: 'Verde' },
    { color: '#2E6BA8', label: 'Azul' },
    { color: '#7C3AED', label: 'Violeta' },
    { color: '#DC6226', label: 'Naranja' },
    { color: '#1E3A2F', label: 'Oscuro' },
  ];

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={{ background: 'var(--dark)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, color: '#fff' }}>⚙️ Tweaks</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1 }}>✕</button>
      </div>

      <div style={{ padding: '4px 16px 16px' }}>
        {/* View Mode */}
        <div style={{ paddingTop: 10, marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-head)' }}>VISTA</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['desktop', 'mobile'].map(m => (
              <button key={m}
                onClick={() => setTweak('viewMode', m)}
                className={`btn btn-sm ${tweaks.viewMode === m ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
                {m === 'desktop' ? '🖥 Escritorio' : '📱 Mobile'}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div style={{ paddingTop: 12, marginBottom: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-head)' }}>COLOR ACENTO</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {accentOptions.map(o => (
              <button key={o.color} onClick={() => setTweak('accentColor', o.color)} title={o.label}
                style={{ width: 28, height: 28, borderRadius: '50%', background: o.color, border: tweaks.accentColor === o.color ? '3px solid var(--dark)' : '2px solid transparent', cursor: 'pointer', transition: 'border 0.15s' }} />
            ))}
          </div>
        </div>

        {/* Options */}
        <div style={{ paddingTop: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-head)' }}>OPCIONES</div>
          <Row label="Navegación oscura">
            <Toggle val={tweaks.darkNav} onChange={v => setTweak('darkNav', v)} />
          </Row>
          <Row label="Densidad compacta">
            <Toggle val={tweaks.compactDensity} onChange={v => {
              setTweak('compactDensity', v);
              document.documentElement.style.setProperty('--page-density', v ? '0.85' : '1');
              document.body.style.fontSize = v ? '13px' : '14px';
            }} />
          </Row>
        </div>

        {/* Screens quick jump */}
        <div style={{ paddingTop: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-head)' }}>NAVEGAR A</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[
              ['dashboard', 'Dashboard'],
              ['visits', 'Visitas'],
              ['orders', 'Órdenes'],
              ['alerts', 'Alertas'],
              ['costs', 'Costos'],
              ['reports', 'Reportes'],
              ['users', 'Usuarios'],
              ['profile', 'Perfil'],
            ].map(([id, label]) => (
              <button key={id}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: 11, padding: '4px 8px' }}
                onClick={() => {
                  // Navigate: dispatch custom event so app can pick it up
                  window.dispatchEvent(new CustomEvent('pampaiq-nav', { detail: id }));
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook up tweaks navigation events
const AppWrapper = () => {
  const [navTarget, setNavTarget] = useState(null);

  useEffect(() => {
    const handler = (e) => setNavTarget(e.detail);
    window.addEventListener('pampaiq-nav', handler);
    return () => window.removeEventListener('pampaiq-nav', handler);
  }, []);

  return <App externalNav={navTarget} />;
};

// ── Mount ────────────────────────────────────────────────────────────────────
const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
