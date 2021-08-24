import { File, FileTypes } from '../types/FileType';

export default function FileFactory() {

  const createFileObject = (
    name: string,
    content: any, 
    type: FileTypes
    ): File => {
    return {
      name: name,
      content: content,
      type: type,
    };
  }

  const createCmplFile = (name: string, content: any) => {
    const type = FileTypes.CMPL;
    return createFileObject(name, content, type);
  }

  const createSolutionFile = (content: any) => {
    const name = 'Solution';
    const type = FileTypes.SOLUTION;
    return createFileObject(name, content, type);
  }

  return({
    createCmplFile,
    createSolutionFile
  })
}