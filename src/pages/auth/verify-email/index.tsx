import VerifyEmail from "@/components/pages/auth/verify-email";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations((locale as string) || "en", ["common"])),
    },
  };
};
