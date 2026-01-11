import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    
    if (!notificationEmail) {
      return NextResponse.json(
        { success: false, error: 'Notification email not configured' }, 
        { status: 500 }
      );
    }

    const data = await resend.emails.send({
      from: 'Yurvine Website <onboarding@resend.dev>', // Change this once you verify your domain in Resend
      to: notificationEmail,
      subject: `New Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
