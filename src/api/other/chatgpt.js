import { ChatGPTAPI } from 'chatgpt'
import nodeFetch from "node-fetch";
import proxy from "https-proxy-agent";
import dotenv from 'dotenv'

const env = dotenv.config().parsed

export const chatgpt = new ChatGPTAPI({
    apiKey: env.OPENAI_API_KEY,
    debug: false,
    fetch: (url, options = {}) => {
        const defaultOptions = {
            agent: proxy(env.PROXY_URL),
        };

        const mergedOptions = {
            ...defaultOptions,
            ...options,
        };

        return nodeFetch(url, mergedOptions);
    },
});