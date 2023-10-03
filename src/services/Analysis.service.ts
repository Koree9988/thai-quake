const { spawn } = require('child_process');

export const AnalysisService = (data: any): any => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['script.py']);

    // Write the input data as JSON to the Python script's standard input
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      // Accumulate the data returned by the Python script
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      // Handle errors returned by the Python script
      reject(data.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script exited with code ${code}`));
      }

      // Resolve the promise with the result returned by the Python script
      resolve(JSON.parse(result));
    });
  });
};
