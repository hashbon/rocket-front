export interface ITabBar {
  items: ITabBarChild[];
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ITabBarChild = [object[] | ChildNode[]] | [];
