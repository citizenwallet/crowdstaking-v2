import { useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";

const AUTOCONNECTED_CONNECTOR_IDS = ["safe"];

export function useAutoConnect() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const connectorInstance = connectors.find(
        (c) => c.id === connector && c.ready
      );

      if (connectorInstance) {
        disconnect();
        connect({ connector: connectorInstance });
      }
    });
  }, [connect, connectors, disconnect]);
}
