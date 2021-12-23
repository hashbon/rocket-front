export interface IPropsComponent {
  text: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onClick?: () => void;
  align?: "left" | "center" | "right";
}
