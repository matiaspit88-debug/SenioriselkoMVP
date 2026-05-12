import { useState, useEffect, useRef } from 'react'
import type { Screen, ChatMode } from '../../types'
import { askClaude } from '../../lib/claude'
import type { ModeSession } from '../../App'
import Orb from '../ui/Orb'
import StatusBar from '../ui/StatusBar'
import TopBar from '../ui/TopBar'
import Dock from '../ui/Dock'
import { Icons } from '../ui/icons'

interface ChatScreenProps {
  onNavigate: (s: Screen) => void
  onMenu: () => void
  miloSession: ModeSession
  setMiloSession: React.Dispatch<React.SetStateAction<ModeSession>>
  apuriSession: ModeSession
  setApuriSession: React.Dispatch<React.SetStateAction<ModeSession>>
}

const segStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 7,
  padding: '7px 12px 7px 8px', borderRadius: 999,
  background: active ? 'rgba(255,255,255,0.95)' : 'transparent',
  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(0,0,0,0.04)' : 'none',
  cursor: 'pointer', border: 'none', fontFamily: 'inherit',
  transition: 'background 0.2s, box-shadow 0.2s',
})

export default function ChatScreen({
  onNavigate, onMenu,
  miloSession, setMiloSession,
  apuriSession, setApuriSession,
}: ChatScreenProps) {
  const [chatMode, setChatMode] = useState<ChatMode>('companion')
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isInfo = chatMode === 'info'
  const session = isInfo ? apuriSession : miloSession
  const setSession = isInfo ? setApuriSession : setMiloSession

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [session.msgs, typing])

  const switchMode = (m: ChatMode) => {
    setChatMode(m)
    setTyping(false)
    setInput('')
  }

  const send = async () => {
    const t = input.trim()
    if (!t || typing) return

    const userMsg = { role: 'user' as const, content: t }
    const baseHistory = session.started ? session.history : []
    const newHistory = [...baseHistory, userMsg]

    setSession(s => ({
      started: true,
      msgs: [...(s.started ? s.msgs : []), { from: 'user' as const, text: t }],
      history: newHistory,
    }))
    setInput('')
    setTyping(true)

    const reply = await askClaude(newHistory, isInfo ? 'info' : 'companion')

    setSession(s => ({
      ...s,
      msgs: [...s.msgs, { from: 'bot' as const, text: reply }],
      history: [...s.history, { role: 'assistant' as const, content: reply }],
    }))
    setTyping(false)
  }

  const sendGradient = isInfo ? 'var(--g-ai)' : 'var(--g-chat)'
  const placeholder = isInfo ? 'Kysy mitä tahansa…' : 'Kerro kuulumisesi, Milo kuuntelee…'

  return (
    <div className="ss-screen">
      <StatusBar />
      <TopBar onMenu={onMenu} right={
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: 4, borderRadius: 999,
          background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)', gap: 2,
        }}>
          <button style={segStyle(!isInfo)} onClick={() => switchMode('companion')}>
            <Orb kind="chat" size={26} halo={false} />
            <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600 }}>Milo</span>
          </button>
          <button style={segStyle(isInfo)} onClick={() => switchMode('info')}>
            <Orb kind="ai" size={26} halo={false} />
            <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600 }}>Apuri</span>
          </button>
        </div>
      } />

      <div ref={scrollRef} className="ss-scroll" style={{
        position: 'absolute', top: 116, left: 0, right: 0,
        bottom: 'calc(188px + env(safe-area-inset-bottom, 0px))',
      }}>
        <div style={{ padding: '8px 22px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 12, marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Tänään
            </div>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <span style={{
                display: 'inline-block', fontSize: 11,
                color: isInfo ? 'var(--ai)' : 'var(--chat)',
                background: isInfo ? 'rgba(63,127,224,0.10)' : 'rgba(163,129,220,0.10)',
                borderRadius: 999, padding: '4px 12px',
                fontWeight: 600, letterSpacing: '0.04em',
              }}>
                {isInfo ? 'Apuri — lyhyet vastaukset' : 'Milo — seurasi, aina paikalla'}
              </span>
            </div>
            {session.msgs.map((m, i) => (
              <div key={i} className="ss-fade" style={{ display: 'flex', justifyContent: m.from === 'bot' ? 'flex-start' : 'flex-end' }}>
                <div className={`ss-bubble ${m.from === 'bot' ? 'bot' : 'user'}`}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className="ss-bubble bot" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, paddingTop: 18, paddingBottom: 18 }}>
                  <span className="typing-dot" style={{ animationDelay: '0s' }} />
                  <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                  <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 'calc(108px + env(safe-area-inset-bottom, 0px))',
        left: 22, right: 22,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: 32, padding: 8,
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 8px 28px rgba(70,55,40,0.10), inset 0 0 0 1px rgba(0,0,0,0.04)',
        zIndex: 30,
      }}>
        <button style={{ width: 48, height: 48, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)', cursor: 'pointer' }}>
          {Icons.plus(22)}
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={placeholder}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 17, color: 'var(--ink)', fontFamily: 'inherit' }}
        />
        <button onClick={send} disabled={typing} style={{
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          background: input.trim() ? sendGradient : 'rgba(200,194,187,0.6)',
          color: input.trim() ? '#fff' : 'var(--ink-3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: typing ? 'default' : 'pointer', flexShrink: 0,
          transition: 'background 0.25s, color 0.25s',
          opacity: typing ? 0.6 : 1,
        }}>
          {input.trim() ? Icons.send(22) : Icons.mic(24)}
        </button>
      </div>

      <Dock active="chat" onChange={onNavigate} />
      <div className="home-indicator" />
    </div>
  )
}
