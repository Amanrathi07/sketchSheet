import { useEffect, useState } from "react";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const raw = document.cookie.split("; ").find((c) => c.startsWith("token="));

    const jwt = raw?.split("=")[1];

    const ws = new WebSocket(`ws://localhost:8080?token=eyJhbGciOiJIUzI1NiJ9.OTNiMjI5MDQtNThkMi00MTVmLThhNTEtNmM4MGQ5MDQ4MWEw.RYaZaFPBjHPgbvVi6ks73L_9ftdgVfiVQIsc7xF2CjM`);

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
