import Register from "@/components/pages/auth/register";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function RegisterPage() {
  return <Register />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations((locale as string) || "en", ["common"])),
    },
  };
};
