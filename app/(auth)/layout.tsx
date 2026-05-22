import AuthHeroPanel from "@/components/AuthHeroPanel";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full" style={{ fontFamily: 'var(--font-geist, system-ui, sans-serif)' }}>
      {/* Left: form panel */}
      <div className="flex flex-col min-h-screen w-full max-w-[480px] bg-[#FAFAF7]">
        {children}
      </div>

      {/* Right: hero panel */}
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{
          background: 'radial-gradient(120% 90% at 100% 0%, #EDE0FF 0%, #F4EEFF 40%, #FBF8FF 100%)',
        }}
      >
        <AuthHeroPanel />
      </div>
    </main>
  );
}
