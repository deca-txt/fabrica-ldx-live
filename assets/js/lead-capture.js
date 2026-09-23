// Inactive contract scaffold. No form, persistence, network call or PII logging.
(() => {
  const segments = new Set(['FINANCIAL','TELECOM','RETAIL_ECOMMERCE','HEALTH','INSURANCE','MOBILITY','TECHNOLOGY','SERVICES','OTHER']);
  const companySizes = new Set(['UP_TO_500','501_2000','2001_5000','5001_10000','ABOVE_10000']);
  const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  function validate(input) {
    const value = input && typeof input === 'object' ? input : {};
    const errors = [];
    for (const key of ['name','email','company']) if (typeof value[key] !== 'string' || !value[key].trim()) errors.push(key);
    if (typeof value.email === 'string' && value.email.trim() && !validEmail(value.email.trim())) errors.push('email');
    if (!segments.has(value.segment)) errors.push('segment');
    if (!companySizes.has(value.companySize)) errors.push('companySize');
    if (typeof value.commercialContactConsent !== 'boolean') errors.push('commercialContactConsent');
    if (!Array.isArray(value.selectedNeeds) || value.selectedNeeds.some(id => typeof id !== 'string')) errors.push('selectedNeeds');
    return { ok: errors.length === 0, errors };
  }
  function buildPayload(input, context = {}) {
    const result = validate(input);
    if (!result.ok) return { ok: false, errors: result.errors };
    const value = input;
    return { ok: true, payload: {
      action: 'lead',
      payload: {
        name: value.name.trim(), email: value.email.trim(), company: value.company.trim(),
        role: typeof value.role === 'string' ? value.role.trim() : '', segment: value.segment, companySize: value.companySize,
        phone: typeof value.phone === 'string' ? value.phone.trim() : '',
        freeText: typeof value.freeText === 'string' ? value.freeText.trim() : '',
        selectedNeeds: value.selectedNeeds.slice(), commercialContactConsent: value.commercialContactConsent === true,
        sessionId: typeof context.sessionId === 'string' && context.sessionId ? context.sessionId : `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,
        createdAt: new Date().toISOString(), source: typeof context.source === 'string' ? context.source : 'conarec-catalog',
        catalogContext: Array.isArray(context.catalogContext) ? context.catalogContext.filter(id => typeof id === 'string') : []
      }
    }};
  }
  async function submit() {
    return { ok: false, error: { code: 'FEATURE_DISABLED', message: 'Captura de contato indisponível.' } };
  }
  async function mockSubmit(input, adapter, onState = () => {}) {
    const built = buildPayload(input);
    if (!built.ok) { onState('error'); return { ok: false, state: 'error', error: { code: 'VALIDATION_ERROR', fields: built.errors } }; }
    onState('loading');
    try {
      const response = await adapter(built.payload);
      if (!response || response.ok !== true) throw new Error('MOCK_ERROR');
      onState('success');
      return { ok: true, state: 'success', data: response };
    } catch {
      onState('error');
      return { ok: false, state: 'error', error: { code: 'MOCK_ERROR' } };
    }
  }
  window.LDXLeadCapture = Object.freeze({ validate, buildPayload, submit, mockSubmit });
})();
