
const CMPL_SERVER_URL = 'http://localhost:5000';

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const fetchJobId = async (fileName) => {
  const data = {
    name: fileName,
  };

  const result = await fetch(CMPL_SERVER_URL + '/getJobId', {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)})
  
  return result.json();
}

export const fetchSolution = async (jobId, problemXml) => {
  const data = {
    jobId: jobId,
    xml: `${problemXml}`,
  };

  const result = await fetch(CMPL_SERVER_URL + '/solve', {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)})

  return result.json();
}