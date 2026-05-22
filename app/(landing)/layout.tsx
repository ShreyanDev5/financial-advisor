import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50 relative flex flex-col">
      {/* Enhanced Background with subtle textures */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/40 via-emerald-50/20 to-blue-50/30 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/20 via-transparent to-blue-100/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/10 via-transparent to-pink-100/10 pointer-events-none" />

      {/* Optimized static ambient background elements for non-distracting smooth glow */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-200/10 to-teal-200/10 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl pointer-events-none transform-gpu" />

      <Header />

      {/* Main Content with scroll optimization */}
      <main className="relative z-10 px-4 sm:px-6 pt-24 pb-28 flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
