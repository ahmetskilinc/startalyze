interface WaitlistApprovalProps {
  firstName: string;
  verificationLink: string;
}

export const WaitlistApproval: React.FC<Readonly<WaitlistApprovalProps>> = () => {
  return (
    <>
      <p>Hi there,</p>
      <p>
        Great news — your email has been <strong>approved</strong> to join{" "}
        <strong>Startalyze</strong>!
      </p>
      <p>You can now sign up using your email and create your account:</p>
      <p>
        <a href="https://startalyze.vercel.app/signup">Sign Up Now</a>
      </p>
      <p>
        We’re excited to have you onboard. Let’s build something amazing together.
      </p>
      <p>If you have any questions, just reply to this email.</p>
      <p>
        Welcome aboard,
        <br />
        <strong>The Startalyze Team</strong>
      </p>
    </>
  );
};
