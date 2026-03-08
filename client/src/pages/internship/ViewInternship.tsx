import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddLogForm from "../../components/internship/AddLogForm";
import LogCarousel from "../../components/internship/LogCarousel";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { getInternshipById } from "../../features/internship/internshipSlice";
import { getAllLogs, reset } from "../../features/log/logSlice";

const ViewInternship = () => {
  const [dNumber, setDNumber] = useState<number>(0);
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

  useEffect(() => {
    if (logs && logs.length > 0) {
      const lastDayNumber = logs[logs.length - 1].dayNumber + 1;
      setDNumber(lastDayNumber);
    }
  }, [logs]);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="bg-orange-100 min-h-screen font-sans">
      <Navbar />
      <div className="flex flex-row pt-24 px-10 pb-4">
        <Sidebar />
        <AddLogForm internshipId={internshipId} dNumber={dNumber} />
        <LogCarousel logs={logs} />
      </div>
    </div>
  );
};

export default ViewInternship;
