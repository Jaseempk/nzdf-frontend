import { useState } from "react";

export function useVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isHuman, setIsHuman] = useState<boolean | null>(null);

  const verify = async (address: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch(
        `https://api.talentprotocol.com/api/v2/passports/${address}`,
        {
          method: "GET",
          headers: {
            "x-api-key":
              "aa96ca991e7766834efe5e4caee803866a1c67dad2d11016b11d56f77a1a",
          },
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const data = await response?.json();
      const identityScore = data?.passport?.identity_score || 0;

      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsHuman(identityScore > 9);
      return identityScore > 9;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    verify,
    isVerifying,
    isHuman,
    setIsHuman,
  };
}
