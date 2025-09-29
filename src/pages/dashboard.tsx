import RootLayout from "@/components/layout/root.layout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSession } from "next-auth/react";

export default function Dashboard() {
  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your CV dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New CV Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New CV</h3>
              <p className="text-gray-600 text-sm mb-4">Start building your professional resume</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Recent CVs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent CVs</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">Software Developer CV</p>
                  <p className="text-sm text-gray-600">Updated 2 days ago</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">Edit</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-900">Marketing Manager CV</p>
                  <p className="text-sm text-gray-600">Updated 1 week ago</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">Edit</button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total CVs</span>
                <span className="font-semibold text-gray-900">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Downloads</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Templates Used</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Modern", "Classic", "Professional", "Creative"].map((template) => (
              <div key={template} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{template} Template</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{template}</h3>
                  <p className="text-sm text-gray-600 mb-3">Perfect for {template.toLowerCase()} roles</p>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations((locale as string) || "en", ["common"])),
    },
  };
};
