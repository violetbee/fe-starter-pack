import "../styles/style.css";
import AuthenticatedHeader from "./authenticated-header";

type Props = {
  children: React.ReactNode;
  showHeader?: boolean;
};

export default function RootLayout({ children, showHeader = true }: Props) {
  return (
    <div className="root-layout min-h-screen bg-gray-50">
      {showHeader && <AuthenticatedHeader />}
      <main className={showHeader ? "" : "min-h-screen"}>
        {children}
      </main>
    </div>
  );
}
