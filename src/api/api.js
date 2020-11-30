
const CMPL_SERVER_URL = 'http://localhost:5000';

export const fetchJobId = async (fileName) => {
  let data = {
    name: fileName,
  };

  let result = await fetch(CMPL_SERVER_URL + '/getJobId', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)})
  
  return result.json();
}

export const fetchSolution = async (jobId, problemXml) => {
  let data = {
    jobId: jobId,
    xml: `${problemXml}`,
  };

  let result = await fetch(CMPL_SERVER_URL + '/solve', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)})

  return result.json();
}