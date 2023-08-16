import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  paperWallet,
  localWallet,
  trustWallet,
  magicLink,
  rainbowWallet,
} from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Toaster } from "./components/ui/Toaster";
import { getGasless } from "./utils/getGasless";
import {
  biconomyApiIdConst,
  biconomyApiKeyConst,
  chainConst,
  relayerUrlConst,
  clientIdConst,
  paperClientIdConst,
  magicLinkApiKeyConst,
} from "./consts/parameters";

const container = document.getElementById("root");
const root = createRoot(container!);
const urlParams = new URL(window.location.toString()).searchParams;

const relayerUrl = urlParams.get("relayUrl") || relayerUrlConst || "";
const biconomyApiKey =
  urlParams.get("biconomyApiKey") || biconomyApiKeyConst || "";
const biconomyApiId =
  urlParams.get("biconomyApiId") || biconomyApiIdConst || "";
const sdkOptions = getGasless(relayerUrl, biconomyApiKey, biconomyApiId);

const chain = (urlParams.get("chain") && urlParams.get("chain")?.startsWith("{")) ? JSON.parse(String(urlParams.get("chain"))) : urlParams.get("chain") || chainConst;

const clientId = urlParams.get("clientId") || clientIdConst || "";

const paperClientId = urlParams.get("paperClientId") || paperClientIdConst ||"";

const magicLinkApiKey = urlParams.get("magicLinkApiKey") || magicLinkApiKeyConst ||"";

root.render(
  <React.StrictMode>
  <ThirdwebProvider
    clientId={clientId}
    activeChain={chain} 
    sdkOptions={sdkOptions}
    supportedWallets={[
      metamaskWallet(),
      coinbaseWallet(),
      walletConnect(),
      localWallet(),
      trustWallet(),
      paperWallet({
        paperClientId: paperClientId,
      }),
      magicLink({
        apiKey: magicLinkApiKey,
      }),
      rainbowWallet(),
    ]}
  >
      <Toaster />
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
