import NavbarNew from "@/components/NavbarNew";
import Footer from "@/components/Footer";
import ClientRouteProtector from "@/components/ClientRouteProtector";
import { ToasterProvider } from "@/components/ToasterProvider";

export default async function PostsLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 mt-10 mx-auto px-4 overflow-hidden text-gray-900 dark:text-white  py-1">
      <NavbarNew />
      <main>
        <ClientRouteProtector>{children}</ClientRouteProtector>
          <ToasterProvider />
      </main>
      <Footer />
    </div>
  );
}
