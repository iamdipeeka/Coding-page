
// const languageCodeMap = {
//   cpp: 48,
//   python: 71,
//   javascript: 102,
//   java: 62,
// };

// async function getSubmission(tokenId, callback) {
//     const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;


//   const options = {
//     method: "GET",
//     headers: {
        
//       "x-rapidapi-key":'51ee195d0amsh7a0d48d9bdbf99cp1598e9jsnda2d1e38799c',
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     callback({ apiStatus: "error", message: JSON.stringify(error) });
//   }
// }

// export async function makeSubmission({ code, language, callback, stdin }) {
//   //make a submission handle the status of the submission
//   const url =
//     "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";

//   const httpOptions = {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
      
//       "X-RapidAPI-Key": "51ee195d0amsh7a0d48d9bdbf99cp1598e9jsnda2d1e38799c",
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//     },
//     body: JSON.stringify({
//       language_id: languageCodeMap[language],
//       source_code: btoa(code),
//       stdin: btoa(stdin),
//     }),
//   };
//   /* generic response from this function
//        {

//        apistatus:'ladiong'|'erorr'|'success'
//        data:response,
//        message:'runtime error '|'compilation eror'
//     }

//     */
//   try {
//     callback({ apiStatus: "loading" });
//     const response = await fetch(url, httpOptions);
//     const result = await response.json();
//     const tokenId = result.token;
//     let statusCode = 1;//in queue
//     let apiSubmissionResult ;
//     while (statusCode === 1 || statusCode === 2) {
//       try {
//          apiSubmissionResult = await getSubmission(tokenId);
//         statusCode = apiSubmissionResult.status.id;
//       } catch(error) {
//         callback({apiStatus:'error',message:JSON.stringify(error)})
//         //break;
//         return;
//       }
//     }
//     if(apiSubmissionResult){
//         callback({apiStatus:'success',data:apiSubmissionResult})
//     }
//   } catch (error) {
//     callback({
//       apiStatus: "error",
//       message: JSON.stringify(error),
//     });
//   }
// }


const languageCodeMap = {
    cpp: 48,
    python: 71,
    javascript: 102,
    java: 62,
  };
  
  async function getSubmission(tokenId, callback) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "51ee195d0amsh7a0d48d9bdbf99cp1598e9jsnda2d1e38799c",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      callback({ apiStatus: "error", message: JSON.stringify(error) });
    }
  }
  
  export async function makeSubmission({ code, language, callback, stdin }) {
    const url = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
  
    const httpOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "51ee195d0amsh7a0d48d9bdbf99cp1598e9jsnda2d1e38799c",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: languageCodeMap[language],
        source_code: btoa(code),
        stdin: btoa(stdin || ""),
      }),
    };
  
    try {
      callback({ apiStatus: "loading" });
      const response = await fetch(url, httpOptions);
      const result = await response.json();
      const tokenId = result.token;
  
      let statusCode = 1; // Initial queue status
      let retries = 10; // Retry limit
      let apiSubmissionResult;
  
      while ((statusCode === 1 || statusCode === 2) && retries > 0) {
        try {
          apiSubmissionResult = await getSubmission(tokenId);
          statusCode = apiSubmissionResult.status.id;
          retries--;
          if (statusCode === 1 || statusCode === 2) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
          }
        } catch (error) {
          callback({ apiStatus: "error", message: JSON.stringify(error) });
          return;
        }
      }
  
      if (retries === 0) {
        callback({ apiStatus: "error", message: "Submission timeout" });
        return;
      }
  
      if (apiSubmissionResult) {
        callback({ apiStatus: "success", data: apiSubmissionResult });
      }
    } catch (error) {
      callback({
        apiStatus: "error",
        message: JSON.stringify(error),
      });
    }
  }
  


