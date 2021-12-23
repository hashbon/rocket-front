export interface IPropsComponent {
  width?: number | string;
  opened: boolean;
  close: () => void;
  position?: "top" | "bottom";
  children?: React.ReactNode;
}
