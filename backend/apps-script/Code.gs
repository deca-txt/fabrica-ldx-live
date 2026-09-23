/** Scaffold only: intentionally no data store, properties or external services. */
function doPost(e) {
  var body;
  try {
    body = JSON.parse(e && e.postData && e.postData.contents || '{}');
  } catch (error) {
    return jsonResponse({ ok: false, error: { code: 'INVALID_JSON', message: 'Request inválido.' } });
  }
  if (!body || !['lead', 'recommendation'].includes(body.action)) {
    return jsonResponse({ ok: false, error: { code: 'INVALID_ACTION', message: 'Ação inválida.' } });
  }
  return jsonResponse({ ok: false, error: { code: 'NOT_CONFIGURED', message: 'Serviço ainda não configurado.' } });
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
