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

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
