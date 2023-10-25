interface IProps {
  handleNavToggle: () => void;
}

function MobileNavigation({ handleNavToggle }: IProps) {
  return (
    <nav className="flex flex-col gap-4 text-right">
      <a
        // isCurrentPage={location.pathname === "/"}
        href="/"
        onClick={() => handleNavToggle()}
      >
        Bake
      </a>

      {/* <NavLink
        isCurrentPage={location.pathname === '/dashboard'}
        to="/dashboard"
      >
        Dashboard
      </NavLink> */}
      <a href="https://breadchain.mirror.xyz/">Blog</a>
    </nav>
  );
}
export default MobileNavigation;
