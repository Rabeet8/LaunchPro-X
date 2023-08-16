import { useMemo } from 'react';
import { create } from "ipfs-http-client";
import { useApplicationContext } from '../context/applicationContext';

// returns null on errors
export const useIPFS = () => {

  const {
    domainSettings: {
      ipfsInfuraProjectId,
      ipfsInfuraProjectSecret,
    }
  } = useApplicationContext();
  console.log(ipfsInfuraProjectId);
  console.log(ipfsInfuraProjectSecret);

  const projectId = ipfsInfuraProjectId || process.env.REACT_APP_INFURA_IPFS_KEY;
  const projectSecret = ipfsInfuraProjectSecret || process.env.REACT_APP_INFURA_IPFS_SECRET;

  return useMemo(() => {
    if (!projectId || !projectSecret) return null;

    try {
      const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');

      return create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization: auth,
        },
      });
      // return create("https://ipfs.infura.io:5001/api/v0");
    } catch (error) {
      console.error('Failed to get IFPS', error)
      return null
    }
  }, [projectId, projectSecret])
}