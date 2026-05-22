const AuthHeroPanel = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-12 overflow-hidden">
      {/* Dot grid background */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#C4B5FD" fillOpacity="0.45" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[380px]">
        {/* Brand mark */}
        <div
          className="w-[52px] h-[52px] rounded-[15px] flex items-center justify-center mb-7"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #5B21B6 100%)',
            boxShadow: '0 12px 28px -6px rgba(91,33,182,.55), inset 0 1px 0 rgba(255,255,255,.25)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.4 13.6 10.4 21.6 12 13.6 13.6 12 21.6 10.4 13.6 2.4 12 10.4 10.4Z" fill="#fff"/>
            <circle cx="18.5" cy="5.5" r="1.6" fill="#fff" opacity=".85"/>
          </svg>
        </div>

        <h1
          className="text-[32px] font-semibold tracking-[-0.03em] mb-3"
          style={{ color: '#14111C', lineHeight: 1.2 }}
        >
          One account.{' '}
          <span style={{ color: '#7C3AED' }}>Everything</span>
          {' '}in motion.
        </h1>
        <p className="text-[15px] text-[#6B6577] leading-relaxed mb-10">
          Manage your finances, track spending, and transfer money — all in one elegant workspace.
        </p>

        {/* Floating bank card */}
        <div
          className="w-full max-w-[300px] mb-6 relative"
          style={{
            background: 'radial-gradient(120% 90% at 100% 0%, rgba(255,255,255,.22), transparent 55%), linear-gradient(135deg, #8B5CF6, #5B21B6)',
            borderRadius: 16,
            padding: 20,
            color: '#fff',
            overflow: 'hidden',
            boxShadow: '0 24px 48px -12px rgba(91,33,182,.45)',
          }}
        >
          {/* Stripe overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 1px, transparent 1px 14px)',
              mixBlendMode: 'overlay',
              opacity: .8,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <span style={{ fontSize: 12, fontWeight: 500, opacity: .9 }}>Apex Checking</span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.04em' }}>apex.</span>
          </div>
          <div style={{ width: 26, height: 18, borderRadius: 4, background: 'linear-gradient(135deg,#F2D58A,#C99B36)', marginTop: 16 }} />
          <div style={{ marginTop: 28, fontFamily: 'monospace', letterSpacing: '.18em', fontSize: 14, opacity: .9 }}>
            •••• •••• •••• 4219
          </div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
            <div>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.1em', opacity: .7 }}>Balance</div>
              <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 500, marginTop: 2 }}>$12,840.00</div>
            </div>
            <div style={{ fontSize: 11, opacity: .8, fontFamily: 'monospace' }}>05/29</div>
          </div>
        </div>

        {/* Floating chips */}
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-medium"
            style={{ background: 'white', color: '#5B21B6', boxShadow: '0 4px 14px rgba(0,0,0,.08)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Instant transfer
          </div>
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-medium"
            style={{ background: 'white', color: '#1F8A5B', boxShadow: '0 4px 14px rgba(0,0,0,.08)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#1F8A5B"/>
            </svg>
            Auto-save
          </div>
        </div>

        {/* Trust strip */}
        <div
          className="flex items-center gap-5 flex-wrap justify-center"
          style={{ color: '#6B6577', fontSize: 11.5 }}
        >
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z" stroke="#6B6577" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            FDIC-insured
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#6B6577" strokeWidth="1.75"/>
              <path d="M7 11V7C7 4.79086 9.23858 3 12 3C14.7614 3 17 4.79086 17 7V11" stroke="#6B6577" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
            SOC 2 Type II
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V12C3 16.55 7.08 20.74 12 22C16.92 20.74 21 16.55 21 12V7L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="#6B6577"/>
            </svg>
            256-bit encryption
          </span>
        </div>
      </div>
    </div>
  )
}

export default AuthHeroPanel
