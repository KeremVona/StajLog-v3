import MenuSection from "../home-dashboard/MenuSection";

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

const Sidebar = () => {
  const topNavItems: MenuItem[] = [
    { title: "Home", icon: "dashboard", path: "/" },
    { title: "Add Internship", icon: "tune", path: "/menu-1" },
    { title: "Another menu item", icon: "file_copy", path: "/menu-2" },
  ];

  const settingsItems: MenuItem[] = [
    { title: "Profile", icon: "face", path: "/profile" },
    { title: "Settings", icon: "settings", path: "/settings" },
    { title: "Log out", icon: "power_settings_new", path: "/logout" },
  ];
  return (
    <aside className="w-2/12 mr-6">
      <MenuSection items={topNavItems} />
      <MenuSection items={settingsItems} />
    </aside>
  );
};

export default Sidebar;
