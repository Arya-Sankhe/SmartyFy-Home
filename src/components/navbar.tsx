import Link from "next/link";

export function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <nav 
        className="flex items-center justify-center h-14 w-full rounded-full 
        bg-black/20 dark:bg-white/10 backdrop-blur-xl 
        border border-black/10 dark:border-white/10 
        shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
      >
        {/* We center the SmartyFy text. Later we can add flex-1 items on left/right */}
        <div className="flex-1 flex justify-start px-6">
          {/* Reserved for left links */}
        </div>

        <Link 
          href="/" 
          className="font-sans text-xl font-bold tracking-tight text-white drop-shadow-sm"
        >
          SmartyFy
        </Link>

        <div className="flex-1 flex justify-end px-6">
          {/* Reserved for right actions */}
        </div>
      </nav>
    </div>
  );
}
