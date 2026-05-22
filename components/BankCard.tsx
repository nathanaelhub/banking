import { formatAmount } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Copy from './Copy'

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        style={{
          display: 'block',
          background: 'radial-gradient(120% 90% at 100% 0%, rgba(255,255,255,.22), transparent 55%), linear-gradient(135deg, #8B5CF6, #5B21B6)',
          borderRadius: 16,
          padding: 18,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          textDecoration: 'none',
          minHeight: 176,
        }}
      >
        {/* Striped overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.05) 0 1px, transparent 1px 14px)',
            mixBlendMode: 'overlay',
            opacity: .8,
            pointerEvents: 'none',
          }}
        />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <span style={{ fontSize: 12.5, fontWeight: 500, letterSpacing: '.02em', opacity: .92 }}>
            {account.name}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.04em', opacity: .95 }}>
            apex.
          </span>
        </div>

        {/* EMV Chip */}
        <div
          style={{
            width: 28,
            height: 20,
            borderRadius: 5,
            background: 'linear-gradient(135deg, #F2D58A, #C99B36)',
            marginTop: 18,
            boxShadow: 'inset 0 0 0 .5px rgba(0,0,0,.15)',
          }}
        />

        {/* Card number */}
        <div
          style={{
            marginTop: 34,
            fontFamily: 'var(--font-geist-mono, monospace)',
            letterSpacing: '.18em',
            fontSize: 14.5,
            opacity: .95,
            position: 'relative',
          }}
        >
          •••• •••• •••• {account?.mask}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', opacity: .7 }}>
              {showBalance ? 'Balance' : 'Cardholder'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontSize: 16,
                fontWeight: 500,
                marginTop: 2,
              }}
            >
              {showBalance ? formatAmount(account.currentBalance) : userName}
            </div>
          </div>
          <div style={{ fontSize: 11, opacity: .8, fontFamily: 'var(--font-geist-mono, monospace)' }}>
            05/29
          </div>
        </div>
      </Link>

      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  )
}

export default BankCard
