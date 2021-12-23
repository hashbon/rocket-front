export interface IPropsComponent extends React.InputHTMLAttributes<HTMLDivElement> {
  value: string,
  description?: string | HTMLElement,
  maxRows?: number,
  minRows?: number,
  onChangeHandler: (event: Event) => void
}
