interface VerificationEmailProps {
  firstName: string;
  verificationLink: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  firstName,
  verificationLink,
}) => {
  return (
    <>
      <p>
        Welcome{firstName}
        {verificationLink}
      </p>
    </>
  );
};
