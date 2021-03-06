import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  GraphQLProvider,
  PolarisProvider,
} from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <GraphQLProvider>
            <Routes pages={pages} />
          </GraphQLProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
