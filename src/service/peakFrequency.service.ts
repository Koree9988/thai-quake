export const findPeaksWithThreshold = (freqSpec: number[], thresh: number) => {
  const peaks: number[] = [];

  for (let i = 1; i < freqSpec.length - 1; i++) {
    const prev = freqSpec[i - 1];
    const current = freqSpec[i];
    const next = freqSpec[i + 1];

    if (current > prev && current > next && current >= thresh) {
      peaks.push(i); // Store the index of the peak
    }
  }

  return peaks;
};

export const paragraphOneConclude = (
  fName: string,
  freq: number,
  samplingEvent: number[]
) => {
  return `From the Fourier spectrum can compare that the magnitude match on frequency = ${freq} and for each 7 year sampling we get the event on ${fName} fault group by following ${samplingEvent.join(
    ', '
  )} events.`;
};

export const paragraphTwoConclude = (avg: number, days: number) => {
  return `So the result of Fourier can estimate the event of earth quake of magnitude morethan the average of ${avg.toFixed(
    4
  )}  will happen in ${days} days (±30 days) from the last event that have higher than average of ${avg.toFixed(
    4
  )}.`;
};

export const calculationPart = (diff: number, freq: number) => {
  return `calculate average of days range (date range / match freq) : ${diff} / ${freq} = ${(
    diff / freq
  ).toFixed(0)} days`;
};
