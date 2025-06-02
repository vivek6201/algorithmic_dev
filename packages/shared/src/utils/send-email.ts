import { JSX } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

interface SendEmailProps<T> {
  Template: (props: T) => JSX.Element;
  props: T;
  to: string;
  subject: string;
}

export async function sendEmail<T>({ Template, props, to, subject }: SendEmailProps<T>) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AlgorithmicDev <onboarding@algorithmicdev.in>',
      to: [to],
      subject,
      react: Template(props),
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
