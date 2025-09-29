import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { settings } from "@/config/settings";
import ResumeBuilder from "@/components/pages/resume/ResumeBuilder";

export default function NewResume() {
  return (
    <>
      <Head>
        <title>Create New Resume - {settings.siteName}</title>
        <meta name="description" content="Create your professional resume with our step-by-step builder" />
      </Head>
      <ResumeBuilder />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations((locale as string) || "en", ["common"])),
    },
  };
};
