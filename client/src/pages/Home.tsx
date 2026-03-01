import { Link, useNavigate } from "react-router";
import MenuSection from "../components/home-dashboard/MenuSection";
import WelcomeCard from "../components/home-dashboard/WelcomeCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getAllInternships,
  reset,
} from "../features/internship/internshipSlice";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";

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

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { internships, isLoading, isError, isSuccess, message } =
    useAppSelector((state) => state.internships);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(getAllInternships());
  }, [dispatch]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="bg-orange-100 min-h-screen font-sans">
      <Navbar />

      <div className="flex flex-row pt-24 px-10 pb-4">
        <Sidebar topNavItems={topNavItems} settingsItems={settingsItems} />

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

          <div className="flex flex-row h-64 mt-6 gap-6">
            {internships.map((item) => (
              <Link
                key={item.id}
                to={`/internship/${item.id}`}
                className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12 flex items-center justify-center text-gray-400"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
