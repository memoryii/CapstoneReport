// src/components/ReportPage.jsx
import { useParams } from "react-router-dom";
import Header from "./Header";
import EyeTrackingChart from "./EyeTrackingChart";

export default function ReportPage() {
  const { sessionId } = useParams();
  const [data, setData] =
    React.useState(null);

  React.useEffect(() => {
    fetch(`/api/report/${sessionId}`)
      .then((res) => res.json())
      .then(setData);
  }, [sessionId]);

  if (!data) return <div>Loading…</div>;
  return (
    <>
      <Header
        index={data.headerIndex}
      />
      <EyeTrackingChart
        data={data.tracking}
      />
    </>
  );
}
