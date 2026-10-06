import { IVideo } from './mediaType';

export namespace IPlugin {
  export interface IUserVariable {
    key: string;
    title?: string;
    name?: string;
    description?: string;
    hint?: string;
    defaultValue?: string;
    default?: string;
    type?: 'string' | 'boolean' | 'number';
  }

  export interface IVideoPlugin {
    /** 插件唯一英文标识 */
    platform: string;
    /** 插件显示名称 */
    name: string;
    /** 插件语义化版本号 */
    version: string;
    /** 作者 */
    author?: string;
    /** 插件功能描述 */
    description?: string;
    /** 插件脚本的在线下载源 URL */
    srcUrl?: string;
    /** 支持的搜索分类，如 ['all', 'movie', 'tv'] */
    supportedSearchType?: string[];
    /** 用户自定义变量配置项（如 API 地址、Token、清晰度） */
    userVariables?: IUserVariable[];

    /**
     * 1. 搜索视频
     * @param query 搜索关键词
     * @param page 分页页码，从 1 开始
     * @param type 过滤分类，如 'all', 'movie', 'tv'
     */
    search: (
      query: string,
      page?: number,
      type?: string
    ) => Promise<IVideo.ISearchResult>;

    /**
     * 2. 获取视频详情与选集线路
     * @param id 视频唯一 ID
     */
    getDetail: (id: string) => Promise<IVideo.IVideoDetail>;

    /**
     * 3. 解析视频播放地址
     * @param episode 剧集对象（包含 url 等信息）
     * @param line 所属播放线路
     */
    getMediaSource: (
      episode: IVideo.IEpisodeItem,
      line?: IVideo.ILineItem
    ) => Promise<IVideo.IMediaSourceResult>;
  }
}
