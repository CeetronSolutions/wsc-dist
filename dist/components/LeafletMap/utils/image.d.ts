export function loadImage(src: any, config?: {}): Promise<any>;
export function scaleImage(loadedImage: HTMLImageElement | string, scaleX: number, scaleY: number): Promise<HTMLImageElement>;
export function tilesToImage(tiles: Array<string | HTMLImageElement>, options?: {}): [string, Array<HTMLImageElement>, number];
