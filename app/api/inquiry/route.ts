import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real application, you would integrate with an email service here
    // e.g., Resend, SendGrid, Nodemailer, etc.
    // For now, we will simulate a successful submission.
    
    console.log('Received Inquiry:', data);
    
    // Simulate a slight delay
    await new Promise(resolve => setTimeout(resolve, 1000));

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
