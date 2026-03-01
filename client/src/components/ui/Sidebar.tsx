import MenuSection from "../home-dashboard/MenuSection";

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  topNavItems: MenuItem[];
  settingsItems: MenuItem[];
}

const Sidebar = ({ topNavItems, settingsItems }: SidebarProps) => {
  return (
    <aside className="w-2/12 mr-6">
      <MenuSection items={topNavItems} />
      <MenuSection items={settingsItems} />
    </aside>
  );
};

export default Sidebar;
