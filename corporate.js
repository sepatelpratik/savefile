import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import axios from "axios";

async function getCorporateAction() {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: `https://www.nseindia.com/api/marketStatus`,
    "X-Requested-With": "XMLHttpRequest",
  };
  try {
    console.log(`Fetching Corporate Action data...`);
    await client.get("https://www.nseindia.com/", { headers });
    const response = await client.get(
      `https://www.nseindia.com/api/NextApi/apiClient/indexTrackerApi?functionName=getCorporateAction&&flag=CAC&&index=NIFTY%2050`,
      { headers }
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to fetch corporate action data: ${error.response?.status || error.message}`
    );
  }
}

async function getIndexFacts() {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: `https://www.nseindia.com/api/marketStatus`,
    "X-Requested-With": "XMLHttpRequest",
  };
  try {
    console.log(`Fetching Most Active Stocks data...`);
    await client.get("https://www.nseindia.com/", { headers });
    const response = await client.get(
      `https://www.nseindia.com/api/NextApi/apiClient/indexTrackerApi?functionName=getAdvanceDecline&&index=NIFTY%2050`,
      { headers }
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to fetch most active stocks data: ${error.response?.status || error.message}`
    );
  }
}

export { getCorporateAction, getIndexFacts }; 