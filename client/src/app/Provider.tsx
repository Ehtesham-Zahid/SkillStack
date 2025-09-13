import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/src/redux/store";

interface ProviderProps {
  children: any;
}

export function Provider({ children }: ProviderProps) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
