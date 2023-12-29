import { Client } from '@notionhq/client';
// Initializing a client
const notion = new Client({
	auth: process.env.NEXT_PUBLIC_API_KEY,
});
export default notion;

