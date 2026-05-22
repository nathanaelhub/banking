'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

// Inline SVG icons for nav items
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9 21 9 15 12 15C15 15 15 21 15 21M9 21H15" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BanksIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21M3 10H21M5 6L12 3L19 6M4 10V21M20 10V21M8 14V17M12 14V17M16 14V17" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HistoryIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12L15 15M3.05078 11C3.27179 6.46819 7.01766 2.875 11.6147 2.875C16.3576 2.875 20.2022 6.71955 20.2022 11.4625C20.2022 16.2054 16.3576 20.05 11.6147 20.05C8.5626 20.05 5.88378 18.4782 4.35156 16.0972M3 16L4.35156 16.0972M4.35156 16.0972L4.43555 14.625" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TransferIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" stroke={active ? 'white' : '#6B6577'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const iconMap: Record<string, React.ComponentType<{ active: boolean }>> = {
  '/': HomeIcon,
  '/my-banks': BanksIcon,
  '/transaction-history': HistoryIcon,
  '/payment-transfer': TransferIcon,
}

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-1">
        {/* Logo / Brand mark */}
        <Link href="/" className="mb-8 cursor-pointer flex items-center gap-2.5 px-2.5">
          <div className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.4 13.6 10.4 21.6 12 13.6 13.6 12 21.6 10.4 13.6 2.4 12 10.4 10.4Z" fill="#fff"/>
              <circle cx="18.5" cy="5.5" r="1.6" fill="#fff" opacity=".85"/>
            </svg>
          </div>
          <h1 className="sidebar-logo">
            Apex<span className="text-[#7C3AED]">.</span>
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            item.route === '/'
              ? pathname === '/'
              : pathname === item.route || pathname.startsWith(`${item.route}/`)
          const Icon = iconMap[item.route]

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', { 'active-link': isActive })}
            >
              {Icon && <Icon active={isActive} />}
              <p
                className={cn('sidebar-label', {
                  '!text-white': isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          )
        })}

        <div className="mt-2 px-2.5">
          <PlaidLink user={user} />
        </div>
      </nav>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar
