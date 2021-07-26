class EditorCompiler {
  constructor(fileContext) {
    this.context = fileContext;
  } 

  arr = [
    {
      reg: /%data/, func: () => {console.log('i got triggered')}
    },
  ]

  check(editorString) {
    this.arr.forEach(({ reg, func }) => {
      let matches = editorString.match(reg);
      if(matches) {
        func(matches);
      }
    })
    console.log('checkedStr', editorString);
  }
}

export default EditorCompiler;