export enum FileTypes {
  cmpl = 'cmpl',
  solution = 'sol',
}

export type File = {
  name: string,
  content: any,
  type: FileTypes,
}