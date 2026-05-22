'use client'

import { logoutAccount } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push('/sign-in')
  }

  if (type === 'mobile') {
    return (
      <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-[12px] border border-[#ECEAE3] bg-white">
        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #A78BFA, #5B21B6)' }}
        >
          {user?.firstName?.[0]}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <b className="text-[13px] font-semibold tracking-[-0.005em] text-[#14111C] truncate">
            {user?.firstName} {user?.lastName}
          </b>
          <span className="text-[11.5px] text-[#6B6577] truncate">{user?.email}</span>
        </div>
        <button
          onClick={handleLogOut}
          className="w-7 h-7 flex items-center justify-center rounded-[8px] hover:bg-[#F4F3EE] transition-colors flex-shrink-0"
          aria-label="Log out"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="#6B6577" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-[12px] border border-[#ECEAE3] bg-white">
      <div
        className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #A78BFA, #5B21B6)' }}
      >
        {user?.firstName?.[0]}
      </div>

      <div className="flex flex-col min-w-0 flex-1 max-xl:hidden">
        <b className="text-[13px] font-semibold tracking-[-0.005em] text-[#14111C] truncate">
          {user?.firstName} {user?.lastName}
        </b>
        <span className="text-[11.5px] text-[#6B6577] truncate">{user?.email}</span>
      </div>

      <button
        onClick={handleLogOut}
        className="w-7 h-7 flex items-center justify-center rounded-[8px] hover:bg-[#F4F3EE] transition-colors flex-shrink-0 max-xl:hidden"
        aria-label="Log out"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="#6B6577" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default Footer
