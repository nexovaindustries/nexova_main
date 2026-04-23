export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { nombre, empresa, email, telefono, mensaje } = body;

    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Nexova Web <onboarding@resend.dev>',
        to: ['nexova.industries@gmail.com'],
        reply_to: email,
        subject: `Nueva consulta de ${nombre}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:2rem;background:#f8faff;border-radius:1rem;">
            <div style="background:#112240;padding:1.5rem 2rem;border-radius:0.75rem;margin-bottom:1.5rem;">
              <h1 style="color:white;font-size:1.25rem;margin:0;">NEXOVA · Nueva Consulta</h1>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;color:#64748b;width:140px;font-size:0.85rem;">Nombre</td><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;font-weight:600;color:#112240;">${nombre}</td></tr>
              ${empresa ? `<tr><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;color:#64748b;font-size:0.85rem;">Empresa</td><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;font-weight:600;color:#112240;">${empresa}</td></tr>` : ''}
              <tr><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;color:#64748b;font-size:0.85rem;">Email</td><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;font-weight:600;color:#112240;">${email}</td></tr>
              ${telefono ? `<tr><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;color:#64748b;font-size:0.85rem;">Teléfono</td><td style="padding:0.75rem 0;border-bottom:1px solid #e8ecf4;font-weight:600;color:#112240;">${telefono}</td></tr>` : ''}
            </table>
            <div style="margin-top:1.5rem;padding:1.5rem;background:white;border-radius:0.75rem;border:1px solid #e8ecf4;">
              <p style="color:#64748b;font-size:0.8rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.1em;">Mensaje</p>
              <p style="color:#112240;line-height:1.7;white-space:pre-wrap;">${mensaje}</p>
            </div>
          </div>
        `
      })
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
