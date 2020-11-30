import convert from 'xml-js';


const createXmlForRequest = (jobId, problemString) => {
  let json = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'utf-8',
      },
    },
    CmplInstance: {
      _attributes: {
        version: '1.0',
      },
      general: {
        name: 'diet.cmpl',
        jobId: jobId,
      },
      problemFiles: {
        file: [
          {
            _attributes: {
              name: 'diet.cmpl',
              type: 'cmplMain',
            },
            _text: problemString,
          },
        ]
      }
    }
  }
  var options = {compact: true, ignoreComment: true, spaces: 4};
  let finalXML = convert.json2xml(json, options);
  return finalXML;
}

export { createXmlForRequest };
