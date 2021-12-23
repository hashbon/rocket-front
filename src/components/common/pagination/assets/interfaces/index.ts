export interface IMoreButtonProps {
  loadingStatus: boolean,
  onClick?: () => void,
}

export interface IPropsComponent {
  loadingMore: () => void,
  loadingStatus: boolean,
  children: React.ReactNode,
  hasNext: boolean
}
