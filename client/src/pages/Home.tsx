import MenuSection from "../components/home-dashboard/MenuSection";
import WelcomeCard from "../components/home-dashboard/WelcomeCard";

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  buttonText?: string;
  bgColor: string;
  borderColor: string;
  bgImage?: string;
  isLink?: boolean;
}

const Home = () => {
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
    <div className="bg-orange-100 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full shadow-sm">
        <div className="flex items-center justify-between py-2">
          <div className="font-bold text-blue-900 text-xl">
            Admin<span className="text-orange-600">Panel</span>
          </div>
          <div className="flex items-center text-gray-500">
            <span
              className="material-icons-outlined p-2 cursor-pointer"
              style={{ fontSize: "30px" }}
            >
              search
            </span>
            <span
              className="material-icons-outlined p-2 cursor-pointer"
              style={{ fontSize: "30px" }}
            >
              notifications
            </span>
            <div
              className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2 border border-gray-200"
              style={{
                backgroundImage: `url('https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg')`,
              }}
            />
          </div>
        </div>
      </nav>

      <div className="flex flex-row pt-24 px-10 pb-4">
        {/* Sidebar */}
        <aside className="w-2/12 mr-6">
          <MenuSection items={topNavItems} />
          <MenuSection items={settingsItems} />
        </aside>

        {/* Main Content */}
        <main className="w-10/12">
          <div className="flex flex-row gap-4">
            <WelcomeCard
              name="Lorem Ipsum"
              time="01:51"
              colorClass="bg-red-200 border-red-300"
              btnColor="bg-red-300"
            />
            <WelcomeCard
              name="Inbox"
              time="23"
              isMessage
              colorClass="bg-orange-200 border-orange-300"
              btnColor="bg-orange-300"
            />
          </div>

          {/* Bottom Grid */}
          <div className="flex flex-row h-64 mt-6 gap-6">
            {["a", "b", "c"].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12 flex items-center justify-center text-gray-400"
              >
                {item.toUpperCase()} Content
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
