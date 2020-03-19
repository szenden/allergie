export interface INewsRequest{
    page: number;
    pageSize: number;
}

export interface NewsArticleDto {
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}