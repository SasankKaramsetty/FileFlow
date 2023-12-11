  const emailTemplate = (emailFrom:string,emailTo:string,downloadPageLink:string, filename:string, filesize:string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>FileFlow Email Template</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f6f6f6;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #3498db;
          text-align: center;
          font-size: 24px; /* Adjust the font size */
          margin-bottom: 15px;
        }

        .logo {
          text-align: center;
          margin-bottom: 20px;
          font-size: 36px; /* Adjust the font size */
          font-weight: bold;
          color: #3498db;
        }

        p {
          color: #555555;
          text-align: center;
          margin-bottom: 15px;
          font-size: 16px; /* Adjust the font size */
        }

        .btn-primary table td:hover {
          background-color: #3498db !important;
        }

        .btn-primary a:hover {
          background-color: #3498db !important;
          border-color: #3498db !important;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
          color: #888888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          FileFlow
        </div>
        
        <h1>Hey ${emailTo.split('@')[0]},</h1>
        <p>${emailFrom.split('@')[0]} shared an image with you. You can download it using the link below:</p>
        <p><strong>File Name:</strong> ${filename}</p>
        <p><strong>File Size:</strong> ${filesize}</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
          <tbody>
            <tr>
              <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                <a href="${downloadPageLink}" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #3498db; border-color: #3498db; color: #ffffff;">Go to Download Page</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <p>FileFlow &copy; 2023. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  };
  
  export default emailTemplate;
  
  