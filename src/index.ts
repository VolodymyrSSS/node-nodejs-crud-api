import http, { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from './routes';

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		if (req.url === '/api/users' && req.method === 'GET') {
			getAllUsers(req, res);
		} else if (req.url?.startsWith('/api/users/') && req.method === 'GET') {
			const userId = req.url.split('/').pop();
			getUserById(req, res, userId);
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Not found' }));
		}
	}
);

const port = 3000;

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
