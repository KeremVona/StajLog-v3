import { useEffect } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import WelcomeCard from "../components/home-dashboard/WelcomeCard";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import {
  getAllInternships,
  reset,
} from "../features/internship/internshipSlice";

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
        <Sidebar />

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
