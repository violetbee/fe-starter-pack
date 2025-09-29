// React Things
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FileText, Upload, ArrowRight, CheckCircle, Zap, Users } from "lucide-react";

// Components
import Link from "next/link";
import AuthenticatedHeader from "@/components/layout/authenticated-header";

// Styles
import "./styles/style.css";

// Constants

export default function Landing() {
  const { t } = useTranslation();
  const router = useRouter();

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast & Easy",
      description: "Create professional CVs in minutes with our intuitive builder",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Multiple Templates",
      description: "Choose from various professionally designed templates",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "ATS Friendly",
      description: "Optimized for Applicant Tracking Systems",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Expert Designed",
      description: "Templates created by HR professionals",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedHeader />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Create Your Perfect Resume
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Build a professional resume that gets you noticed. Choose from our templates, 
              add your information, and download your CV in minutes.
            </p>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Create New Resume Card */}
              <button
                onClick={() => router.push("/resume/new")}
                className="group bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-600 transition-all duration-200"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <FileText className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Create New Resume</h3>
                  <p className="text-gray-600">Start from scratch with our step-by-step builder</p>
                  <div className="flex items-center space-x-2 text-blue-600 font-medium">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Upload Resume Card (Coming Soon) */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
                  <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8 opacity-60">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Upload Resume</h3>
                    <p className="text-gray-600">Import and enhance your existing resume</p>
                    <div className="flex items-center space-x-2 text-gray-400 font-medium">
                      <span>Upload File</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our CV Generator?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Template</h3>
              <p className="text-gray-600 text-sm">Select from our professional templates</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill Information</h3>
              <p className="text-gray-600 text-sm">Add your details step by step</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Download PDF</h3>
              <p className="text-gray-600 text-sm">Get your professional CV ready to send</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 CV Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
