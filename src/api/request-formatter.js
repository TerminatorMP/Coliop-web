import convert from 'xml-js';

const createXmlForRequest = (fileName, jobId, problemString) => {
  const json = {
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
        name: fileName,
        jobId: jobId,
        preComp: "yes",
      },
      problemFiles: {
        file: [
          {
            _attributes: {
              name: fileName,
            },
            _text: problemString,
          },
        ]
      }
    }
  }
  const options = {compact: true, ignoreComment: true, spaces: 4};
  const finalXML = convert.json2xml(json, options);

  return finalXML;
}

const convertXmlToJson = (xml) => {
  const options = {compact: true, ignoreComment: true, spaces: 4};
  return convert.xml2json(xml, options);
}

export { createXmlForRequest, convertXmlToJson };
