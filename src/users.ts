import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';

// Sample data
const users = [
	{ id: '1', name: 'John Doe' },
	{ id: '2', name: 'Jane Smith' },
	{ id: '3', name: 'Bob Johnson' },
];

// GET api/users
export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(users));
};

// GET api/users/{userId}
export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
	const url = new URL(req.url!, `http://${req.headers.host}`);
	const userId = url.pathname.split('/').pop() as string; // Type assertion here

	if (!isValidUUID(userId)) {
		res.statusCode = 400;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'Invalid userId' }));
		return;
	}

	const user = users.find((u) => u.id === userId);

	if (!user) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'User not found' }));
		return;
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(user));
};

// Custom UUID validation function
const isValidUUID = (uuid: string): boolean => {
	const regex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return regex.test(uuid);
};
