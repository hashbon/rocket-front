import useEagerConnect from "../hooks/useEagerConnect";

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  useEagerConnect();
  return children;
}
