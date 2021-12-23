export interface IPropsComponent {
  contextOpened: boolean,
  context?: React.ReactNode,
  contextCloseHandler?: () => void,
  children?: React.ReactNode,
  left?: React.ReactNode,
  right?: React.ReactNode,
}
