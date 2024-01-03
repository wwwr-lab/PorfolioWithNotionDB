import { Client } from '@notionhq/client';
// Initializing a client
const notion = new Client({
	auth: process.env.API_KEY,
});
export default notion;

