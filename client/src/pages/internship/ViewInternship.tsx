import AddLogForm from "../../components/internship/AddLogForm";
import LogCarousel from "../../components/internship/LogCarousel";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllLogs, reset } from "../../features/log/logSlice";
import { getInternshipById } from "../../features/internship/internshipSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

export interface LogData {
  id: string;
  dayNumber: number;
  date: Date | string;
  originalContent: string;
  internshipId: string;
  finalContent?: string;
  isAiImproved?: boolean;
}

const ViewInternship = () => {
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

  const { internshipId } = useParams<{ internshipId: string }>();

  if (!internshipId) {
    return <div>Internship Id not found</div>;
  }

  const dispatch = useAppDispatch();

  const { logs, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.logs,
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [logs, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(getAllLogs());
    dispatch(getInternshipById(internshipId));
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="bg-orange-100 min-h-screen font-sans">
      <Navbar />
      <div className="flex flex-row pt-24 px-10 pb-4">
        <Sidebar topNavItems={topNavItems} settingsItems={settingsItems} />
        <AddLogForm internshipId={internshipId} />
        <LogCarousel logs={logs} />
      </div>
    </div>
  );
};

export default ViewInternship;
