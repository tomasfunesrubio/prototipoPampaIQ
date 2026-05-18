// app-data.jsx — Sample data for PampaIQ
const DATA = {
  currentUser: { id: 1, name: 'Juan Pérez', email: 'juan@laesperanza.com.ar', role: 'productor', avatar: 'JP' },

  advisors: [
    { id: 1, name: 'Ing. Agr. Carlos Mendez', email: 'cmendez@asesor.com.ar', active: true, phone: '011-4521-8800' },
    { id: 2, name: 'Ing. Agr. Laura Sánchez', email: 'lsanchez@asesor.com.ar', active: true, phone: '0351-455-2200' },
    { id: 3, name: 'Ing. Agr. Martín Vera', email: 'mvera@asesor.com.ar', active: false, phone: '0341-412-9900' },
  ],

  fields: [
    { id: 1, name: 'La Esperanza', province: 'Buenos Aires', district: 'Pergamino', area: 450, lots: 4 },
    { id: 2, name: 'El Trébol', province: 'Córdoba', district: 'Río Cuarto', area: 320, lots: 3 },
    { id: 3, name: 'San Marcos', province: 'Santa Fe', district: 'Venado Tuerto', area: 280, lots: 2 },
  ],

  lots: [
    { id: 1, fieldId: 1, fieldName: 'La Esperanza', name: 'Lote Norte', area: 120, crop: 'Soja' },
    { id: 2, fieldId: 1, fieldName: 'La Esperanza', name: 'Lote Sur', area: 95, crop: 'Maíz' },
    { id: 3, fieldId: 1, fieldName: 'La Esperanza', name: 'Lote Este', area: 80, crop: 'Trigo' },
    { id: 4, fieldId: 1, fieldName: 'La Esperanza', name: 'Lote Oeste', area: 110, crop: 'Soja' },
    { id: 5, fieldId: 2, fieldName: 'El Trébol', name: 'Lote A', area: 130, crop: 'Maíz' },
    { id: 6, fieldId: 2, fieldName: 'El Trébol', name: 'Lote B', area: 90, crop: 'Soja' },
    { id: 7, fieldId: 3, fieldName: 'San Marcos', name: 'Lote Principal', area: 180, crop: 'Soja' },
  ],

  campaigns: [
    { id: 1, lotId: 1, crop: 'Soja', startDate: '2024-10-01', phenoStage: 'Floración', status: 'activa' },
    { id: 2, lotId: 2, crop: 'Maíz', startDate: '2023-11-01', phenoStage: 'Fructificación', status: 'cerrada' },
    { id: 3, lotId: 3, crop: 'Trigo', startDate: '2024-06-15', phenoStage: 'Madurez', status: 'cerrada' },
    { id: 4, lotId: 4, crop: 'Soja', startDate: '2024-10-10', phenoStage: 'Macollaje', status: 'activa' },
  ],

  visits: [
    {
      id: 1, campaignId: 1, lotId: 1, lotName: 'Lote Norte', fieldName: 'La Esperanza',
      date: '2025-04-15', advisor: 'Ing. Agr. Carlos Mendez',
      phenoStage: 'Floración', phenoObs: 'Cultivo en plena floración. Buena cobertura general. Se observa algo de estrés hídrico en los bordes del lote.',
      pests: [
        { id: 1, name: 'Roya asiática', level: 'medio', treatment: 'Fungicida triazol + estrobilurina a 0.5 L/ha', incidence: 18 },
        { id: 2, name: 'Pulgón verde', level: 'bajo', treatment: 'Monitoreo continuo, no requiere intervención', incidence: 5 },
      ],
      severity: 'medio',
      orderId: 1,
    },
    {
      id: 2, campaignId: 2, lotId: 2, lotName: 'Lote Sur', fieldName: 'La Esperanza',
      date: '2025-04-08', advisor: 'Ing. Agr. Laura Sánchez',
      phenoStage: 'Fructificación', phenoObs: 'Fructificación avanzada. Cultivo con 12 días de retraso respecto a lo esperado por déficit hídrico en marzo.',
      pests: [
        { id: 3, name: 'Trips del maíz', level: 'alto', treatment: 'Clorpirifos 1 L/ha + aceite mineral', incidence: 42 },
        { id: 4, name: 'Chinche', level: 'medio', treatment: 'Lambda-cialotrina 0.4 L/ha', incidence: 22 },
      ],
      severity: 'alto',
      orderId: 2,
    },
    {
      id: 3, campaignId: 1, lotId: 1, lotName: 'Lote Norte', fieldName: 'La Esperanza',
      date: '2025-03-28', advisor: 'Ing. Agr. Carlos Mendez',
      phenoStage: 'Macollaje', phenoObs: 'Buen macollaje. Sin problemas sanitarios relevantes.',
      pests: [
        { id: 5, name: 'Trips', level: 'bajo', treatment: 'Sin intervención necesaria', incidence: 8 },
      ],
      severity: 'bajo',
      orderId: null,
    },
    {
      id: 4, campaignId: 1, lotId: 1, lotName: 'Lote Norte', fieldName: 'La Esperanza',
      date: '2025-03-05', advisor: 'Ing. Agr. Carlos Mendez',
      phenoStage: 'Germinación', phenoObs: 'Germinación uniforme. Excelente densidad de plantas.',
      pests: [],
      severity: 'bajo',
      orderId: null,
    },
  ],

  orders: [
    {
      id: 1, lotId: 1, lotName: 'Lote Norte', fieldName: 'La Esperanza',
      date: '2025-04-17', status: 'pendiente',
      equipment: 'Pulverizadora Case 4420 — 24m',
      visitId: 1,
      products: [
        { id: 1, name: 'Fungicida triazol', dose: '0.5 L/ha', quantity: '60 L', cost: 45000 },
        { id: 2, name: 'Estrobilurina', dose: '0.3 L/ha', quantity: '36 L', cost: 28000 },
        { id: 3, name: 'Aceite mineral', dose: '0.2 L/ha', quantity: '24 L', cost: 8000 },
      ],
    },
    {
      id: 2, lotId: 2, lotName: 'Lote Sur', fieldName: 'La Esperanza',
      date: '2025-04-10', status: 'ejecutada',
      equipment: 'Pulverizadora John Deere 4030 — 28m',
      visitId: 2,
      products: [
        { id: 4, name: 'Clorpirifos', dose: '1 L/ha', quantity: '95 L', cost: 57000 },
        { id: 5, name: 'Aceite mineral', dose: '0.2 L/ha', quantity: '19 L', cost: 6500 },
      ],
    },
    {
      id: 3, lotId: 3, lotName: 'Lote Este', fieldName: 'La Esperanza',
      date: '2025-03-22', status: 'cancelada',
      equipment: 'Pulverizadora Case 4420 — 24m',
      visitId: null,
      products: [
        { id: 6, name: 'Glifosato', dose: '2 L/ha', quantity: '160 L', cost: 98000 },
      ],
    },
  ],

  pests: [
    { id: 1, name: 'Roya asiática', crops: ['Soja'], threshold: 15, unit: '% incidencia foliar' },
    { id: 2, name: 'Trips del maíz', crops: ['Maíz'], threshold: 25, unit: 'trips/hoja' },
    { id: 3, name: 'Pulgón verde', crops: ['Soja', 'Trigo'], threshold: 500, unit: 'pulgones/metro' },
    { id: 4, name: 'Chinche de la soja', crops: ['Soja'], threshold: 1, unit: 'chinche/metro' },
    { id: 5, name: 'Orugas', crops: ['Soja', 'Maíz'], threshold: 30, unit: '% defoliación' },
    { id: 6, name: 'Fusariosis', crops: ['Trigo', 'Maíz'], threshold: 10, unit: '% espigas afectadas' },
    { id: 7, name: 'Mancha amarilla', crops: ['Trigo'], threshold: 20, unit: '% hoja bandera' },
  ],

  alerts: [
    {
      id: 1, lotId: 1, lotName: 'Lote Norte', fieldName: 'La Esperanza',
      type: 'sanitaria', description: 'Roya asiática detectada por encima del umbral crítico (18%). Sin intervención en los últimos 3 días.',
      date: '2025-04-16', severity: 'critical', resolved: false,
    },
    {
      id: 2, lotId: 2, lotName: 'Lote Sur', fieldName: 'La Esperanza',
      type: 'fenológica', description: 'Cultivo con 12 días de retraso fenológico respecto a lo esperado para la campaña.',
      date: '2025-04-08', severity: 'warning', resolved: false,
    },
    {
      id: 3, lotId: 4, lotName: 'Lote Oeste', fieldName: 'La Esperanza',
      type: 'sanitaria', description: 'Trips en nivel alto. Umbral de intervención superado.',
      date: '2025-04-14', severity: 'high', resolved: false,
    },
    {
      id: 4, lotId: 3, lotName: 'Lote Este', fieldName: 'La Esperanza',
      type: 'fenológica', description: 'Sin visita registrada en los últimos 21 días.',
      date: '2025-04-01', severity: 'warning', resolved: false,
    },
    {
      id: 5, lotId: 5, lotName: 'Lote A', fieldName: 'El Trébol',
      type: 'sanitaria', description: 'Fusariosis detectada en 8% de espigas. Cerca del umbral.',
      date: '2025-04-10', severity: 'info', resolved: false,
    },
  ],

  resolvedAlerts: [
    { id: 101, lotName: 'Lote Sur', type: 'sanitaria', description: 'Pulgón verde — tratado con clorpirifos.', date: '2025-03-20', resolution: 'Aplicación realizada el 22/03/2025' },
    { id: 102, lotName: 'Lote Norte', type: 'fenológica', description: 'Retraso germinación — resuelta.', date: '2025-03-10', resolution: 'Se confirmó germinación uniforme el 15/03/2025' },
  ],

  costs: [
    { lotId: 1, lotName: 'Lote Norte', crop: 'Soja', total: 485000, interventions: 4, mainPest: 'Roya asiática' },
    { lotId: 2, lotName: 'Lote Sur', crop: 'Maíz', total: 312000, interventions: 2, mainPest: 'Trips del maíz' },
    { lotId: 3, lotName: 'Lote Este', crop: 'Trigo', total: 98000, interventions: 1, mainPest: 'Mancha amarilla' },
  ],

  costDetails: [
    { id: 1, lotId: 1, date: '2025-04-17', pest: 'Roya asiática', products: 'Fungicida triazol + Estrobilurina', qty: '96 L', total: 81000 },
    { id: 2, lotId: 1, date: '2025-03-15', pest: 'Trips', products: 'Lambda-cialotrina', qty: '60 L', total: 124000 },
    { id: 3, lotId: 1, date: '2025-02-10', pest: 'Pulgón verde', products: 'Clorpirifos', qty: '120 L', total: 156000 },
    { id: 4, lotId: 1, date: '2025-01-05', pest: 'Chinche', products: 'Bifentrin 10 EC', qty: '80 L', total: 124000 },
    { id: 5, lotId: 2, date: '2025-04-10', pest: 'Trips del maíz', products: 'Clorpirifos + Aceite mineral', qty: '114 L', total: 63500 },
    { id: 6, lotId: 2, date: '2025-02-20', pest: 'Chinche', products: 'Lambda-cialotrina', qty: '100 L', total: 248500 },
    { id: 7, lotId: 3, date: '2025-03-22', pest: 'Mancha amarilla', products: 'Glifosato', qty: '160 L', total: 98000 },
  ],

  phenoHistory: [
    { lotId: 1, campaign: 'Soja 2024/2025', data: [
      { date: '2024-10-15', stage: 'Germinación', expected: 'Germinación', onTime: true },
      { date: '2024-11-10', stage: 'Macollaje', expected: 'Macollaje', onTime: true },
      { date: '2025-01-20', stage: 'Floración', expected: 'Floración', onTime: true },
      { date: '2025-03-15', stage: 'Fructificación', expected: 'Fructificación', onTime: true },
    ]},
    { lotId: 2, campaign: 'Maíz 2023/2024', data: [
      { date: '2023-11-10', stage: 'Germinación', expected: 'Germinación', onTime: true },
      { date: '2023-12-20', stage: 'Macollaje', expected: 'Macollaje', onTime: true },
      { date: '2024-02-15', stage: 'Floración', expected: 'Floración', onTime: false },
      { date: '2024-04-08', stage: 'Fructificación', expected: 'Fructificación', onTime: false },
    ]},
  ],

  sanitaryHistory: [
    { id: 1, lotId: 1, campaign: 'Soja 2024/2025', date: '2025-04-15', pest: 'Roya asiática', level: 'medio', treatment: 'Fungicida triazol', result: 'Pendiente' },
    { id: 2, lotId: 1, campaign: 'Soja 2024/2025', date: '2025-03-28', pest: 'Trips', level: 'bajo', treatment: 'Sin intervención', result: 'Resuelto' },
    { id: 3, lotId: 1, campaign: 'Soja 2024/2025', date: '2025-02-10', pest: 'Pulgón verde', level: 'alto', treatment: 'Clorpirifos 1 L/ha', result: 'Resuelto' },
    { id: 4, lotId: 2, campaign: 'Maíz 2023/2024', date: '2025-04-08', pest: 'Trips del maíz', level: 'alto', treatment: 'Clorpirifos + Aceite', result: 'En seguimiento' },
    { id: 5, lotId: 2, campaign: 'Maíz 2023/2024', date: '2025-02-20', pest: 'Chinche', level: 'medio', treatment: 'Lambda-cialotrina', result: 'Resuelto' },
  ],

  users: [
    { id: 1, name: 'Juan Pérez', email: 'juan@laesperanza.com.ar', role: 'Productor', active: true },
    { id: 2, name: 'Roberto Gómez', email: 'rgomez@eltrebol.com.ar', role: 'Productor', active: true },
    { id: 3, name: 'Ing. Agr. Carlos Mendez', email: 'cmendez@asesor.com.ar', role: 'Asesor', active: true },
    { id: 4, name: 'Ing. Agr. Laura Sánchez', email: 'lsanchez@asesor.com.ar', role: 'Asesor', active: true },
    { id: 5, name: 'Ing. Agr. Martín Vera', email: 'mvera@asesor.com.ar', role: 'Asesor', active: false },
    { id: 6, name: 'Admin Sistema', email: 'admin@pampaiq.com.ar', role: 'Admin', active: true },
  ],

  permissions: {
    roles: ['Productor', 'Asesor', 'Admin'],
    modules: [
      { name: 'Dashboard', productor: true, asesor: true, admin: true },
      { name: 'Campos', productor: 'view', asesor: 'edit', admin: true },
      { name: 'Lotes', productor: 'view', asesor: 'edit', admin: true },
      { name: 'Campañas', productor: 'view', asesor: 'edit', admin: true },
      { name: 'Visitas', productor: 'view', asesor: 'edit', admin: true },
      { name: 'Órdenes de Aplicación', productor: 'view', asesor: 'edit', admin: true },
      { name: 'Alertas', productor: true, asesor: true, admin: true },
      { name: 'Catálogo Plagas', productor: false, asesor: 'view', admin: true },
      { name: 'Costos Sanitarios', productor: true, asesor: false, admin: true },
      { name: 'Reportes', productor: true, asesor: true, admin: true },
      { name: 'Gestión Usuarios', productor: false, asesor: false, admin: true },
      { name: 'Mis Asesores', productor: true, asesor: false, admin: true },
      { name: 'Perfil', productor: true, asesor: true, admin: true },
    ],
  },
};

// Helpers
const fmt = {
  currency: (v) => `$${Number(v).toLocaleString('es-AR')}`,
  date: (d) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  },
  area: (v) => `${v} has`,
};

const levelColors = {
  bajo: 'badge-success',
  medio: 'badge-warning',
  alto: 'badge-critical',
  crítico: 'badge-danger',
};
const levelSev = {
  bajo: 'sev-low',
  medio: 'sev-medium',
  alto: 'sev-high',
  crítico: 'sev-critical',
};
const severityLabel = { bajo: '🟢 Bajo', medio: '🟡 Medio', alto: '🟠 Alto', crítico: '🔴 Crítico' };
const statusOrder = { pendiente: 'badge-warning', ejecutada: 'badge-success', cancelada: 'badge-closed' };
const statusLabel = { pendiente: '⏳ Pendiente', ejecutada: '✅ Ejecutada', cancelada: '✗ Cancelada' };
const stageIcons = { 'Germinación': '🌱', 'Macollaje': '🌿', 'Floración': '🌸', 'Fructificación': '🌾', 'Madurez': '🟡' };
const alertSevColor = { critical: '#DC2626', high: 'var(--critical)', warning: 'var(--warning)', info: 'var(--accent)' };
const alertSevIcon = { critical: '🚨', high: '⚠️', warning: '⚠️', info: 'ℹ️' };
const alertSevLabel = { critical: 'Crítico', high: 'Alto', warning: 'Advertencia', info: 'Informativo' };
const alertSevBadge = { critical: 'badge-critical', high: 'badge-critical', warning: 'badge-warning', info: 'badge-info' };

Object.assign(window, { DATA, fmt, levelColors, levelSev, severityLabel, statusOrder, statusLabel, stageIcons, alertSevColor, alertSevIcon, alertSevLabel, alertSevBadge });
