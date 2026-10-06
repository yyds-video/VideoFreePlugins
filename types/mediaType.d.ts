export namespace IVideo {
  /** 简略视频项（搜索结果、列表展示） */
  export interface IVideoItem {
    id: string;
    title: string;
    cover?: string;
    description?: string;
    remarks?: string;
    year?: string;
    area?: string;
    typeName?: string;
    score?: string;
    [k: string]: any;
  }

  /** 剧集/选集单项 */
  export interface IEpisodeItem {
    id: string;
    name: string;
    url: string;
    [k: string]: any;
  }

  /** 播放线路 */
  export interface ILineItem {
    id: string;
    name: string;
    episodes: IEpisodeItem[];
    [k: string]: any;
  }

  /** 视频详情 */
  export interface IVideoDetail {
    id: string;
    title: string;
    cover?: string;
    remarks?: string;
    year?: string;
    area?: string;
    typeName?: string;
    score?: string;
    director?: string;
    actor?: string;
    intro?: string;
    lines: ILineItem[];
    [k: string]: any;
  }

  /** 媒体源解析结果 */
  export interface IMediaSourceResult {
    url: string;
    headers?: Record<string, string>;
    type?: 'hls' | 'mp4' | 'auto';
    isSniff?: boolean;
    [k: string]: any;
  }

  /** 分页搜索结果 */
  export interface ISearchResult {
    isEnd: boolean;
    data: IVideoItem[];
  }
}
