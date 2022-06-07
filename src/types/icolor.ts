export enum Color {
  purple = 'apxpurple',
  red = 'apxred',
  green = 'apxgreen',
  gray = 'apxgray',
}

export enum ColorTone {
  extralight = 100,
  light = 200,
  dark = 500,
}

export default interface IColor {
  color: string;
  tone: number;
}
