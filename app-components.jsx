// app-components.jsx — Shared UI components

const { useState, useEffect, useRef } = React;

// ── Icons (inline SVG components) ────────────────────────────────────────────
const Icon = ({ name, size = 16, color = 'currentColor' }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" fill={color} opacity=".9"/><rect x="11" y="2" width="7" height="7" rx="1.5" fill={color} opacity=".9"/><rect x="2" y="11" width="7" height="7" rx="1.5" fill={color} opacity=".9"/><rect x="11" y="11" width="7" height="7" rx="1.5" fill={color} opacity=".9"/></svg>,
    field: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M2 16L5 8l5 4 4-6 4 10H2z" fill={color} opacity=".9"/></svg>,
    lot: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke={color} strokeWidth="2" fill="none"/><path d="M2 10h16M10 2v16" stroke={color} strokeWidth="1.5"/></svg>,
    campaign: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke={color} strokeWidth="1.8" fill="none"/><path d="M7 2v4M13 2v4M3 9h14" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    visit: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.8" fill="none"/><path d="M10 6v4l2.5 2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    order: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="none"/><path d="M7 7h6M7 10h6M7 13h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M10 2L2 17h16L10 2z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/><path d="M10 8v4M10 14v1" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    pest: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" fill={color} opacity=".9"/><path d="M4 7l2.5 1.5M4 13l2.5-1.5M16 7l-2.5 1.5M16 13l-2.5-1.5M10 3V1M10 19v-2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    cost: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.8" fill="none"/><path d="M10 6v1m0 6v1m2.5-5.5c0-.83-.67-1.5-1.5-1.5h-2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h2c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-2c-.83 0-1.5-.67-1.5-1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    history: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M3 10a7 7 0 1014 0 7 7 0 00-14 0z" stroke={color} strokeWidth="1.8" fill="none"/><path d="M10 7v3l2 2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M3 10H1m2.5-4L2 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    report: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke={color} strokeWidth="1.8" fill="none"/><path d="M7 6h6M7 9h6M7 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M7 15l2-2 2 2 2-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/><path d="M3 17c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
    advisor: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3" stroke={color} strokeWidth="1.8" fill="none"/><path d="M2 17c0-2.76 2.69-5 6-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/><path d="M14 11l1.5 1.5L18 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="15" cy="13.5" r="3.5" stroke={color} strokeWidth="1.5" fill="none"/></svg>,
    profile: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/><path d="M3 17c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M8 3H4a1 1 0 00-1 1v12a1 1 0 001 1h4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M13 14l3-4-3-4M16 10H8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M4 14.5L14.5 4l2 2L6 16.5H4v-2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M5 6h10l-1 11H6L5 6z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/><path d="M3 6h14M8 6V4h4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    chevron_right: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M7 5l6 5-6 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    chevron_down: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M5 7l5 6 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M3 5h14M6 10h8M9 15h2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M10 3v10m-4-4l4 4 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16h12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="9" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M7 9V6.5a3 3 0 016 0V9" stroke={color} strokeWidth="1.5" fill="none"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" fill="none"/><path d="M10 9v5M10 7v.5" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    spray: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><rect x="5" y="10" width="10" height="7" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M8 10V7a2 2 0 014 0v3" stroke={color} strokeWidth="1.5" fill="none"/><path d="M10 4V2M13 5l1.5-1.5M7 5L5.5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    leaf: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M4 18c0-6 4-14 14-15C18 9 14 15 8 17L4 18z" fill={color} opacity=".8"/></svg>,
    perm: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" fill="none"/><path d="M7 10l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M13 5l-6 5 6 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };
  return icons[name] || <span style={{fontSize: size, lineHeight:1}}>■</span>;
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = ({ active, onNav, userRole, alertCount }) => {
  const producerMenu = [
    { section: 'PRINCIPAL' },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'alerts', label: 'Alertas', icon: 'alert', badge: alertCount },
    { section: 'CAMPO' },
    { id: 'fields', label: 'Campos', icon: 'field' },
    { id: 'lots', label: 'Lotes', icon: 'lot' },
    { id: 'campaigns', label: 'Campañas', icon: 'campaign' },
    { section: 'OPERATIVO' },
    { id: 'visits', label: 'Visitas', icon: 'visit' },
    { id: 'orders', label: 'Órdenes de Aplicación', icon: 'order' },
    { section: 'ANÁLISIS' },
    { id: 'history_pheno', label: 'Historial Fenológico', icon: 'history' },
    { id: 'history_sanitary', label: 'Historial Sanitario', icon: 'pest' },
    { id: 'costs', label: 'Costos Sanitarios', icon: 'cost' },
    { id: 'reports', label: 'Reportes', icon: 'report' },
    { section: 'CONFIGURACIÓN' },
    { id: 'advisors', label: 'Mis Asesores', icon: 'advisor' },
    { id: 'pests_catalog', label: 'Catálogo Plagas', icon: 'pest' },
    { id: 'products_catalog', label: 'Catálogo Productos', icon: 'spray' },
    { id: 'users', label: 'Usuarios y Permisos', icon: 'perm' },
    { id: 'profile', label: 'Mi Perfil', icon: 'profile' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">
            <Icon name="leaf" size={14} color="#fff" />
          </div>
          PampaIQ
        </div>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-user-name">{DATA.currentUser.name}</div>
        <div className="sidebar-user-role">Productor — La Esperanza</div>
      </div>
      <div className="sidebar-nav">
        {producerMenu.map((item, i) => {
          if (item.section) return <div key={i} className="nav-section-label">{item.section}</div>;
          return (
            <div
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => onNav(item.id)}
            >
              <span className="nav-item-icon"><Icon name={item.icon} size={15} color="currentColor" /></span>
              {item.label}
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </div>
          );
        })}
        <div style={{ padding: '12px 20px', marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="nav-item" style={{ padding: '8px 0', borderLeft: 'none' }} onClick={() => onNav('login')}>
            <span className="nav-item-icon"><Icon name="logout" size={15} color="currentColor" /></span>
            Cerrar sesión
          </div>
        </div>
      </div>
    </nav>
  );
};

// ── Mobile Bottom Nav ─────────────────────────────────────────────────────────
const MobileNav = ({ active, onNav, alertCount }) => {
  const items = [
    { id: 'dashboard', label: 'Inicio', icon: 'dashboard' },
    { id: 'alerts', label: 'Alertas', icon: 'alert', badge: alertCount },
    { id: 'visits', label: 'Visitas', icon: 'visit' },
    { id: 'orders', label: 'Órdenes', icon: 'order' },
    { id: 'profile', label: 'Perfil', icon: 'profile' },
  ];
  return (
    <div className="mobile-nav">
      {items.map(item => (
        <div key={item.id} className={`mobile-nav-item ${active === item.id ? 'active' : ''}`} onClick={() => onNav(item.id)} style={{ position: 'relative' }}>
          {item.badge > 0 && (
            <span style={{ position:'absolute', top: 6, right: '50%', marginRight: -16, background: 'var(--critical)', color:'#fff', fontSize:9, fontWeight:700, padding:'1px 4px', borderRadius:10, fontFamily:'var(--font-mono)' }}>{item.badge}</span>
          )}
          <Icon name={item.icon} size={20} color="currentColor" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ── Topbar ────────────────────────────────────────────────────────────────────
const Topbar = ({ breadcrumbs = [], actions }) => (
  <div className="topbar">
    <div className="breadcrumb">
      {breadcrumbs.map((b, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="breadcrumb-sep"><Icon name="chevron_right" size={12} /></span>}
          {i === breadcrumbs.length - 1
            ? <span className="breadcrumb-current">{b}</span>
            : <span>{b}</span>}
        </React.Fragment>
      ))}
    </div>
    {actions && <div className="topbar-actions">{actions}</div>}
  </div>
);

// ── Progress Steps ────────────────────────────────────────────────────────────
const ProgressSteps = ({ steps, current }) => (
  <div className="progress-steps">
    {steps.map((step, i) => {
      const isDone = i < current;
      const isActive = i === current;
      return (
        <div key={i} className="step-item">
          {i > 0 && <div className={`step-connector ${i <= current ? 'done' : ''}`} />}
          <div className={`step-circle ${isDone ? 'done' : isActive ? 'active' : 'pending'}`}>
            {isDone ? <Icon name="check" size={12} color="#fff" /> : i + 1}
          </div>
          <span className={`step-label ${isActive ? 'active-label' : ''}`}>{step}</span>
        </div>
      );
    })}
  </div>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, title, children, footer, wide }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={wide ? { maxWidth: 720 } : {}}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// ── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ children, className }) => <span className={`badge ${className}`}>{children}</span>;

// ── Semaphore ─────────────────────────────────────────────────────────────────
const Semaphore = ({ level }) => {
  const cfg = {
    bajo: { cls: 'sem-green', icon: '🟢', label: 'Bajo' },
    medio: { cls: 'sem-yellow', icon: '🟡', label: 'Medio' },
    alto: { cls: 'sem-red', icon: '🟠', label: 'Alto' },
    crítico: { cls: 'sem-critical', icon: '🔴', label: 'Crítico' },
    verde: { cls: 'sem-green', icon: '🟢', label: 'OK' },
    amarillo: { cls: 'sem-yellow', icon: '🟡', label: 'Atención' },
    rojo: { cls: 'sem-red', icon: '🟠', label: 'Riesgo' },
  };
  const c = cfg[level] || cfg.bajo;
  return <span className={`semaphore ${c.cls}`}>{c.icon} {c.label}</span>;
};

// ── Confirm Dialog ────────────────────────────────────────────────────────────
const ConfirmDialog = ({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirmar', danger }) => (
  <Modal open={open} onClose={onClose} title={title}
    footer={<>
      <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
      <button className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirm}>{confirmLabel}</button>
    </>}>
    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{message}</p>
  </Modal>
);

// ── Status Toggle ─────────────────────────────────────────────────────────────
const StatusToggle = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: 8 }}>
    {['activa', 'cerrada'].map(s => (
      <button key={s} className={`btn btn-sm ${value === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => onChange(s)}>
        {s === 'activa' ? '✓ Activa' : '✗ Cerrada'}
      </button>
    ))}
  </div>
);

// ── Inline Editable Product Row ───────────────────────────────────────────────
const EditableProductRow = ({ product, onChange, onRemove }) => {
  const productsList = DATA.products || [];
  const showCustomOption = product.name && !productsList.some(p => p.name === product.name);

  const handleProductChange = (name) => {
    const selectedProd = productsList.find(p => p.name === name);
    const newPrice = selectedProd ? selectedProd.precioPorLitro : (product.price || 0);
    const qty = parseFloat(product.quantity) || 0;
    const cost = qty * newPrice;
    onChange({
      ...product,
      name,
      price: newPrice,
      cost: cost
    });
  };

  const handleQuantityChange = (quantity) => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(product.price !== undefined ? product.price : (product.cost / qty || 0)) || 0;
    onChange({
      ...product,
      quantity,
      cost: qty * price
    });
  };

  const handlePriceChange = (priceVal) => {
    const price = parseFloat(priceVal) || 0;
    const qty = parseFloat(product.quantity) || 0;
    onChange({
      ...product,
      price: priceVal,
      cost: qty * price
    });
  };

  return (
    <tr className="editable-table-row">
      <td>
        <select className="form-input form-select" style={{ padding: '5px 8px' }} value={product.name} onChange={e => handleProductChange(e.target.value)}>
          <option value="">Seleccionar producto...</option>
          {showCustomOption && <option value={product.name}>{product.name}</option>}
          {productsList.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
        </select>
      </td>
      <td><input className="form-input" style={{ padding: '5px 8px', width: 90 }} value={product.dose || ''} onChange={e => onChange({ ...product, dose: e.target.value })} placeholder="0.5 L/ha" /></td>
      <td><input className="form-input" style={{ padding: '5px 8px', width: 90 }} value={product.quantity || ''} onChange={e => handleQuantityChange(e.target.value)} placeholder="0 L" /></td>
      <td><input type="number" min="0" step="any" className="form-input" style={{ padding: '5px 8px', width: 110 }} value={product.price !== undefined ? product.price : (product.cost || '')} onChange={e => handlePriceChange(e.target.value)} placeholder="0" /></td>
      <td className="row-actions">
        <button className="btn btn-ghost btn-icon btn-sm" onClick={onRemove} style={{ color: 'var(--critical)' }}><Icon name="trash" size={14} /></button>
      </td>
    </tr>
  );
};

// ── Pest Row ─────────────────────────────────────────────────────────────────
const EditablePestRow = ({ pest, onChange, onRemove }) => {
  const levels = ['bajo', 'medio', 'alto', 'crítico'];
  return (
    <tr className="editable-table-row">
      <td><input className="form-input" style={{ padding: '5px 8px' }} value={pest.name} onChange={e => onChange({ ...pest, name: e.target.value })} placeholder="Nombre plaga..." /></td>
      <td>
        <select className="form-input form-select" style={{ padding: '5px 8px' }} value={pest.level} onChange={e => onChange({ ...pest, level: e.target.value })}>
          {levels.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
        </select>
      </td>
      <td><input className="form-input" style={{ padding: '5px 8px' }} value={pest.treatment} onChange={e => onChange({ ...pest, treatment: e.target.value })} placeholder="Tratamiento recomendado..." /></td>
      <td className="row-actions" style={{ opacity: 1 }}>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={onRemove} style={{ color: 'var(--critical)' }}><Icon name="trash" size={14} /></button>
      </td>
    </tr>
  );
};

// ── Page Shell ────────────────────────────────────────────────────────────────
const PageShell = ({ breadcrumbs, actions, children }) => (
  <>
    <Topbar breadcrumbs={breadcrumbs} actions={actions} />
    <div className="page-body">{children}</div>
  </>
);

// ── Avatar ─────────────────────────────────────────────────────────────────────
const Avatar = ({ initials, size = 32, bg = 'var(--accent)' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: bg, color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.35, fontWeight: 700, fontFamily: 'var(--font-head)',
    flexShrink: 0,
  }}>{initials}</div>
);

Object.assign(window, {
  Icon, Sidebar, MobileNav, Topbar, ProgressSteps, Modal, Badge, Semaphore,
  ConfirmDialog, StatusToggle, EditableProductRow, EditablePestRow, PageShell, Avatar,
});
