export enum FileTypes {
  CMPL = 'cmpl',
  SOLUTION = 'sol',
}

export type File = {
  name: string,
  content: any,
  type: FileTypes,
}