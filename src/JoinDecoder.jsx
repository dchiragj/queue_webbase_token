import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function JoinDecoder() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/not-found", { replace: true });
      return;
    }

    try {
      const decoded = atob(token);  
      const [queueId, categoryId] = decoded.split("/");

      if (queueId && categoryId) {
        navigate(`/joinQueue/${queueId}/${categoryId}`, { replace: true });
      } else {
        navigate("/not-found", { replace: true });
      }
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  }, []);

  return <p>Redirecting...</p>;
}
