import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full" style={{ fontFamily: 'var(--font-geist, system-ui, sans-serif)' }}>
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <div
            className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.4 13.6 10.4 21.6 12 13.6 13.6 12 21.6 10.4 13.6 2.4 12 10.4 10.4Z" fill="#fff"/>
              <circle cx="18.5" cy="5.5" r="1.6" fill="#fff" opacity=".85"/>
            </svg>
          </div>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
