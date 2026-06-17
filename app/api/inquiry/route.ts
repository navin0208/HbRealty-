import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract basic fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const propertyType = formData.get('propertyType') as string;
    const location = formData.get('location') as string;
    const size = formData.get('size') as string;
    const details = formData.get('details') as string;
    const inquiryType = formData.get('inquiryType') as string; // 'sell' or 'developer'
    const rate = formData.get('rate') as string;
    const highwayDistance = formData.get('highwayDistance') as string;
    
    // Extract new 'sell' specific fields
    const legalStatus = formData.get('legalStatus') as string;
    const roadSize = formData.get('roadSize') as string;

    // Extract files
    const documentFile = formData.get('document') as File | null;
    const propertyImages = formData.getAll('propertyImages') as File[];

    console.log('Received Inquiry from:', name, email);

    // Prepare attachments for Nodemailer
    const attachments = [];

    // Helper to convert File to Buffer
    const getBuffer = async (file: File) => Buffer.from(await file.arrayBuffer());

    if (documentFile && documentFile.size > 0) {
      attachments.push({
        filename: documentFile.name,
        content: await getBuffer(documentFile)
      });
    }

    for (const img of propertyImages) {
      if (img.size > 0) {
        attachments.push({
          filename: img.name,
          content: await getBuffer(img)
        });
      }
    }

    // Prepare HTML content
    const htmlContent = `
      <h2>New Property Inquiry: ${inquiryType === 'sell' ? 'Sell Property' : 'Developer Partnership'}</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Property Type:</strong> ${propertyType}</li>
        <li><strong>Location:</strong> ${location}</li>
        <li><strong>Size:</strong> ${size}</li>
        ${rate ? "<li><strong>Rate:</strong> " + rate + "</li>" : ""}
        ${highwayDistance ? "<li><strong>Distance from Highways:</strong> " + highwayDistance + "</li>" : ""}
        ${legalStatus ? "<li><strong>Legal Status (NA):</strong> " + legalStatus + "</li>" : ""}
        ${roadSize ? "<li><strong>Road Access Width:</strong> " + roadSize + "</li>" : ""}
      </ul>
      <h3>Additional Details:</h3>
      <p>${details || 'None provided.'}</p>
      <hr />
      <p><em>Check attachments for 7/12 document and property images.</em></p>
    `;

    // Send email using Nodemailer
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const toEmail = process.env.MANAGER_EMAIL || "kamblenavin71@gmail.com"; 
      const testEmail = "navinkamble75@gmail.com";

      await transporter.sendMail({
        from: `"HB Realty Portal" <${process.env.GMAIL_USER}>`,
        to: [toEmail, testEmail].join(', '),
        subject: `New Lead: ${name} - ${inquiryType?.toUpperCase()}`,
        html: htmlContent,
        attachments: attachments.length > 0 ? attachments : undefined
      });
      console.log('Email successfully sent via Nodemailer.');
    } else {
      console.warn("GMAIL_USER or GMAIL_APP_PASSWORD is not set. Skipping actual email delivery.");
      // We will still return success for local testing purposes.
    }

    return NextResponse.json(
      { message: 'Inquiry received successfully. Our team will contact you shortly to verify.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
