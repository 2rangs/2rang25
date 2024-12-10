import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { defineEventHandler, getQuery, sendStream } from 'h3';
import fetch from 'node-fetch'; // node-fetch 설치 필요: npm install node-fetch

export default defineEventHandler(async (event) => {
    const { url } = getQuery(event);

    if (!url) {
        throw new Error('URL is required');
    }

    try {
        // 원격 이미지 가져오기
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        // 스트림을 반환하여 클라이언트에 전달
        return sendStream(event, response.body);
    } catch (error) {
        console.error('Proxy Error:', error);
        throw error;
    }
});
