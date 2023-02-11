import OneGraphAuth from "onegraph-auth";
export const APP_ID = "e8f0d2ae-157a-493e-a91f-e5b733ea1c02";
export const CLIENT_URL = `https://graph.netlify.com/graphql?app_id=${APP_ID}`;
export const auth = new OneGraphAuth({ appId: APP_ID });
