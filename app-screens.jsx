// app-screens.jsx — All screens

const { useState, useEffect } = React;

// ══════════════════════════════════════════════════════════════════════════════
// AUTH SCREENS
// ══════════════════════════════════════════════════════════════════════════════
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('juan@laesperanza.com.ar');
  const [pass, setPass] = useState('');
  const [mode, setMode] = useState('login'); // login | recover | reset
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Email inválido';
    if (mode === 'login' && !pass) e.pass = 'La contraseña es obligatoria';
    if (mode === 'reset' && !pass) e.pass = 'Ingresá la nueva contraseña';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (mode === 'recover') { setSent(true); return; }
    onLogin();
  };

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🌾</div>
          <div className="auth-tagline">Gestión agropecuaria<br />inteligente</div>
          <p className="auth-tagline-sub">Monitoreo sanitario, fenológico y operativo para productores y asesores técnicos argentinos.</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['450 has monitoreadas', '3 campos activos', '2 asesores'].map(t => (
              <span key={t} style={{ background: 'rgba(61,139,94,0.25)', color: 'rgba(255,255,255,0.8)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontFamily: 'var(--font-head)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-logo">
            <div className="auth-logo-icon">🌱</div>
            PampaIQ
          </div>
          <p className="auth-subtitle">
            {mode === 'login' && 'Ingresá a tu cuenta'}
            {mode === 'recover' && 'Recuperar contraseña'}
            {mode === 'reset' && 'Restablecer contraseña'}
          </p>

          {mode === 'login' && (
            <>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" />
                {errors.email && <span className="form-error">⚠ {errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input className={`form-input ${errors.pass ? 'error' : ''}`} type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
                {errors.pass && <span className="form-error">⚠ {errors.pass}</span>}
              </div>
              <div style={{ textAlign: 'right', marginBottom: 16, marginTop: -8 }}>
                <a href="#" onClick={e => { e.preventDefault(); setMode('recover'); }} style={{ fontSize: 12 }}>Olvidé mi contraseña</a>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={handleSubmit}>Ingresar</button>
            </>
          )}

          {mode === 'recover' && !sent && (
            <>
              <div className="info-box"><Icon name="info" size={14} color="var(--accent)" /><span>Te enviaremos un enlace para restablecer tu contraseña al email ingresado.</span></div>
              <div className="form-group">
                <label className="form-label">Email registrado</label>
                <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" />
                {errors.email && <span className="form-error">⚠ {errors.email}</span>}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={handleSubmit}>Enviar enlace</button>
              <div style={{ textAlign: 'center', marginTop: 12 }}><a href="#" onClick={e => { e.preventDefault(); setMode('login'); }} style={{ fontSize: 12 }}>← Volver al inicio de sesión</a></div>
            </>
          )}

          {mode === 'recover' && sent && (
            <>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
                <p style={{ fontSize: 14, color: 'var(--dark)', fontWeight: 600, marginBottom: 6 }}>Email enviado</p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Revisá tu bandeja de entrada en <strong>{email}</strong> y seguí las instrucciones para restablecer tu contraseña.</p>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setMode('login'); setSent(false); }}>Volver al inicio de sesión</button>
            </>
          )}

          {mode === 'reset' && (
            <>
              <div className="form-group">
                <label className="form-label">Nueva contraseña</label>
                <input className={`form-input ${errors.pass ? 'error' : ''}`} type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Mínimo 8 caracteres" />
                {errors.pass && <span className="form-error">⚠ {errors.pass}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Confirmar nueva contraseña</label>
                <input className="form-input" type="password" placeholder="Repetí la contraseña" />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={handleSubmit}>Restablecer contraseña</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const DashboardScreen = ({ onNav }) => {
  const [selectedLot, setSelectedLot] = useState(null);
  const criticalAlerts = DATA.alerts.filter(a => !a.resolved && (a.severity === 'critical' || a.severity === 'high'));
  const pendingOrders = DATA.orders.filter(o => o.status === 'pendiente');

  if (selectedLot) {
    return <LotDetailScreen lot={selectedLot} onBack={() => setSelectedLot(null)} />;
  }

  return (
    <PageShell breadcrumbs={['Dashboard']}>
      <div className="page-header">
        <div>
          <div className="page-title">Buenos días, Juan 👋</div>
          <div className="page-subtitle">Resumen operativo — 2 de mayo de 2025</div>
        </div>
      </div>

      {criticalAlerts.length > 0 && (
        <div style={{ background: 'var(--critical-light)', border: '1.5px solid var(--critical)', borderRadius: 'var(--radius-lg)', padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 20 }}>🚨</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, color: 'var(--critical)', marginBottom: 4 }}>{criticalAlerts.length} alerta{criticalAlerts.length > 1 ? 's' : ''} crítica{criticalAlerts.length > 1 ? 's' : ''} activa{criticalAlerts.length > 1 ? 's' : ''}</div>
            {criticalAlerts.slice(0, 2).map(a => (
              <div key={a.id} style={{ fontSize: 12, color: 'var(--dark)', marginBottom: 2 }}>• <strong>{a.lotName}</strong>: {a.description}</div>
            ))}
          </div>
          <button className="btn btn-sm" style={{ background: 'var(--critical)', color: '#fff', flexShrink: 0 }} onClick={() => onNav('alerts')}>Ver alertas</button>
        </div>
      )}

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="stat-label">Campos</div>
              <div className="stat-value">3</div>
              <div className="stat-sub">450 has La Esperanza</div>
            </div>
            <div className="stat-icon" style={{ background: 'var(--accent-light)' }}>🏡</div>
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="stat-label">Lotes activos</div>
              <div className="stat-value">7</div>
              <div className="stat-sub">2 campañas activas</div>
            </div>
            <div className="stat-icon" style={{ background: 'var(--accent-light)' }}>🌾</div>
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="stat-label">Órdenes pendientes</div>
              <div className="stat-value" style={{ color: pendingOrders.length > 0 ? 'var(--critical)' : 'var(--dark)' }}>{pendingOrders.length}</div>
              <div className="stat-sub">Sin ejecutar</div>
            </div>
            <div className="stat-icon" style={{ background: pendingOrders.length > 0 ? 'var(--critical-light)' : 'var(--accent-light)' }}>⏳</div>
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="stat-label">Alertas activas</div>
              <div className="stat-value" style={{ color: 'var(--critical)' }}>{DATA.alerts.filter(a => !a.resolved).length}</div>
              <div className="stat-sub">{criticalAlerts.length} crítica{criticalAlerts.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="stat-icon" style={{ background: 'var(--critical-light)' }}>🚨</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--dark)', marginBottom: 12 }}>Estado sanitario por lote</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { lot: DATA.lots[0], sem: 'rojo', stage: 'Floración', campaign: 'Soja 2024/2025' },
              { lot: DATA.lots[1], sem: 'amarillo', stage: 'Fructificación', campaign: 'Maíz 2023/2024' },
              { lot: DATA.lots[2], sem: 'verde', stage: 'Madurez', campaign: 'Trigo 2024' },
              { lot: DATA.lots[3], sem: 'amarillo', stage: 'Macollaje', campaign: 'Soja 2024/2025' },
            ].map(({ lot, sem, stage, campaign }) => (
              <div key={lot.id} onClick={() => setSelectedLot(lot)} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '12px 16px', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, color: 'var(--dark)' }}>{lot.name} — {getLotCrop(lot.id)}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{campaign} · {stage}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Semaphore level={sem} />
                    <Icon name="chevron_right" size={14} color="var(--text-muted)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--dark)', marginBottom: 12 }}>Órdenes de aplicación pendientes</div>
          {pendingOrders.length === 0 ? (
            <div className="empty-state" style={{ padding: 24 }}>
              <div className="empty-state-icon">✅</div>
              <div className="empty-state-text">Sin órdenes pendientes</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pendingOrders.map(o => (
                <div key={o.id} onClick={() => onNav('orders')} style={{ background: '#fff', border: '1.5px solid var(--warning)', borderRadius: 'var(--radius-lg)', padding: '12px 16px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13 }}>{o.lotName} — {o.fieldName}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{fmt.date(o.date)}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{o.products.map(p => p.name).join(', ')}</div>
                    </div>
                    <span className="badge badge-warning">⏳ Pendiente</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
};

// ── Lot Detail (screen 27) ────────────────────────────────────────────────────
const LotDetailScreen = ({ lot, onBack, onNav }) => {
  const visits = DATA.visits.filter(v => v.lotId === lot.id).slice(0, 3);
  const orders = DATA.orders.filter(o => o.lotId === lot.id && o.status === 'pendiente');
  const campaign = DATA.campaigns.find(c => c.lotId === lot.id && c.status === 'activa');
  const allPests = visits.flatMap(v => v.pests);

  return (
    <PageShell breadcrumbs={['Dashboard', lot.fieldName, lot.name]}>
      <div className="page-header">
        <div>
          <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 8, paddingLeft: 0 }}>
            <Icon name="back" size={14} /> Volver
          </button>
          <div className="page-title">{lot.name}</div>
          <div className="page-subtitle">{lot.fieldName} · {getLotCrop(lot.id)} · {fmt.area(lot.area)}</div>
        </div>
        {campaign && <span className="badge badge-success">✓ Campaña activa</span>}
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Etapa fenológica</div>
          <div style={{ fontSize: 22, margin: '6px 0' }}>{stageIcons[campaign?.phenoStage || 'Floración']}</div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14 }}>{campaign?.phenoStage || '—'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Estado sanitario</div>
          <div style={{ margin: '8px 0' }}><Semaphore level="rojo" /></div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Roya activa · sin intervención</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Últ. visita</div>
          <div className="stat-value" style={{ fontSize: 20, marginTop: 6 }}>{fmt.date(visits[0]?.date || '')}</div>
          <div className="stat-sub">{visits[0]?.advisor?.split(' ').slice(-1)[0]}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div className="detail-section-title" style={{ marginBottom: 10 }}>Plagas activas</div>
          {allPests.length === 0 ? <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sin plagas registradas</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {allPests.slice(0, 4).map((p, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{p.treatment}</div>
                  </div>
                  <span className={`badge ${levelColors[p.level]}`}>{p.level}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="detail-section-title" style={{ marginBottom: 10 }}>Órdenes pendientes vinculadas</div>
          {orders.length === 0 ? <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sin órdenes pendientes</p> : (
            orders.map(o => (
              <div key={o.id} style={{ background: '#fff', border: '1.5px solid var(--warning)', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{fmt.date(o.date)}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13, marginTop: 2 }}>{o.products.map(p => p.name).join(', ')}</div>
                <span className="badge badge-warning" style={{ marginTop: 6, display: 'inline-flex' }}>⏳ Pendiente</span>
              </div>
            ))
          )}
        </div>
      </div>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// FIELDS (Campos)
// ══════════════════════════════════════════════════════════════════════════════
const FieldsScreen = ({ onNav }) => {
  const [fields, setFields] = useState(DATA.fields);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', province: '', district: '', area: '' });
  const [errors, setErrors] = useState({});
  const [confirmDel, setConfirmDel] = useState(null);

  const openCreate = () => { setEditing(null); setForm({ name: '', province: '', district: '', area: '' }); setErrors({}); setModal(true); };
  const openEdit = (f) => { setEditing(f); setForm({ name: f.name, province: f.province, district: f.district, area: f.area }); setErrors({}); setModal(true); };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'El nombre es obligatorio';
    if (!form.province) e.province = 'La provincia es obligatoria';
    if (!form.area) e.area = 'La superficie es obligatoria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    if (editing) {
      setFields(fields.map(f => f.id === editing.id ? { ...f, ...form, area: Number(form.area) } : f));
    } else {
      setFields([...fields, { id: Date.now(), ...form, area: Number(form.area), lots: 0 }]);
    }
    setModal(false);
  };

  const del = (id) => { setFields(fields.filter(f => f.id !== id)); setConfirmDel(null); };

  return (
    <PageShell breadcrumbs={['Campos']} actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={14} color="#fff" /> Nuevo campo</button>}>
      <div className="page-header">
        <div><div className="page-title">Campos</div><div className="page-subtitle">{fields.length} campos registrados</div></div>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr>
            <th>Campo</th><th>Provincia</th><th>Partido</th><th>Superficie</th><th>Lotes</th><th>Acciones</th>
          </tr></thead>
          <tbody>
            {fields.map(f => (
              <tr key={f.id}>
                <td><span style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{f.name}</span></td>
                <td>{f.province}</td>
                <td>{f.district}</td>
                <td className="td-mono">{fmt.area(f.area)}</td>
                <td className="td-mono">{f.lots}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Ver lotes" onClick={() => onNav('lots')}><Icon name="eye" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Editar" onClick={() => openEdit(f)}><Icon name="edit" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Eliminar" style={{ color: 'var(--critical)' }} onClick={() => setConfirmDel(f.id)}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar campo' : 'Nuevo campo'}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar campo</button></>}>
        <div className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Nombre del campo *</label>
            <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ej. La Esperanza" />
            {errors.name && <span className="form-error">⚠ {errors.name}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Provincia *</label>
            <select className={`form-input form-select ${errors.province ? 'error' : ''}`} value={form.province} onChange={e => setForm({ ...form, province: e.target.value })}>
              <option value="">Seleccionar...</option>
              {['Buenos Aires','Córdoba','Santa Fe','Entre Ríos','La Pampa','Santiago del Estero','Tucumán','Salta'].map(p => <option key={p}>{p}</option>)}
            </select>
            {errors.province && <span className="form-error">⚠ {errors.province}</span>}
          </div>
        </div>
        <div className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Partido / Departamento</label>
            <input className="form-input" value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} placeholder="Ej. Pergamino" />
          </div>
          <div className="form-group">
            <label className="form-label">Superficie total (has) *</label>
            <input className={`form-input ${errors.area ? 'error' : ''}`} type="number" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="Ej. 450" />
            {errors.area && <span className="form-error">⚠ {errors.area}</span>}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Ubicación / Referencia</label>
          <input className="form-input" placeholder="Ej. Ruta 32 km 210, San Nicolás" />
          <span className="form-hint">Referencia geográfica opcional para localizar el campo</span>
        </div>
      </Modal>

      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => del(confirmDel)} title="Eliminar campo" message="¿Estás seguro que querés eliminar este campo? Esta acción no se puede deshacer." confirmLabel="Eliminar" danger />
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// LOTS
// ══════════════════════════════════════════════════════════════════════════════
const LotsScreen = ({ onNav }) => {
  const [lots, setLots] = useState(DATA.lots.filter(l => l.fieldId === 1));
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', area: '' });
  const [errors, setErrors] = useState({});
  const [confirmDel, setConfirmDel] = useState(null);

  const openCreate = () => { setEditing(null); setForm({ name: '', area: '' }); setErrors({}); setModal(true); };
  const openEdit = (l) => { setEditing(l); setForm({ name: l.name, area: l.area }); setErrors({}); setModal(true); };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'El nombre es obligatorio';
    if (!form.area) e.area = 'La superficie es obligatoria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    if (editing) {
      setLots(lots.map(l => l.id === editing.id ? { ...l, ...form, area: Number(form.area) } : l));
    } else {
      setLots([...lots, { id: Date.now(), fieldId: 1, fieldName: 'La Esperanza', ...form, area: Number(form.area) }]);
    }
    setModal(false);
  };

  return (
    <PageShell breadcrumbs={['Campos', 'La Esperanza', 'Lotes']} actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={14} color="#fff" /> Nuevo lote</button>}>
      <div className="page-header">
        <div><div className="page-title">Lotes — La Esperanza</div><div className="page-subtitle">{lots.length} lotes registrados · 450 has totales</div></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Lote</th><th>Superficie</th><th>Cultivo actual</th><th>Acciones</th></tr></thead>
          <tbody>
            {lots.map(l => (
              <tr key={l.id}>
                <td><span style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{l.name}</span></td>
                <td className="td-mono">{fmt.area(l.area)}</td>
                <td><span className="badge badge-info">{stageIcons[DATA.campaigns.find(c => c.lotId === l.id && c.status === 'activa')?.phenoStage || ''] || ''} {getLotCrop(l.id)}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onNav('campaigns')}><Icon name="eye" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(l)}><Icon name="edit" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--critical)' }} onClick={() => setConfirmDel(l.id)}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar lote' : 'Nuevo lote'}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar lote</button></>}>
        <div className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Nombre del lote *</label>
            <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ej. Lote Norte" />
            {errors.name && <span className="form-error">⚠ {errors.name}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Superficie (has) *</label>
            <input className={`form-input ${errors.area ? 'error' : ''}`} type="number" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="Ej. 120" />
            {errors.area && <span className="form-error">⚠ {errors.area}</span>}
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!confirmDel} onClose={() => setConfirmDel(null)} onConfirm={() => { setLots(lots.filter(l => l.id !== confirmDel)); setConfirmDel(null); }} title="Eliminar lote" message="¿Querés eliminar este lote? Se perderán todas las campañas y visitas asociadas." confirmLabel="Eliminar" danger />
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// CAMPAIGNS
// ══════════════════════════════════════════════════════════════════════════════
const CampaignsScreen = () => {
  const [campaigns, setCampaigns] = useState(DATA.campaigns);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ crop: '', startDate: '', phenoStage: 'Germinación', status: 'activa' });
  const [errors, setErrors] = useState({});
  const crops = ['Soja', 'Maíz', 'Trigo', 'Girasol', 'Sorgo', 'Cebada'];
  const stages = ['Germinación', 'Macollaje', 'Floración', 'Fructificación', 'Madurez'];

  const openCreate = () => { setEditing(null); setForm({ crop: '', startDate: '', phenoStage: 'Germinación', status: 'activa' }); setErrors({}); setModal(true); };
  const openEdit = (c) => { setEditing(c); setForm({ crop: c.crop, startDate: c.startDate, phenoStage: c.phenoStage, status: c.status }); setErrors({}); setModal(true); };

  const validate = () => {
    const e = {};
    if (!form.crop) e.crop = 'Seleccioná un cultivo';
    if (!form.startDate) e.startDate = 'La fecha de inicio es obligatoria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    if (editing) setCampaigns(campaigns.map(c => c.id === editing.id ? { ...c, ...form } : c));
    else setCampaigns([...campaigns, { id: Date.now(), lotId: 1, ...form }]);
    setModal(false);
  };

  return (
    <PageShell breadcrumbs={['Campos', 'La Esperanza', 'Lote Norte', 'Campañas']} actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={14} color="#fff" /> Nueva campaña</button>}>
      <div className="page-header">
        <div><div className="page-title">Campañas — Lote Norte</div><div className="page-subtitle">Soja · 120 has</div></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Cultivo</th><th>Fecha inicio</th><th>Etapa fenológica esperada</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {campaigns.map(c => (
              <tr key={c.id}>
                <td><span style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{c.crop}</span></td>
                <td className="td-mono">{fmt.date(c.startDate)}</td>
                <td>{stageIcons[c.phenoStage]} {c.phenoStage}</td>
                <td><span className={`badge ${c.status === 'activa' ? 'badge-success' : 'badge-closed'}`}>{c.status === 'activa' ? '✓ Activa' : '✗ Cerrada'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(c)}><Icon name="edit" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar campaña' : 'Nueva campaña'}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar campaña</button></>}>
        <div className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Cultivo *</label>
            <select className={`form-input form-select ${errors.crop ? 'error' : ''}`} value={form.crop} onChange={e => setForm({ ...form, crop: e.target.value })}>
              <option value="">Seleccionar...</option>
              {crops.map(c => <option key={c}>{c}</option>)}
            </select>
            {errors.crop && <span className="form-error">⚠ {errors.crop}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Fecha de inicio *</label>
            <input type="date" className={`form-input ${errors.startDate ? 'error' : ''}`} value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            {errors.startDate && <span className="form-error">⚠ {errors.startDate}</span>}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Etapa fenológica esperada</label>
          <select className="form-input form-select" value={form.phenoStage} onChange={e => setForm({ ...form, phenoStage: e.target.value })}>
            {stages.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Estado</label>
          <StatusToggle value={form.status} onChange={v => setForm({ ...form, status: v })} />
        </div>
      </Modal>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// VISITS
// ══════════════════════════════════════════════════════════════════════════════
const VisitsScreen = ({ onNav }) => {
  const [view, setView] = useState('list'); // list | create | detail
  const [visits, setVisits] = useState(DATA.visits);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [createStep, setCreateStep] = useState(0);
  const [visitForm, setVisitForm] = useState({
    date: '', fieldId: '', lotId: '', campaignId: '',
    phenoStage: '', phenoObs: '',
    pests: [],
  });
  const [errors, setErrors] = useState({});

  const sevAccent = { bajo: '#2E7D52', medio: '#92730A', alto: 'var(--critical)', crítico: '#DC2626' };

  if (view === 'detail' && selectedVisit) {
    return <VisitDetailScreen visit={selectedVisit} onBack={() => setView('list')} onNewOrder={() => onNav('orders')} />;
  }

  if (view === 'create') {
    return <VisitCreateScreen
      step={createStep} setStep={setCreateStep}
      form={visitForm} setForm={setVisitForm}
      errors={errors} setErrors={setErrors}
      onCancel={() => { setView('list'); setCreateStep(0); }}
      onSave={(newVisit) => {
        setVisits([{ id: Date.now(), ...newVisit, advisor: 'Ing. Agr. Carlos Mendez', severity: newVisit.pests[0]?.level || 'bajo', orderId: null }, ...visits]);
        setView('list'); setCreateStep(0);
      }}
    />;
  }

  return (
    <PageShell breadcrumbs={['Campos', 'La Esperanza', 'Lote Norte', 'Soja 2024/2025', 'Visitas']}
      actions={<button className="btn btn-primary" onClick={() => setView('create')}><Icon name="plus" size={14} color="#fff" /> Nueva visita</button>}>
      <div className="page-header">
        <div><div className="page-title">Visitas</div><div className="page-subtitle">{visits.length} visitas registradas</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {visits.map(v => (
          <div key={v.id} className="visit-card" onClick={() => { setSelectedVisit(v); setView('detail'); }}>
            <div className="visit-card-accent" style={{ background: sevAccent[v.severity] || 'var(--accent)' }} />
            <div className="visit-card-body">
              <div className="visit-card-header">
                <div>
                  <div className="visit-title">{v.lotName} — {v.fieldName}</div>
                  <div className="visit-meta">{v.advisor}</div>
                </div>
                <span className="visit-date">{fmt.date(v.date)}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 13 }}>
                <span>{stageIcons[v.phenoStage]} {v.phenoStage}</span>
              </div>
              {v.pests.length > 0 ? (
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                    {v.pests.length} plaga{v.pests.length > 1 ? 's' : ''} detectada{v.pests.length > 1 ? 's' : ''}
                  </div>
                  <div className="visit-tags">
                    {v.pests.map((p, i) => (
                      <span key={i} className={`badge ${levelColors[p.level]}`}>
                        <span className={`severity-dot ${levelSev[p.level]}`} />
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <span className="badge badge-success">✓ Sin plagas detectadas</span>
              )}
              {v.pests.length > 0 && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)' }}>
                  💊 {v.pests[0]?.treatment}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

// ── Visit Create (3 steps) ────────────────────────────────────────────────────
const VisitCreateScreen = ({ step, setStep, form, setForm, errors, setErrors, onCancel, onSave }) => {
  const steps = ['Datos generales', 'Estado fenológico', 'Plagas y enfermedades'];
  const stages = ['Germinación', 'Macollaje', 'Floración', 'Fructificación', 'Madurez'];
  const stageDescs = { 'Germinación': 'Emergencia y establecimiento', 'Macollaje': 'Crecimiento vegetativo', 'Floración': 'Apertura floral', 'Fructificación': 'Formación de granos', 'Madurez': 'Madurez fisiológica' };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.date) e.date = 'La fecha es obligatoria';
      if (!form.fieldId) e.fieldId = 'Seleccioná un campo';
      if (!form.lotId) e.lotId = 'Seleccioná un lote';
    }
    if (step === 1) {
      if (!form.phenoStage) e.phenoStage = 'Seleccioná la etapa fenológica';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(step + 1); };
  const prev = () => setStep(step - 1);

  const addPest = () => setForm({ ...form, pests: [...form.pests, { id: Date.now(), name: '', level: 'bajo', treatment: '' }] });
  const updatePest = (idx, p) => setForm({ ...form, pests: form.pests.map((pp, i) => i === idx ? p : pp) });
  const removePest = (idx) => setForm({ ...form, pests: form.pests.filter((_, i) => i !== idx) });

  return (
    <PageShell breadcrumbs={['Campos', 'La Esperanza', 'Lote Norte', 'Visitas', 'Nueva visita']}>
      <div className="page-header">
        <div><div className="page-title">Nueva visita</div></div>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancelar</button>
      </div>

      <div style={{ maxWidth: 720 }}>
        <ProgressSteps steps={steps} current={step} />

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            {step === 0 && (
              <>
                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label className="form-label">Fecha de visita *</label>
                    <input type="date" className={`form-input ${errors.date ? 'error' : ''}`} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                    {errors.date && <span className="form-error">⚠ {errors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Campo *</label>
                    <select className={`form-input form-select ${errors.fieldId ? 'error' : ''}`} value={form.fieldId} onChange={e => setForm({ ...form, fieldId: e.target.value, lotId: '', campaignId: '' })}>
                      <option value="">Seleccionar campo...</option>
                      {DATA.fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                    {errors.fieldId && <span className="form-error">⚠ {errors.fieldId}</span>}
                  </div>
                </div>
                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label className="form-label">Lote *</label>
                    <select className={`form-input form-select ${errors.lotId ? 'error' : ''}`} value={form.lotId} onChange={e => setForm({ ...form, lotId: e.target.value })}>
                      <option value="">Seleccionar lote...</option>
                      {DATA.lots.filter(l => !form.fieldId || l.fieldId === Number(form.fieldId)).map(l => <option key={l.id} value={l.id}>{l.name} ({getLotCrop(l.id)})</option>)}
                    </select>
                    {errors.lotId && <span className="form-error">⚠ {errors.lotId}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Campaña</label>
                    <select className="form-input form-select" value={form.campaignId} onChange={e => setForm({ ...form, campaignId: e.target.value })}>
                      <option value="">Seleccionar campaña...</option>
                      {DATA.campaigns.map(c => <option key={c.id} value={c.id}>{c.crop} — desde {fmt.date(c.startDate)}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="form-group">
                  <label className="form-label">Etapa fenológica observada *</label>
                  {errors.phenoStage && <span className="form-error" style={{ marginBottom: 6 }}>⚠ {errors.phenoStage}</span>}
                  <div className="feno-grid">
                    {stages.map(s => (
                      <div key={s} className={`feno-item ${form.phenoStage === s ? 'selected' : ''}`} onClick={() => setForm({ ...form, phenoStage: s })}>
                        <div className="feno-icon">{stageIcons[s]}</div>
                        <div className="feno-label">{s}</div>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>{stageDescs[s]}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label className="form-label">Observaciones generales</label>
                  <textarea className="form-input" rows={4} value={form.phenoObs} onChange={e => setForm({ ...form, phenoObs: e.target.value })} placeholder="Describí el estado general del cultivo, condiciones del lote, estrés hídrico, etc." style={{ resize: 'vertical' }} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14 }}>Plagas y enfermedades detectadas</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Podés agregar múltiples plagas por visita</div>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={addPest}><Icon name="plus" size={13} /> Agregar plaga</button>
                </div>
                {form.pests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Sin plagas agregadas</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>Si no se detectaron plagas, podés continuar directamente</div>
                  </div>
                ) : (
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Plaga / Enfermedad</th><th>Nivel incidencia</th><th>Tratamiento recomendado</th><th></th></tr></thead>
                      <tbody>
                        {form.pests.map((p, i) => <EditablePestRow key={p.id} pest={p} onChange={pp => updatePest(i, pp)} onRemove={() => removePest(i)} />)}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {step > 0 ? <button className="btn btn-secondary" onClick={prev}><Icon name="back" size={14} /> Anterior</button> : <div />}
          {step < steps.length - 1
            ? <button className="btn btn-primary" onClick={next}>Siguiente <Icon name="chevron_right" size={14} color="#fff" /></button>
            : <button className="btn btn-primary" onClick={() => onSave(form)}>Guardar visita <Icon name="check" size={14} color="#fff" /></button>
          }
        </div>
      </div>
    </PageShell>
  );
};

// ── Visit Detail (screen 16) ──────────────────────────────────────────────────
const VisitDetailScreen = ({ visit, onBack, onNewOrder }) => (
  <PageShell breadcrumbs={['Visitas', 'Detalle de visita']}>
    <div className="page-header">
      <div>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ paddingLeft: 0, marginBottom: 8 }}><Icon name="back" size={14} /> Volver a visitas</button>
        <div className="page-title">Visita del {fmt.date(visit.date)}</div>
        <div className="page-subtitle">{visit.lotName} · {visit.fieldName} · {visit.advisor}</div>
      </div>
      {!visit.orderId && (
        <button className="btn btn-primary" onClick={onNewOrder} style={{ background: 'var(--critical)', flexShrink: 0 }}>
          <Icon name="spray" size={14} color="#fff" /> Generar orden de aplicación
        </button>
      )}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
      <div className="card">
        <div className="card-header"><div className="card-title">📋 Datos generales</div></div>
        <div className="card-body">
          <div className="detail-grid">
            <div><div className="detail-item-label">Fecha</div><div className="detail-item-value" style={{ fontFamily: 'var(--font-mono)' }}>{fmt.date(visit.date)}</div></div>
            <div><div className="detail-item-label">Asesor</div><div className="detail-item-value">{visit.advisor}</div></div>
            <div><div className="detail-item-label">Campo</div><div className="detail-item-value">{visit.fieldName}</div></div>
            <div><div className="detail-item-label">Lote</div><div className="detail-item-value">{visit.lotName}</div></div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">{stageIcons[visit.phenoStage]} Estado fenológico</div></div>
        <div className="card-body">
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--dark)', marginBottom: 8 }}>{visit.phenoStage}</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{visit.phenoObs}</p>
        </div>
      </div>
    </div>

    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-header">
        <div className="card-title">🐛 Plagas y enfermedades detectadas</div>
        <Semaphore level={visit.severity} />
      </div>
      {visit.pests.length === 0 ? (
        <div className="card-body"><span className="badge badge-success">✓ Sin plagas detectadas en esta visita</span></div>
      ) : (
        <div className="table-wrap" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
          <table>
            <thead><tr><th>Plaga / Enfermedad</th><th>Nivel de incidencia</th><th>Incidencia (%)</th><th>Tratamiento recomendado</th></tr></thead>
            <tbody>
              {visit.pests.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{p.name}</td>
                  <td>
                    <span className={`badge ${levelColors[p.level]}`}>
                      <span className={`severity-dot ${levelSev[p.level]}`} />
                      {p.level.charAt(0).toUpperCase() + p.level.slice(1)}
                    </span>
                  </td>
                  <td className="td-mono">{p.incidence}%</td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {visit.pests.length > 0 && (
      <div className="card">
        <div className="card-header"><div className="card-title">💊 Tratamientos recomendados</div></div>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visit.pests.filter(p => p.level !== 'bajo').map((p, i) => (
              <div key={i} style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>💊</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, color: 'var(--dark)', marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.treatment}</div>
                </div>
              </div>
            ))}
          </div>
          {visit.orderId ? (
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--success-light)', border: '1px solid var(--accent-mid)', borderRadius: 8, fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
              ✅ Orden de aplicación generada — ID #{visit.orderId}
            </div>
          ) : (
            <button className="btn btn-primary" style={{ marginTop: 14, background: 'var(--critical)' }} onClick={onNewOrder}>
              <Icon name="spray" size={14} color="#fff" /> Generar orden de aplicación desde esta visita
            </button>
          )}
        </div>
      </div>
    )}
  </PageShell>
);

// ══════════════════════════════════════════════════════════════════════════════
// ORDERS
// ══════════════════════════════════════════════════════════════════════════════
const OrdersScreen = () => {
  const [orders, setOrders] = useState(DATA.orders);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const defaultForm = { fieldId: '', appType: '🚜 Mosquito / Pulverizadora terrestre', lotId: '', date: '', equipment: '', products: [{ id: 1, name: '', dose: '', quantity: '', cost: '' }], transportCost: '', fuelLiters: '', fuelPrice: '', laborDays: '', laborPrice: '', otherCost: '', otherDesc: '' };
  const [form, setForm] = useState(defaultForm);
  const [statusModal, setStatusModal] = useState(null);

  const statusColors = { pendiente: 'var(--warning)', ejecutada: 'var(--success)', cancelada: 'var(--text-muted)' };
  const statusBg = { pendiente: 'var(--warning-light)', ejecutada: 'var(--success-light)', cancelada: '#F3F4F6' };

  const openCreate = () => {
    setEditing(null);
    setForm(defaultForm);
    setView('create');
  };
  const openEdit = (o) => {
    setEditing(o);
    const lot = DATA.lots.find(l => l.id === o.lotId);
    setForm({ fieldId: lot?.fieldId || '', appType: o.appType || '🚜 Mosquito / Pulverizadora terrestre', lotId: o.lotId, date: o.date, equipment: o.equipment, products: [...o.products], transportCost: o.transportCost || '', fuelLiters: o.fuelLiters || '', fuelPrice: o.fuelPrice || '', laborDays: o.laborDays || '', laborPrice: o.laborPrice || '', otherCost: o.otherCost || '', otherDesc: o.otherDesc || '' });
    setView('edit');
  };
  const addProduct = () => setForm({ ...form, products: [...form.products, { id: Date.now(), name: '', dose: '', quantity: '', cost: '' }] });
  const updateProduct = (idx, p) => setForm({ ...form, products: form.products.map((pp, i) => i === idx ? p : pp) });
  const removeProduct = (idx) => setForm({ ...form, products: form.products.filter((_, i) => i !== idx) });
  const parseNum = v => parseFloat(v) || 0;
  const handleNumChange = (field, val) => setForm(f => ({ ...f, [field]: val }));
  const calcProductsTotal = () => form.products.reduce((acc, p) => acc + parseNum(p.cost), 0);
  const calcFuelTotal = () => parseNum(form.fuelLiters) * parseNum(form.fuelPrice);
  const calcLaborTotal = () => parseNum(form.laborDays) * parseNum(form.laborPrice);
  const calcGrandTotal = () => calcProductsTotal() + parseNum(form.transportCost) + calcFuelTotal() + calcLaborTotal() + parseNum(form.otherCost);
  const save = () => {
    const lot = DATA.lots.find(l => l.id === Number(form.lotId));
    const fieldName = DATA.fields.find(f => f.id === Number(form.fieldId))?.name || lot?.fieldName || '';
    if (editing) setOrders(orders.map(o => o.id === editing.id ? { ...o, ...form, lotName: lot?.name || o.lotName, fieldName } : o));
    else setOrders([...orders, { id: Date.now(), ...form, status: 'pendiente', lotName: lot?.name || '', fieldName, visitId: null }]);
    setEditing(null);
    setView('list');
  };
  const changeStatus = (id, status) => { setOrders(orders.map(o => o.id === id ? { ...o, status } : o)); setStatusModal(null); setSelected(s => s ? { ...s, status } : s); };

  if (view === 'create' || view === 'edit') {
    return (
      <PageShell breadcrumbs={['Órdenes de Aplicación', editing ? `Editar Orden #${editing.id}` : 'Nueva orden']}>
        <div className="page-header" style={{ marginBottom: 20 }}>
          <div>
            <button className="btn btn-ghost btn-sm" onClick={() => { setView('list'); setEditing(null); }} style={{ paddingLeft: 0, marginBottom: 8 }}><Icon name="back" size={14} /> Volver</button>
            <div className="page-title">{editing ? `Editar orden #${editing.id}` : 'Nueva orden de aplicación'}</div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Tipo de aplicación</label>
              <select className="form-input form-select" value={form.appType} onChange={e => setForm({ ...form, appType: e.target.value })}>
                <option value="🚜 Mosquito / Pulverizadora terrestre">🚜 Mosquito / Pulverizadora terrestre</option>
                <option value="✈️ Avión fumigador">✈️ Avión fumigador</option>
                <option value="🚁 Drone">🚁 Drone</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div className="form-row form-row-2" style={{ marginBottom: 0 }}>
              <div className="form-group">
                <label className="form-label">Campo</label>
                <select className="form-input form-select" value={form.fieldId} onChange={e => setForm({ ...form, fieldId: e.target.value, lotId: '' })}>
                  <option value="">Seleccionar campo...</option>
                  {DATA.fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Lote</label>
                <select className="form-input form-select" value={form.lotId} onChange={e => setForm({ ...form, lotId: e.target.value })} disabled={!form.fieldId}>
                  <option value="">{form.fieldId ? 'Seleccionar lote...' : 'Primero seleccioná un campo'}</option>
                  {DATA.lots.filter(l => l.fieldId === Number(form.fieldId)).map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row form-row-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Fecha</label>
                <input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Equipo de fumigación</label>
                <input className="form-input" value={form.equipment} onChange={e => setForm({ ...form, equipment: e.target.value })} placeholder="Ej. Pulverizadora Case 4420 — 24m" />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header">
            <div className="card-title">Productos</div>
            <button className="btn btn-secondary btn-sm" onClick={addProduct}><Icon name="plus" size={12} /> Agregar producto</button>
          </div>
          <div className="table-wrap" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead><tr><th>Producto</th><th>Dosis</th><th>Cantidad</th><th>Precio est.</th><th></th></tr></thead>
              <tbody>
                {form.products.map((p, i) => <EditableProductRow key={p.id} product={p} onChange={pp => updateProduct(i, pp)} onRemove={() => removeProduct(i)} />)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header"><div className="card-title">Costos adicionales</div></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Traslado de insumos ($)</label>
              <input type="number" min="0" className="form-input" value={form.transportCost} onChange={e => handleNumChange('transportCost', e.target.value)} placeholder="0" />
            </div>
            <div className="form-row form-row-2" style={{ marginBottom: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Combustible (Litros)</label>
                <input type="number" min="0" className="form-input" value={form.fuelLiters} onChange={e => handleNumChange('fuelLiters', e.target.value)} placeholder="0" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Precio por litro ($)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="number" min="0" className="form-input" style={{ flex: 1 }} value={form.fuelPrice} onChange={e => handleNumChange('fuelPrice', e.target.value)} placeholder="0" />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', minWidth: 80, textAlign: 'right' }}>Sub: {fmt.currency(calcFuelTotal())}</div>
                </div>
              </div>
            </div>
            <div className="form-row form-row-2" style={{ marginBottom: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Mano de obra (Jornales)</label>
                <input type="number" min="0" className="form-input" value={form.laborDays} onChange={e => handleNumChange('laborDays', e.target.value)} placeholder="0" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Valor por jornal ($)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="number" min="0" className="form-input" style={{ flex: 1 }} value={form.laborPrice} onChange={e => handleNumChange('laborPrice', e.target.value)} placeholder="0" />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', minWidth: 80, textAlign: 'right' }}>Sub: {fmt.currency(calcLaborTotal())}</div>
                </div>
              </div>
            </div>
            <div className="form-row form-row-2" style={{ marginBottom: 0 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Otros costos (Descripción)</label>
                <input className="form-input" value={form.otherDesc} onChange={e => setForm({ ...form, otherDesc: e.target.value })} placeholder="Ej. Peajes, reparaciones rápidas..." />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Monto ($)</label>
                <input type="number" min="0" className="form-input" value={form.otherCost} onChange={e => handleNumChange('otherCost', e.target.value)} placeholder="0" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--success-light)', border: '2px dashed var(--success)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)', flexWrap: 'wrap', marginBottom: 6 }}>
              <span>Prod: {fmt.currency(calcProductsTotal())}</span>
              <span>Tras: {fmt.currency(parseNum(form.transportCost))}</span>
              <span>Comb: {fmt.currency(calcFuelTotal())}</span>
              <span>MO: {fmt.currency(calcLaborTotal())}</span>
              <span>Otros: {fmt.currency(parseNum(form.otherCost))}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--success)', textTransform: 'uppercase' }}>Total estimado de la orden</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 24, color: 'var(--success)' }}>{fmt.currency(calcGrandTotal())}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => { setView('list'); setEditing(null); }}>Cancelar</button>
            <button className="btn btn-primary" onClick={save}>Guardar orden</button>
          </div>
        </div>
      </PageShell>
    );
  }

  if (view === 'detail' && selected) {
    return (
      <PageShell breadcrumbs={['Órdenes de Aplicación', `Orden #${selected.id}`]}>
        <div className="page-header">
          <div>
            <button className="btn btn-ghost btn-sm" onClick={() => setView('list')} style={{ paddingLeft: 0, marginBottom: 8 }}><Icon name="back" size={14} /> Volver</button>
            <div className="page-title">Orden de aplicación #{selected.id}</div>
            <div className="page-subtitle">{selected.lotName} · {fmt.date(selected.date)}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => openEdit(selected)}><Icon name="edit" size={14} /> Editar</button>
            <button className="btn btn-primary" onClick={() => setStatusModal(selected)}>Cambiar estado</button>
          </div>
        </div>

        <div style={{ background: statusBg[selected.status], border: `2px solid ${statusColors[selected.status]}`, borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>{selected.status === 'pendiente' ? '⏳' : selected.status === 'ejecutada' ? '✅' : '✗'}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: statusColors[selected.status] }}>Estado: {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Lote: {selected.lotName} · {selected.fieldName}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="card">
            <div className="card-header"><div className="card-title">📋 Datos de la orden</div></div>
            <div className="card-body">
              <div className="detail-grid">
                <div><div className="detail-item-label">Fecha</div><div className="detail-item-value td-mono">{fmt.date(selected.date)}</div></div>
                <div><div className="detail-item-label">Lote</div><div className="detail-item-value">{selected.lotName}</div></div>
                <div style={{ gridColumn: '1/-1' }}><div className="detail-item-label">Equipo de fumigación</div><div className="detail-item-value">🚜 {selected.equipment}</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">🧪 Productos a aplicar</div></div>
          <div className="table-wrap" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table>
              <thead><tr><th>Producto</th><th>Dosis</th><th>Cantidad total</th><th>Costo estimado</th></tr></thead>
              <tbody>
                {selected.products.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{p.name}</td>
                    <td className="td-mono">{p.dose}</td>
                    <td className="td-mono">{p.quantity}</td>
                    <td className="td-mono">{fmt.currency(p.cost || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal open={!!statusModal} onClose={() => setStatusModal(null)} title="Cambiar estado de la orden"
          footer={<button className="btn btn-secondary" onClick={() => setStatusModal(null)}>Cerrar</button>}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Seleccioná el nuevo estado para la orden #{statusModal?.id}:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['pendiente', 'ejecutada', 'cancelada'].map(s => (
              <button key={s} className={`btn ${statusModal?.status === s ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'flex-start' }}
                onClick={() => { changeStatus(statusModal.id, s); setSelected({ ...selected, status: s }); }}>
                {s === 'pendiente' ? '⏳' : s === 'ejecutada' ? '✅' : '✗'} {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </Modal>
      </PageShell>
    );
  }

  return (
    <PageShell breadcrumbs={['Órdenes de Aplicación']} actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={14} color="#fff" /> Nueva orden</button>}>
      <div className="page-header">
        <div><div className="page-title">Órdenes de Aplicación</div><div className="page-subtitle">{orders.length} órdenes registradas</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {orders.map(o => (
          <div key={o.id} className="order-card" onClick={() => { setSelected(o); setView('detail'); }} style={{ cursor: 'pointer' }}>
            <div className="order-card-header">
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, color: 'var(--dark)' }}>{o.lotName} — {o.fieldName}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{fmt.date(o.date)}</div>
              </div>
              <span className={`badge ${statusOrder[o.status]}`}>{statusLabel[o.status]}</span>
            </div>
            <div className="order-card-body">
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                🚜 {o.equipment}
              </div>
              <div>
                {o.products.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', borderBottom: i < o.products.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: 'var(--dark)' }}>🧪 {p.name}</span>
                    <span className="td-mono" style={{ fontSize: 11 }}>{p.dose}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ALERTS
// ══════════════════════════════════════════════════════════════════════════════
const AlertsScreen = () => {
  const [tab, setTab] = useState('active');
  const [alerts, setAlerts] = useState(DATA.alerts);
  const [thresholds, setThresholds] = useState({ incidence: 15, phenoDelay: 7 });

  const sortedAlerts = [...alerts].filter(a => !a.resolved).sort((a, b) => {
    const order = { critical: 0, high: 1, warning: 2, info: 3 };
    return order[a.severity] - order[b.severity];
  });

  const dismiss = (id) => setAlerts(alerts.map(a => a.id === id ? { ...a, resolved: true } : a));

  return (
    <PageShell breadcrumbs={['Alertas']}>
      <div className="page-header">
        <div><div className="page-title">Alertas</div><div className="page-subtitle">{sortedAlerts.length} alertas activas</div></div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === 'active' ? 'active' : ''}`} onClick={() => setTab('active')}>Alertas activas <span style={{ marginLeft: 4, background: 'var(--critical)', color: '#fff', fontSize: 10, padding: '1px 6px', borderRadius: 10, fontFamily: 'var(--font-mono)' }}>{sortedAlerts.length}</span></div>
        <div className={`tab ${tab === 'config' ? 'active' : ''}`} onClick={() => setTab('config')}>Configuración de umbrales</div>
        <div className={`tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>Historial resuelto</div>
      </div>

      {tab === 'active' && (
        <div>
          {sortedAlerts.length === 0 && (
            <div className="empty-state"><div className="empty-state-icon">✅</div><div className="empty-state-text">Sin alertas activas</div></div>
          )}
          {sortedAlerts.map(a => (
            <div key={a.id} className={`alert-item ${a.severity === 'critical' ? 'critical' : a.severity === 'warning' ? 'warning' : 'info'}`}>
              <div className="alert-icon" style={{ background: a.severity === 'critical' ? '#FEE2E2' : a.severity === 'high' ? 'var(--critical-light)' : a.severity === 'warning' ? 'var(--warning-light)' : 'var(--accent-light)' }}>
                {alertSevIcon[a.severity]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{a.lotName} — {a.fieldName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{a.description}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className={`badge ${alertSevBadge[a.severity]}`}>{alertSevIcon[a.severity]} {alertSevLabel[a.severity]}</span>
                      <span className="badge badge-neutral">{a.type === 'sanitaria' ? '🐛 Sanitaria' : '🌱 Fenológica'}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{fmt.date(a.date)}</span>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => dismiss(a.id)}>Descartar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'config' && (
        <div style={{ maxWidth: 560 }}>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">⚙️ Umbrales por campaña activa</div></div>
            <div className="card-body">
              <div className="info-box"><Icon name="info" size={14} color="var(--accent)" /><span>Los umbrales configurados generan alertas automáticas cuando se superan durante el registro de visitas.</span></div>
              <div className="form-group">
                <label className="form-label">Umbral de incidencia (%) para alerta</label>
                <input type="number" className="form-input" value={thresholds.incidence} onChange={e => setThresholds({ ...thresholds, incidence: e.target.value })} style={{ maxWidth: 120 }} />
                <span className="form-hint">Se genera alerta cuando la incidencia de una plaga supera este valor</span>
              </div>
              <div className="form-group">
                <label className="form-label">Días de retraso fenológico aceptables</label>
                <input type="number" className="form-input" value={thresholds.phenoDelay} onChange={e => setThresholds({ ...thresholds, phenoDelay: e.target.value })} style={{ maxWidth: 120 }} />
                <span className="form-hint">Días de desvío respecto a la etapa esperada antes de generar alerta</span>
              </div>
              <button className="btn btn-primary btn-sm">Guardar configuración</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Lote</th><th>Tipo</th><th>Descripción</th><th>Fecha</th><th>Resolución</th></tr></thead>
              <tbody>
                {DATA.resolvedAlerts.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{a.lotName}</td>
                    <td><span className="badge badge-neutral">{a.type}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.description}</td>
                    <td className="td-mono" style={{ fontSize: 12 }}>{fmt.date(a.date)}</td>
                    <td style={{ fontSize: 12, color: 'var(--success)' }}>✓ {a.resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// HISTORY PHENOLOGICAL
// ══════════════════════════════════════════════════════════════════════════════
const HistoryPhenoScreen = () => {
  const [selectedLot, setSelectedLot] = useState(1);
  const lotHistory = DATA.phenoHistory.find(h => h.lotId === selectedLot);

  return (
    <PageShell breadcrumbs={['Historial Fenológico']}>
      <div className="page-header">
        <div><div className="page-title">Historial Fenológico</div><div className="page-subtitle">Progresión de etapas reales vs. esperadas</div></div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {DATA.lots.slice(0, 4).map(l => (
          <button key={l.id} className={`chip ${selectedLot === l.id ? 'selected' : ''}`} onClick={() => setSelectedLot(l.id)}>{l.name}</button>
        ))}
      </div>

      {lotHistory ? (
        <>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div className="card-title">📈 {lotHistory.campaign}</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{DATA.lots.find(l => l.id === selectedLot)?.name}</span>
            </div>
            <div className="card-body">
              <div style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: 0, minWidth: 600, position: 'relative', paddingBottom: 40 }}>
                  <div style={{ position: 'absolute', top: 36, left: 0, right: 0, height: 3, background: 'var(--border)', zIndex: 0 }} />
                  {lotHistory.data.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 6 }}>{fmt.date(d.date)}</div>
                      <div style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: d.onTime ? 'var(--success-light)' : 'var(--warning-light)',
                        border: `3px solid ${d.onTime ? 'var(--success)' : 'var(--warning)'}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, boxShadow: 'var(--shadow-sm)',
                      }}>
                        {stageIcons[d.stage]}
                      </div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, color: 'var(--dark)', marginTop: 8, textAlign: 'center' }}>{d.stage}</div>
                      {!d.onTime && (
                        <div style={{ fontSize: 10, color: 'var(--warning)', background: 'var(--warning-light)', padding: '2px 6px', borderRadius: 10, marginTop: 4, fontWeight: 600, fontFamily: 'var(--font-head)' }}>⚠ Retraso</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} /> A término</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--warning)', display: 'inline-block' }} /> Con retraso</span>
              </div>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Etapa</th><th>Fecha real</th><th>Etapa esperada</th><th>Estado</th></tr></thead>
              <tbody>
                {lotHistory.data.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{stageIcons[d.stage]} {d.stage}</td>
                    <td className="td-mono">{fmt.date(d.date)}</td>
                    <td>{stageIcons[d.expected]} {d.expected}</td>
                    <td>{d.onTime ? <span className="badge badge-success">✓ A término</span> : <span className="badge badge-warning">⚠ Retrasado</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="empty-state"><div className="empty-state-icon">📊</div><div className="empty-state-text">Sin historial para este lote</div></div>
      )}
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// HISTORY SANITARY
// ══════════════════════════════════════════════════════════════════════════════
const HistorySanitaryScreen = () => {
  const [filterLot, setFilterLot] = useState('all');
  const [filterPest, setFilterPest] = useState('all');
  const filtered = DATA.sanitaryHistory.filter(h =>
    (filterLot === 'all' || h.lotId === Number(filterLot)) &&
    (filterPest === 'all' || h.pest === filterPest)
  );
  const pestNames = [...new Set(DATA.sanitaryHistory.map(h => h.pest))];

  return (
    <PageShell breadcrumbs={['Historial Sanitario']}>
      <div className="page-header">
        <div><div className="page-title">Historial Sanitario</div><div className="page-subtitle">Plagas y tratamientos por campaña</div></div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <Icon name="filter" size={15} color="var(--text-secondary)" />
        <select className="form-input form-select" style={{ width: 'auto', paddingRight: 32 }} value={filterLot} onChange={e => setFilterLot(e.target.value)}>
          <option value="all">Todos los lotes</option>
          {DATA.lots.slice(0, 4).map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select className="form-input form-select" style={{ width: 'auto', paddingRight: 32 }} value={filterPest} onChange={e => setFilterPest(e.target.value)}>
          <option value="all">Todas las plagas</option>
          {pestNames.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Lote</th><th>Campaña</th><th>Plaga / Enfermedad</th><th>Nivel</th><th>Tratamiento</th><th>Resultado</th></tr></thead>
          <tbody>
            {filtered.map(h => (
              <tr key={h.id}>
                <td className="td-mono" style={{ fontSize: 12 }}>{fmt.date(h.date)}</td>
                <td style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{DATA.lots.find(l => l.id === h.lotId)?.name}</td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{h.campaign}</td>
                <td>🐛 {h.pest}</td>
                <td><span className={`badge ${levelColors[h.level]}`}><span className={`severity-dot ${levelSev[h.level]}`} /> {h.level}</span></td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{h.treatment}</td>
                <td><span className={`badge ${h.result === 'Resuelto' ? 'badge-success' : h.result === 'En seguimiento' ? 'badge-warning' : 'badge-neutral'}`}>{h.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// COSTS
// ══════════════════════════════════════════════════════════════════════════════
const CostsScreen = () => {
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);
  const total = DATA.costs.reduce((sum, c) => sum + c.total, 0);

  if (view === 'detail' && selected) {
    const details = DATA.costDetails.filter(d => d.lotId === selected.lotId);
    return (
      <PageShell breadcrumbs={['Costos Sanitarios', selected.lotName]}>
        <div className="page-header">
          <div>
            <button className="btn btn-ghost btn-sm" onClick={() => setView('list')} style={{ paddingLeft: 0, marginBottom: 8 }}><Icon name="back" size={14} /> Volver</button>
            <div className="page-title">Costos — {selected.lotName}</div>
            <div className="page-subtitle">{selected.crop} · {selected.interventions} intervenciones</div>
          </div>
        </div>

        <div style={{ background: 'var(--dark)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 20, color: '#fff' }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-head)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: 6 }}>Costo total acumulado</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 500 }}>{fmt.currency(selected.total)}</div>
          <div style={{ opacity: 0.6, fontSize: 12, marginTop: 4 }}>Principal problema: {selected.mainPest}</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr><th>Fecha</th><th>Plaga intervenida</th><th>Productos utilizados</th><th>Cantidad</th><th>Costo total</th></tr></thead>
            <tbody>
              {details.map(d => (
                <tr key={d.id}>
                  <td className="td-mono" style={{ fontSize: 12 }}>{fmt.date(d.date)}</td>
                  <td>🐛 {d.pest}</td>
                  <td style={{ fontSize: 12 }}>🧪 {d.products}</td>
                  <td className="td-mono" style={{ fontSize: 12 }}>{d.qty}</td>
                  <td className="td-mono" style={{ fontWeight: 600, color: 'var(--dark)' }}>{fmt.currency(d.total)}</td>
                </tr>
              ))}
              <tr style={{ background: 'var(--accent-light)' }}>
                <td colSpan={4} style={{ fontFamily: 'var(--font-head)', fontWeight: 700 }}>Total</td>
                <td className="td-mono" style={{ fontWeight: 700, fontSize: 15 }}>{fmt.currency(selected.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell breadcrumbs={['Costos Sanitarios']}>
      <div className="page-header">
        <div><div className="page-title">Costos Sanitarios</div><div className="page-subtitle">Campaña activa 2024/2025</div></div>
      </div>

      <div className="stat-card" style={{ marginBottom: 20, display: 'inline-block', padding: '16px 24px' }}>
        <div className="stat-label">Costo total en campaña</div>
        <div className="stat-value">{fmt.currency(total)}</div>
        <div className="stat-sub">3 lotes · {DATA.costs.reduce((s, c) => s + c.interventions, 0)} intervenciones</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {DATA.costs.map(c => (
          <div key={c.lotId} className="cost-card" onClick={() => { setSelected(c); setView('detail'); }}>
            <div className="cost-card-header">
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14 }}>{c.lotName}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{c.crop}</div>
            </div>
            <div className="cost-card-body">
              <div className="cost-total">{fmt.currency(c.total)}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-head)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 2 }}>Intervenciones</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500 }}>{c.interventions}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-head)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 2 }}>Principal plaga</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>🐛 {c.mainPest}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// REPORTS
// ══════════════════════════════════════════════════════════════════════════════
const ReportsScreen = () => {
  const [form, setForm] = useState({ field: '1', lot: '1', campaign: '1', from: '2025-01-01', to: '2025-04-30' });
  const [sections, setSections] = useState({ pheno: true, sanitary: true, interventions: true, costs: false });
  const [generated, setGenerated] = useState(false);

  return (
    <PageShell breadcrumbs={['Reportes']}>
      <div className="page-header">
        <div><div className="page-title">Generador de Reportes</div><div className="page-subtitle">Seleccioná el alcance y los datos a incluir</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'start' }}>
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">🎯 Alcance del reporte</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Campo</label>
                <select className="form-input form-select" value={form.field} onChange={e => setForm({ ...form, field: e.target.value })}>
                  {DATA.fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Lote</label>
                <select className="form-input form-select" value={form.lot} onChange={e => setForm({ ...form, lot: e.target.value })}>
                  {DATA.lots.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Campaña</label>
                <select className="form-input form-select" value={form.campaign} onChange={e => setForm({ ...form, campaign: e.target.value })}>
                  {DATA.campaigns.map(c => <option key={c.id} value={c.id}>{c.crop} — {fmt.date(c.startDate)}</option>)}
                </select>
              </div>
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label">Período desde</label>
                  <input type="date" className="form-input" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Hasta</label>
                  <input type="date" className="form-input" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><div className="card-title">📋 Secciones a incluir</div></div>
            <div className="card-body">
              {[
                { key: 'pheno', label: '🌱 Historial fenológico' },
                { key: 'sanitary', label: '🐛 Historial sanitario' },
                { key: 'interventions', label: '💊 Intervenciones' },
                { key: 'costs', label: '💰 Costos sanitarios' },
              ].map(s => (
                <label key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <input type="checkbox" checked={sections[s.key]} onChange={e => setSections({ ...sections, [s.key]: e.target.checked })} style={{ accentColor: 'var(--accent)', width: 15, height: 15 }} />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setGenerated(true)}>
              <Icon name="eye" size={14} color="#fff" /> Generar vista previa
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button className="btn btn-secondary" style={{ justifyContent: 'center' }}><Icon name="download" size={14} /> PDF</button>
              <button className="btn btn-secondary" style={{ justifyContent: 'center' }}><Icon name="download" size={14} /> Excel</button>
            </div>
          </div>
        </div>

        {generated ? (
          <div className="report-preview">
            <div className="report-preview-header">
              <div style={{ fontSize: 11, opacity: 0.6, fontFamily: 'var(--font-head)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PampaIQ — Reporte de campaña</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 20, marginTop: 4 }}>La Esperanza — Lote Norte</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4, fontFamily: 'var(--font-mono)' }}>Período: {fmt.date(form.from)} — {fmt.date(form.to)}</div>
            </div>
            <div className="report-preview-body">
              {sections.pheno && (
                <div className="report-section">
                  <div className="report-section-title">Historial Fenológico</div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {DATA.phenoHistory[0]?.data.map((d, i) => (
                      <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: 20 }}>{stageIcons[d.stage]}</div>
                        <div style={{ fontSize: 10, fontFamily: 'var(--font-head)', fontWeight: 600 }}>{d.stage}</div>
                        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{fmt.date(d.date)}</div>
                        {!d.onTime && <div style={{ fontSize: 9, color: 'var(--warning)', fontWeight: 600 }}>⚠</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {sections.sanitary && (
                <div className="report-section">
                  <div className="report-section-title">Historial Sanitario</div>
                  {DATA.sanitaryHistory.filter(h => h.lotId === 1).slice(0, 3).map(h => (
                    <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{fmt.date(h.date)}</span>
                      <span>🐛 {h.pest}</span>
                      <span className={`badge ${levelColors[h.level]}`}>{h.level}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{h.treatment}</span>
                    </div>
                  ))}
                </div>
              )}
              {sections.costs && (
                <div className="report-section">
                  <div className="report-section-title">Costos Sanitarios</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 500, color: 'var(--dark)' }}>{fmt.currency(DATA.costs[0].total)}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{DATA.costs[0].interventions} intervenciones · Principal plaga: {DATA.costs[0].mainPest}</div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 14 }}>Vista previa del reporte</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Configurá el alcance y hacé clic en "Generar vista previa"</div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// ADVISORS
// ══════════════════════════════════════════════════════════════════════════════
const AdvisorsScreen = () => {
  const [advisors, setAdvisors] = useState(DATA.advisors);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const openCreate = () => { setEditing(null); setForm({ name: '', email: '', password: '' }); setErrors({}); setModal(true); };
  const openEdit = (a) => { setEditing(a); setForm({ name: a.name, email: a.email, password: '' }); setErrors({}); setModal(true); };
  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'El nombre es obligatorio';
    if (!form.email) e.email = 'El email es obligatorio';
    if (!editing && !form.password) e.password = 'La contraseña inicial es obligatoria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const save = () => {
    if (!validate()) return;
    if (editing) setAdvisors(advisors.map(a => a.id === editing.id ? { ...a, ...form } : a));
    else setAdvisors([...advisors, { id: Date.now(), ...form, active: true }]);
    setModal(false);
  };

  return (
    <PageShell breadcrumbs={['Mis Asesores']} actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={14} color="#fff" /> Agregar asesor</button>}>
      <div className="page-header">
        <div><div className="page-title">Mis Asesores</div><div className="page-subtitle">{advisors.filter(a => a.active).length} asesores activos</div></div>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Asesor</th><th>Email</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {advisors.map(a => (
              <tr key={a.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={a.name.split(' ').slice(-2).map(n => n[0]).join('')} size={30} />
                    <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{a.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{a.email}</td>
                <td><span className={`badge ${a.active ? 'badge-success' : 'badge-closed'}`}>{a.active ? '✓ Activo' : '✗ Inactivo'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(a)}><Icon name="edit" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" style={{ color: a.active ? 'var(--critical)' : 'var(--success)' }}
                      onClick={() => setAdvisors(advisors.map(aa => aa.id === a.id ? { ...aa, active: !aa.active } : aa))}>
                      {a.active ? <Icon name="x" size={14} /> : <Icon name="check" size={14} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar asesor' : 'Agregar asesor'}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar asesor</button></>}>
        <div className="form-group">
          <label className="form-label">Nombre completo *</label>
          <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ing. Agr. Nombre Apellido" />
          {errors.name && <span className="form-error">⚠ {errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="asesor@email.com" />
          {errors.email && <span className="form-error">⚠ {errors.email}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">{editing ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña inicial *'}</label>
          <input type="password" className={`form-input ${errors.password ? 'error' : ''}`} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 8 caracteres" />
          {errors.password && <span className="form-error">⚠ {errors.password}</span>}
        </div>
        <div className="info-box"><Icon name="info" size={14} color="var(--accent)" /><span>El asesor recibirá sus credenciales por email y podrá cambiar su contraseña desde su perfil.</span></div>
      </Modal>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PESTS CATALOG
// ══════════════════════════════════════════════════════════════════════════════
const PestsCatalogScreen = () => {
  const [pests, setPests] = useState(DATA.pests);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', crops: [], threshold: '', unit: '' });
  const [errors, setErrors] = useState({});
  const allCrops = ['Soja', 'Maíz', 'Trigo', 'Girasol', 'Sorgo', 'Cebada'];

  const openCreate = () => { setEditing(null); setForm({ name: '', crops: [], threshold: '', unit: '' }); setErrors({}); setModal(true); };
  const openEdit = (p) => { setEditing(p); setForm({ name: p.name, crops: p.crops, threshold: p.threshold, unit: p.unit }); setErrors({}); setModal(true); };
  const toggleCrop = (c) => setForm({ ...form, crops: form.crops.includes(c) ? form.crops.filter(x => x !== c) : [...form.crops, c] });
  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'El nombre es obligatorio';
    if (!form.threshold) e.threshold = 'El umbral es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const save = () => {
    if (!validate()) return;
    if (editing) setPests(pests.map(p => p.id === editing.id ? { ...p, ...form, threshold: Number(form.threshold) } : p));
    else setPests([...pests, { id: Date.now(), ...form, threshold: Number(form.threshold) }]);
    setModal(false);
  };

  return (
    <PageShell breadcrumbs={['Catálogo de Plagas y Enfermedades']} actions={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={14} color="#fff" /> Nueva plaga</button>}>
      <div className="page-header">
        <div><div className="page-title">Catálogo de Plagas y Enfermedades</div><div className="page-subtitle">{pests.length} plagas registradas</div></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Plaga / Enfermedad</th><th>Cultivos afectados</th><th>Umbral crítico</th><th>Unidad</th><th>Acciones</th></tr></thead>
          <tbody>
            {pests.map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>🐛 {p.name}</td>
                <td><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{p.crops.map(c => <span key={c} className="badge badge-info">{c}</span>)}</div></td>
                <td className="td-mono">{p.threshold}</td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.unit}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => openEdit(p)}><Icon name="edit" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--critical)' }} onClick={() => setPests(pests.filter(pp => pp.id !== p.id))}><Icon name="trash" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar plaga/enfermedad' : 'Nueva plaga o enfermedad'}
        footer={<><button className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        <div className="form-group">
          <label className="form-label">Nombre *</label>
          <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ej. Roya asiática" />
          {errors.name && <span className="form-error">⚠ {errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Cultivos afectados</label>
          <div className="chip-group">
            {allCrops.map(c => <div key={c} className={`chip ${form.crops.includes(c) ? 'selected' : ''}`} onClick={() => toggleCrop(c)}>{c}</div>)}
          </div>
        </div>
        <div className="form-row form-row-2">
          <div className="form-group">
            <label className="form-label">Umbral crítico *</label>
            <input type="number" className={`form-input ${errors.threshold ? 'error' : ''}`} value={form.threshold} onChange={e => setForm({ ...form, threshold: e.target.value })} placeholder="Ej. 15" />
            {errors.threshold && <span className="form-error">⚠ {errors.threshold}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Unidad de medida</label>
            <input className="form-input" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} placeholder="Ej. % incidencia foliar" />
          </div>
        </div>
      </Modal>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════════════════════════════
const ProfileScreen = () => {
  const [form, setForm] = useState({ name: DATA.currentUser.name, email: DATA.currentUser.email });
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [saved, setSaved] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [passErrors, setPassErrors] = useState({});

  const validatePass = () => {
    const e = {};
    if (!passForm.current) e.current = 'Ingresá tu contraseña actual';
    if (!passForm.new || passForm.new.length < 8) e.new = 'La nueva contraseña debe tener al menos 8 caracteres';
    if (passForm.new !== passForm.confirm) e.confirm = 'Las contraseñas no coinciden';
    setPassErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <PageShell breadcrumbs={['Mi Perfil']}>
      <div className="page-header">
        <div><div className="page-title">Mi Perfil</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 800 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">👤 Datos personales</div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <Avatar initials="JP" size={52} />
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16 }}>{DATA.currentUser.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Productor</div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            {saved && <div style={{ color: 'var(--success)', fontSize: 12, marginBottom: 8 }}>✓ Datos guardados</div>}
            <button className="btn btn-primary btn-sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>Guardar cambios</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">🔒 Cambiar contraseña</div></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Contraseña actual *</label>
              <input type="password" className={`form-input ${passErrors.current ? 'error' : ''}`} value={passForm.current} onChange={e => setPassForm({ ...passForm, current: e.target.value })} />
              {passErrors.current && <span className="form-error">⚠ {passErrors.current}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Nueva contraseña *</label>
              <input type="password" className={`form-input ${passErrors.new ? 'error' : ''}`} value={passForm.new} onChange={e => setPassForm({ ...passForm, new: e.target.value })} />
              {passErrors.new && <span className="form-error">⚠ {passErrors.new}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Confirmar nueva contraseña *</label>
              <input type="password" className={`form-input ${passErrors.confirm ? 'error' : ''}`} value={passForm.confirm} onChange={e => setPassForm({ ...passForm, confirm: e.target.value })} />
              {passErrors.confirm && <span className="form-error">⚠ {passErrors.confirm}</span>}
            </div>
            {passSaved && <div style={{ color: 'var(--success)', fontSize: 12, marginBottom: 8 }}>✓ Contraseña actualizada</div>}
            <button className="btn btn-primary btn-sm" onClick={() => { if (validatePass()) { setPassSaved(true); setPassForm({ current: '', new: '', confirm: '' }); setTimeout(() => setPassSaved(false), 2000); } }}>Cambiar contraseña</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// USERS & PERMISSIONS
// ══════════════════════════════════════════════════════════════════════════════
const UsersScreen = () => {
  const [tab, setTab] = useState('users');
  const { modules, roles } = DATA.permissions;

  return (
    <PageShell breadcrumbs={['Gestión de Usuarios y Permisos']}>
      <div className="page-header">
        <div><div className="page-title">Usuarios y Permisos</div><div className="page-subtitle">Administración de accesos al sistema</div></div>
        <button className="btn btn-primary"><Icon name="plus" size={14} color="#fff" /> Nuevo usuario</button>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>Usuarios</div>
        <div className={`tab ${tab === 'perms' ? 'active' : ''}`} onClick={() => setTab('perms')}>Matriz de permisos</div>
      </div>

      {tab === 'users' && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {DATA.users.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar initials={u.name.split(' ').slice(-2).map(n => n[0]).join('')} size={28} bg={u.role === 'Admin' ? 'var(--dark)' : u.role === 'Asesor' ? '#6366F1' : 'var(--accent)'} />
                      <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td><span className={`badge ${u.role === 'Admin' ? 'badge-neutral' : u.role === 'Asesor' ? 'badge-info' : 'badge-success'}`}>{u.role}</span></td>
                  <td><span className={`badge ${u.active ? 'badge-success' : 'badge-closed'}`}>{u.active ? '✓ Activo' : '✗ Inactivo'}</span></td>
                  <td><div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm"><Icon name="edit" size={14} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--critical)' }}><Icon name="trash" size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'perms' && (
        <div className="perm-matrix table-wrap">
          <table className="perm-table">
            <thead>
              <tr>
                <th>Módulo</th>
                {roles.map(r => <th key={r}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {modules.map((m, i) => (
                <tr key={i}>
                  <td>{m.name}</td>
                  {roles.map(r => {
                    const rKey = r.toLowerCase();
                    const val = m[rKey];
                    return (
                      <td key={r} className="perm-check">
                        {val === true && <span className="perm-icon" title="Acceso completo">✅</span>}
                        {val === 'edit' && <span className="perm-icon" title="Lectura y edición">✏️</span>}
                        {val === 'view' && <span className="perm-icon" title="Solo lectura">👁️</span>}
                        {val === false && <span className="perm-icon" title="Sin acceso"><Icon name="lock" size={14} color="var(--text-muted)" /></span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span>✅ Acceso completo</span>
            <span>✏️ Lectura y edición</span>
            <span>👁️ Solo lectura</span>
            <span><Icon name="lock" size={12} color="var(--text-muted)" style={{ display: 'inline' }} /> Sin acceso</span>
          </div>
        </div>
      )}
    </PageShell>
  );
};

Object.assign(window, {
  LoginScreen, DashboardScreen, LotDetailScreen,
  FieldsScreen, LotsScreen, CampaignsScreen,
  VisitsScreen, VisitCreateScreen, VisitDetailScreen,
  OrdersScreen, AlertsScreen,
  HistoryPhenoScreen, HistorySanitaryScreen,
  CostsScreen, ReportsScreen,
  AdvisorsScreen, PestsCatalogScreen,
  ProfileScreen, UsersScreen,
});
