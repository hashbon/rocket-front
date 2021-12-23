export interface IPropsComponent extends React.InputHTMLAttributes<HTMLDivElement> {
  description?: HTMLElement,
  title?: string,
  value: string,
  onChangeHandler: (event: Event) => void,
}
