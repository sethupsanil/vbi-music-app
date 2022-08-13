export interface Albums {
  userId: number;
  id: number;
  title: string;
}

export interface PlayList extends Albums { }
export interface PlayListMenu {
  name: string;
  songs?: Albums[]
}
