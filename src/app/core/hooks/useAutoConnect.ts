import { Connector, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

const AUTOCONNECTED_CONNECTOR_IDS = ["safe"];

export function useAutoConnect(activeConnector: Connector | undefined) {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const connectorInstance = connectors.find(
        (c) => c.id === connector && c.ready
      );

      if (connectorInstance && !activeConnector) {
        connect({ connector: connectorInstance });
      }
    });
  }, [connect, connectors, disconnect, activeConnector]);

  useEffect(() => {
    if (activeConnector) disconnect();
  }, [activeConnector, disconnect]);
}
