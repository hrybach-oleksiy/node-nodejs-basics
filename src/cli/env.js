const parseEnv = () => {
  const envVariables = process.env;
  
  const rssVariables = Object.entries(envVariables)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log('custom vaRIABLES', rssVariables);
};

parseEnv();