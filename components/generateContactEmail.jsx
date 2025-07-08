export function generateContactEmail(data) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Contact Message - SunLink Solar</title>
  </head>
  <body style="margin:0; padding:0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#fff7ed;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:650px; margin:auto; background:#ffffff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.1); overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg, #0369a1 0%, #075985 100%); color:white; padding:30px; text-align:center;">
          <div style="display:flex; align-items:center; justify-content:center; gap:12px;">
            <div style="width:48px; height:48px; background:#ff7b00; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:24px; color:white; font-weight:bold;">
              ☀
            </div>
            <div>
              <h1 style="margin:0; font-size:24px; font-weight:bold; color:white;">SunLink Solar</h1>
              <p style="margin:4px 0 0; font-size:14px; color:#fdba74;">Enterprise</p>
            </div>
          </div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px;">
          <h2 style="font-size:24px; font-weight:bold; color:#075985; margin-bottom:24px; text-align:center;">
            New Contact Message
          </h2>

          <!-- Contact Info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg, #f0f9ff 0%, #fff7ed 100%); border-radius:12px; padding:24px; border:1px solid #bae6fd;">
            <tr>
              <td style="padding:16px; border-left:4px solid #ff7b00;">
                <strong style="color:#0369a1; font-size:14px;">Name</strong><br />
                <span style="font-size:16px; font-weight:500;">${data.name}</span>
              </td>
              <td style="padding:16px; border-left:4px solid #ff7b00;">
                <strong style="color:#0369a1; font-size:14px;">Email</strong><br />
                <span style="font-size:16px; font-weight:500;">${data.email}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:16px; border-left:4px solid #ff7b00;">
                <strong style="color:#0369a1; font-size:14px;">Phone</strong><br />
                <span style="font-size:16px; font-weight:500;">${data.phone || "N/A"}</span>
              </td>
              <td style="padding:16px; border-left:4px solid #ff7b00;">
                <strong style="color:#0369a1; font-size:14px;">Service</strong><br />
                <span style="font-size:16px; font-weight:500;">${data.service || "N/A"}</span>
              </td>
            </tr>
            ${
              data.subject
                ? `
            <tr>
              <td colspan="2" style="padding:16px; border-left:4px solid #ff7b00;">
                <strong style="color:#0369a1; font-size:14px;">Subject</strong><br />
                <span style="font-size:16px; font-weight:500;">${data.subject}</span>
              </td>
            </tr>
            `
                : ""
            }
          </table>

          <!-- Message -->
          <div style="margin-top:24px; background:white; border-radius:12px; padding:24px; border:1px solid #bae6fd; box-shadow:0 4px 12px rgba(0, 0, 0, 0.05);">
            <div style="font-weight:600; color:#0369a1; font-size:16px; margin-bottom:12px;">💬 Message</div>
            <div style="background:#f0f9ff; padding:20px; border-radius:8px; border-left:4px solid #00bfff; font-size:16px; line-height:1.7; color:#444;">
              ${data.message}
            </div>
          </div>

          <!-- Accent Line -->
          <div style="height:4px; background:linear-gradient(90deg, #ff7b00 0%, #00bfff 100%); margin:32px 0;"></div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f0f9ff; padding:20px; text-align:center; border-top:1px solid #bae6fd;">
          <p style="font-size:13px; color:#0284c7; margin:0;">
            This message was sent from the contact form on your SunLink Solar website.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
