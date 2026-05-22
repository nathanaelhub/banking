'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "./Footer"

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BanksIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 21H21M3 10H21M5 6L12 3L19 6M4 10V21M20 10V21M8 14V17M12 14V17M16 14V17" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HistoryIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 8V12L15 15M3.05078 11C3.27179 6.46819 7.01766 2.875 11.6147 2.875C16.3576 2.875 20.2022 6.71955 20.2022 11.4625C20.2022 16.2054 16.3576 20.05 11.6147 20.05C8.5626 20.05 5.88378 18.4782 4.35156 16.0972M3 16L4.35156 16.0972M4.35156 16.0972L4.43555 14.625" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TransferIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const iconMap: Record<string, React.ComponentType<{ active: boolean }>> = {
  '/': HomeIcon,
  '/my-banks': BanksIcon,
  '/transaction-history': HistoryIcon,
  '/payment-transfer': TransferIcon,
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-[#FAFAF7] p-0">
          <div className="px-5 pt-7 pb-4">
            <Link href="/" className="cursor-pointer flex items-center gap-2.5">
              <div
                className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)',
                  boxShadow: '0 6px 14px -4px rgba(91,33,182,.55), inset 0 1px 0 rgba(255,255,255,.25)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.4 13.6 10.4 21.6 12 13.6 13.6 12 21.6 10.4 13.6 2.4 12 10.4 10.4Z" fill="#fff"/>
                  <circle cx="18.5" cy="5.5" r="1.6" fill="#fff" opacity=".85"/>
                </svg>
              </div>
              <span className="text-[17px] font-semibold tracking-[-0.01em] text-[#14111C]">
                Apex Finance
              </span>
            </Link>
          </div>

          <div className="mobilenav-sheet px-3">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-1 pt-2 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    item.route === '/'
                      ? pathname === '/'
                      : pathname === item.route || pathname.startsWith(`${item.route}/`)
                  const Icon = iconMap[item.route]

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          'flex gap-2.5 items-center px-2.5 py-[9px] rounded-[10px] text-[13.5px] font-medium transition-all',
                          isActive
                            ? 'text-white'
                            : 'text-[#3A3547] hover:bg-[#F4F3EE] hover:text-[#14111C]'
                        )}
                        style={isActive ? {
                          background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                          boxShadow: '0 6px 14px -4px rgba(91,33,182,.45)',
                        } : {}}
                      >
                        {Icon && <Icon active={isActive} />}
                        <p className={cn("text-[13.5px] font-medium", { "text-white": isActive, "text-[#3A3547]": !isActive })}>
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetClose>

            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
