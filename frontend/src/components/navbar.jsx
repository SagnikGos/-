import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Palette }
  from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chithi</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              {/* <Palette className="size-5" /> */}
              <div tabIndex={0} role="button" className={`btn btn-sm gap-2`}>
                <Palette className="size-5" />
                <span className="hidden sm:inline">Themes</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
                    onClick={() => setTheme(t)}
                  >
                    <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium truncate w-full text-center">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </ul>
            </div>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;