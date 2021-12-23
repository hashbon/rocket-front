export interface IPropsComponent {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  underline?: boolean;
  bold?: boolean;
  pointer?: boolean;
  children: React.ReactNode;
}
