// Theme constants and shared styles
export const theme = {
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    muted: 'hsl(var(--muted))',
    accent: 'hsl(var(--accent))',
  },
  spacing: {
    navbarHeight: '56px',
    bottomBarHeight: '64px',
    mapPadding: '28px',
  },
  layout: {
    maxWidth: '1280px',
    sidebarWidth: '50%',
    chatWindowWidth: '320px',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
  },
  borderRadius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  }
};

export const mapStyles = {
  container: 'rounded-xl overflow-hidden shadow-xl p-4 pb-28 h-[calc(100vh-120px)]',
  mobileContainer: 'pb-[73.6px] transform -translate-y-[9.6px]',
};

export const cardStyles = {
  base: 'bg-white hover:bg-secondary transition-all duration-300',
  selected: 'border-4 border-black rounded-xl',
};

export const layoutStyles = {
  main: 'flex flex-col h-screen bg-gray-100 text-sm',
  content: 'flex-1 relative overflow-hidden',
};