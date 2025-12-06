import { useEffect, useState } from "react";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const raw = document.cookie.split("; ").find((c) => c.startsWith("jwt="));
    const jwt = raw?.split("=")[1];

    const ws = new WebSocket(`ws://localhost:8080?token=${jwt}`);

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
