import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, '..', 'public', 'index.html');

test('Dashboard: HTML Static Invariants and Security Guardrails', () => {
  assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Verify FIPS 204 Parameter Sets rendered
  assert.ok(html.includes('ML-DSA-44'), 'Must display ML-DSA-44');
  assert.ok(html.includes('ML-DSA-65'), 'Must display ML-DSA-65');
  assert.ok(html.includes('ML-DSA-87'), 'Must display ML-DSA-87');

  // Verify exact byte lengths rendered
  assert.ok(html.includes('1,312 B'), 'ML-DSA-44 pk size');
  assert.ok(html.includes('2,420 B'), 'ML-DSA-44 sig size');
  assert.ok(html.includes('1,952 B'), 'ML-DSA-65 pk size');
  assert.ok(html.includes('3,309 B'), 'ML-DSA-65 sig size');
  assert.ok(html.includes('2,592 B'), 'ML-DSA-87 pk size');
  assert.ok(html.includes('4,627 B'), 'ML-DSA-87 sig size');

  // Verify Production Certification Lock
  assert.ok(
    html.includes('DEPLOYMENT: LOCKED (0/1,000 CERTIFIED)'),
    'Must display persistent mainnet deployment lock badge'
  );

  // Verify quantum resistance metrics
  assert.ok(html.includes("Shor's Algorithm"), 'Must analyze Shor vulnerability of classical crypto');
  assert.ok(html.includes('8,380,417'), 'Must state modulus q = 8,380,417');
});
