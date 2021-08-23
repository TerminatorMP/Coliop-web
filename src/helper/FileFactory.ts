import { File, FileTypes } from '../types/FileType';

export default function FileFactory() {

  const createFileObject = (
    name: string,
    content: any, 
    type: FileTypes
    ): File => {
    return <File>{
      name: name,
      content: content,
      type: type,
    };
  }

  const createCmplFile = (name: string, content: any) => {
    const type = FileTypes.cmpl;
    return createFileObject(name, content, type);
  }

  const createSolutionFile = (content: any) => {
    const name = 'Solution';
    const type = FileTypes.solution;
    return createFileObject(name, content, type);
  }

  return({
    createCmplFile,
    createSolutionFile
  })
}