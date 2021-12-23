export interface IPropsComponent extends React.InputHTMLAttributes<HTMLDivElement> {
  background?: string;
  direction?: "horizontal" | "vertical";
  forKey?: string;
  size: number; // max 16
}
