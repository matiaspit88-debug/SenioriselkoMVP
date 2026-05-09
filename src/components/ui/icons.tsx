const s = (size: number, children: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

export const Icons = {
  home:    (size: number) => s(size, <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></>),
  mic:     (size: number) => s(size, <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>),
  chat:    (size: number) => s(size, <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-4 3V7z"/>),
  book:    (size: number) => s(size, <><path d="M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 0 0-2 2V5z"/><path d="M8 7h8M8 11h6"/></>),
  sos:     (size: number) => s(size, <path d="M12 3l8 4v5c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V7l8-4z"/>),
  menu:    (size: number) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>),
  back:    (size: number) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>),
  close:   (size: number) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>),
  phone:   (size: number) => s(size, <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>),
  text:    (size: number) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 5h14M5 12h14M5 19h9"/></svg>),
  sun:     (size: number) => s(size, <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></>),
  heart:   (size: number) => s(size, <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>),
  plus:    (size: number) => (<svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>),
  search:  (size: number) => s(size, <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>),
  chevron: (size: number) => s(size, <path d="M9 5l7 7-7 7"/>),
}
