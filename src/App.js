import Dapp from "./components/dapp.jsx"
import { MyConnect } from "./components/myConnect.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import '@rainbow-me/rainbowkit/dist/index.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

/* adding goerli network */
const goerliChain = {
  id: 5,
  name: 'Goerli Testnet',
  network: 'Goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://goerli.etherscan.io/' },
  },
  iconUrls: ["https://goerli.etherscan.io/images/go.svg"],
  testnet: true,
}

function App() {

  const { chains, provider } = configureChains(
    [chain.mainnet, goerliChain],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact" >
        <img src="images/poolerson.png" className="top-left-image" />
        <MyConnect label="Sign in" showBalance={{
          smallScreen: false,
          largeScreen: true,
        }} accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }} />
        &nbsp;&nbsp;
        <Dapp />
        <div className="boticon">
          <span title="Github">
            <a href="https://github.com/underethsea/ethwin-app" target="_blank">
              <img src="./images/github.png" className="github" />
            </a>
          </span>
          <span title="Discord">
            <a href="https://pooltogether.com/discord" target="_blank">
              <img src="./images/discord.png" className="discord" />
            </a>
          </span>
          <span title="Docs" >
            <a href="https://docs.steth.win" target="_blank">
              <img src="./images/docs.png" className="docs" />
            </a>
          </span>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;