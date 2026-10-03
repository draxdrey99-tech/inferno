/**
 * Lead notifications. When the contact form saves a lead, one email goes to
 * the team so nobody has to poll the database, and one goes back to the
 * prospect immediately so speed-to-first-response does not depend on
 * someone checking the inbox. Sending uses Resend's HTTP API directly (no
 * SDK), and a failure here never fails the form: the lead is already in the
 * table, and the error is logged for the Vercel function logs.
 *
 * Configuration (Vercel environment variables):
 *   RESEND_API_KEY    set by the Resend marketplace integration
 *   LEAD_NOTIFY_TO    comma-separated recipient list (team notification)
 *   LEAD_NOTIFY_FROM  verified sender, e.g. "Inferno Emails <leads@infernoemails.com>"
 */

import { calendlyHref } from './site';

export type LeadRecord = {
  name: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  message: string;
  source: string;
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const notifyConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_TO);

/** Shared send path for both the team notification and the prospect reply. */
async function send(
  key: string,
  payload: { from: string; to: string[]; reply_to?: string; subject: string; text: string; html: string }
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[lead] notification failed', res.status, body.slice(0, 300));
      return { sent: false, reason: `http ${res.status}` as const };
    }
    return { sent: true as const };
  } catch (err) {
    console.error('[lead] notification error', err);
    return { sent: false, reason: 'network' as const };
  } finally {
    clearTimeout(timer);
  }
}

export async function notifyLead(lead: LeadRecord) {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.LEAD_NOTIFY_TO || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!key || !to.length) return { sent: false, reason: 'not configured' as const };

  const from = process.env.LEAD_NOTIFY_FROM || 'Inferno Emails <leads@infernoemails.com>';
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Company', lead.company || '(not given)'],
    ['Store URL', lead.website || '(not given)'],
    ['Phone', lead.phone || '(not given)'],
    ['Source', lead.source],
  ];
  const text = [
    `New audit request from ${lead.name}`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    lead.message || '(none)',
    '',
    `Reply to ${lead.email} within one business day. The site promised that.`,
  ].join('\n');
  const html = `<!doctype html><body style="font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#171717;margin:0;padding:24px">
<h1 style="font-size:20px;margin:0 0 16px">New audit request from ${esc(lead.name)}</h1>
<table style="border-collapse:collapse;font-size:15px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`
    )
    .join('')}</table>
<h2 style="font-size:15px;margin:20px 0 6px;color:#666">Message</h2>
<p style="white-space:pre-wrap;margin:0 0 20px">${esc(lead.message || '(none)')}</p>
<p style="color:#666;font-size:13px">Reply to <a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a> within one business day. The site promised that.</p>
</body>`;

  return send(key, {
    from,
    to,
    reply_to: lead.email,
    subject: `New audit request: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
    text,
    html,
  });
}

/**
 * Sent to the prospect the moment their audit request is saved, so speed
 * to first response does not depend on someone checking the inbox. Signed
 * by the team, not an invented person: no named founder is confirmed on
 * the site yet (see docs/SEO-GEO-ROADMAP.md, trust items).
 */
export async function notifyProspect(lead: LeadRecord) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: 'not configured' as const };

  const from = process.env.LEAD_NOTIFY_FROM || 'Inferno Emails <leads@infernoemails.com>';
  const booking = calendlyHref('autoresponder');
  const firstName = lead.name.trim().split(/\s+/)[0] || lead.name;

  const text = [
    `Hi ${firstName},`,
    '',
    'Got your details. We will review your account and reply within one business day with what we found and what we would do about it.',
    '',
    `Do not want to wait? Book a time now: ${booking}`,
    '',
    'The Inferno Emails team',
  ].join('\n');
  const html = `<!doctype html><body style="font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#171717;margin:0;padding:24px">
<p>Hi ${esc(firstName)},</p>
<p>Got your details. We will review your account and reply within one business day with what we found and what we would do about it.</p>
<p><a href="${esc(booking)}">Don't want to wait? Book a time now</a></p>
<p style="color:#666;font-size:13px">The Inferno Emails team</p>
</body>`;

  return send(key, {
    from,
    to: [lead.email],
    subject: 'Got your audit request',
    text,
    html,
  });
}
