const TopBar = ({ user, onLoginClick, onLogoutClick }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-20 bg-black/30 backdrop-blur border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-semibold">logo</div>

        <div className="flex items-center gap-2">
          {!user && (
            <button
              onClick={onLoginClick}
              className="rounded-lg px-3 py-1.5 text-sm bg-white text-neutral-900 hover:bg-neutral-200"
            >
              Log in
            </button>
          )}
          {user && (
            <>
              <span className="hidden sm:block text-neutral-300 text-sm">
                {user.username}
              </span>
              <button
                onClick={onLogoutClick}
                className="rounded-lg px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 border border-white/10"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar