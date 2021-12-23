export interface IPropsComponent extends React.HTMLAttributes<HTMLDivElement> {
  title?: string,
  icon?: React.ReactNode,
  type?: "rounded" | "block" | "biggest" | "medium" | "header",
  active?: boolean,
  className: string,
  stylized?: boolean,
  forKey: string,
}
