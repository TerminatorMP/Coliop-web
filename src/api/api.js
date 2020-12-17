
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

export const fetchMessages = async (jobId) => {
  let url = new URL(CMPL_SERVER_URL + '/getMessages');
  const params = {jobId: jobId}
  url.search = new URLSearchParams(params).toString();

  const result = await fetch(url, {
    method: 'GET',
    headers: header,
  });

  return result.json();
}

export const fetchSolutionStatus = async (jobId) => {
  let url = new URL(CMPL_SERVER_URL + '/checkForSolution');
  const params = {jobId: jobId}
  url.search = new URLSearchParams(params).toString();

  const result = await fetch(url, {
    method: 'GET',
    headers: header,
  });
  
  return result.json();
}

export const sendCmplProblem = async (problemXml) => {
  const data = {
    xml: problemXml,
  };

  const result = await fetch(CMPL_SERVER_URL + '/sendXML', {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)})

  return result.status;
}

export const fetchSolution = async (jobId) => {
  let url = new URL(CMPL_SERVER_URL + '/getSolution');
  const params = {jobId: jobId}
  url.search = new URLSearchParams(params).toString();

  const result = await fetch(url, {
    method: 'GET',
    headers: header,
  });

  return result.json();
}