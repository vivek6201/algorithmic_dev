import * as React from 'react';

interface VerifyEmailProps {
  name: string;
  email: string;
  token: string;
}

export const VerifyEmail = ({ name, email, token }: VerifyEmailProps) => {
  const baseUrl = process.env.AUTH_URL;
  const verifyLink = `${baseUrl}/verify?token=${token}&email=${encodeURIComponent(email)}`;

  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <p>
        Your email is: <strong>{email}</strong>
      </p>

      <div className="flex gap-2 items-center">
        <p>Click on the link to verify your email:</p>
        <a href={verifyLink}>Verify</a>
      </div>
    </div>
  );
};
