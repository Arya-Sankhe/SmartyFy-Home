import Link from "next/link";

export function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav 
        className="flex items-center justify-center h-16 w-full rounded-full 
        bg-black/10 dark:bg-black/20 backdrop-blur-2xl saturate-150
        border border-white/20 dark:border-white/10 
        shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all"
      >
        {/* We center the SmartyFy text. Later we can add flex-1 items on left/right */}
        <div className="flex-1 flex justify-start px-8">
          {/* Reserved for left links */}
        </div>

        <Link 
          href="/" 
          className="font-sans text-[26px] font-bold tracking-tight text-white drop-shadow-sm"
        >
          SmartyFy
        </Link>

        <div className="flex-1 flex justify-end px-8">
          {/* Reserved for right actions */}
        </div>
      </nav>
    </div>
  );
}
