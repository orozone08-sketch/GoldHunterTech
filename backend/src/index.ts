import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';

type Bindings = { DB: D1Database; ATTACHMENTS?: R2Bucket };
const app = new Hono<{ Bindings: Bindings }>();
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const fields = ['name', 'email', 'phone', 'company', 'country', 'interest', 'capacity',
  'project_type', 'feed', 'production_per_day', 'country_city', 'available_area', 'planner', 'message'];

app.get('/api/health', async (c) => {
  await c.env.DB.prepare('SELECT 1').first();
  return c.json({ status: 'ok', service: 'GoldHunterTech', database: 'ok', attachments: Boolean(c.env.ATTACHMENTS) });
});
app.post('/api/contact', bodyLimit({ maxSize: MAX_FILE_BYTES + 64 * 1024, onError: (c) => c.json({ success: false, message: 'Request exceeds 5 MB.' }, 413) }), async (c) => {
  const origin = c.req.header('Origin');
  if (origin && origin !== new URL(c.req.url).origin) return c.json({ success: false, message: 'Invalid origin.' }, 403);
  let form: FormData;
  try { form = await c.req.formData(); } catch { return c.json({ success: false, message: 'Invalid form data.' }, 400); }
  const details: Record<string, string> = {};
  for (const key of fields) {
    const value = form.get(key);
    if (value !== null && typeof value !== 'string') return c.json({ success: false, message: 'Invalid field.' }, 422);
    details[key] = (value ?? '').trim();
    if (details[key].length > (key === 'message' ? 10000 : 1000)) return c.json({ success: false, message: 'Field too long.' }, 422);
  }
  if (!details.name || !details.phone || !details.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    return c.json({ success: false, message: 'Name, valid email, phone and message are required.' }, 422);
  }
  const id = crypto.randomUUID();
  const file = form.get('attachment');
  let key: string | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) return c.json({ success: false, message: 'Attachment exceeds 5 MB.' }, 413);
    if (!c.env.ATTACHMENTS) return c.json({ success: false, message: 'File uploads are not available yet. Please submit without an attachment.' }, 503);
    key = `enquiries/${id}`;
    await c.env.ATTACHMENTS.put(key, file.stream(), { httpMetadata: { contentType: 'application/octet-stream' } });
  }
  try {
    await c.env.DB.prepare('INSERT INTO enquiries (id, created_at, name, email, phone, details_json, attachment_key, attachment_name, attachment_type, attachment_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind(id, new Date().toISOString(), details.name, details.email, details.phone, JSON.stringify(details), key,
        key && file instanceof File ? file.name : null, key && file instanceof File ? file.type : null, key && file instanceof File ? file.size : null).run();
  } catch (error) {
    if (key) await c.env.ATTACHMENTS!.delete(key);
    throw error;
  }
  return c.json({ success: true, message: 'Enquiry received', id }, 201);
});
app.notFound((c) => c.json({ success: false, message: 'Not found' }, 404));
app.onError((error, c) => {
  console.error('API request failed', error.message);
  return c.json({ success: false, message: 'Unable to process request. Please try again.' }, 500);
});
export default app;
