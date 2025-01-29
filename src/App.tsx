import {
  CrossmintProvider,
  CrossmintCheckoutProvider,
  CrossmintHostedCheckout,
  useCrossmintCheckout,
} from "@crossmint/client-sdk-react-ui";
import "./App.css";

const clientApiKey = import.meta.env.VITE_CLIENT_API_KEY;
const collectionId = import.meta.env.VITE_COLLECTION_ID;

function App() {
  return (
    <div className="container">
      <CrossmintProvider apiKey={clientApiKey}>
        <CrossmintCheckoutProvider>
          <Checkout />
        </CrossmintCheckoutProvider>
      </CrossmintProvider>
    </div>
  );
}

function Checkout() {
  const { order } = useCrossmintCheckout();

  console.log({ order: order ?? {} });

  return (
    <CrossmintHostedCheckout
      lineItems={{
        collectionLocator: `crossmint:${collectionId}`,
        callData: {
          totalPrice: "0.001",
          quantity: 1,
        },
      }}
      payment={{
        crypto: { enabled: true }, // same as embedded
        fiat: { enabled: true }, // same, except we can't disable google pay, apple pay, CC
      }}
    />
  );
}

export default App;
