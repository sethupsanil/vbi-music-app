export interface Albums {
  userId: number;
  id: number;
  title: string;
}

export interface PlayList extends Albums {
  duration?: string;
  albumName?: string;
}
export interface PlayListMenu {
  name: string;
  songs?: Albums[]
}
