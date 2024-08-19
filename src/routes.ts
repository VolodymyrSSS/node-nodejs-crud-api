import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';

interface User {
	id: string;
	name: string;
	email: string;
}

const users: User[] = [
	{ id: uuidv4(), name: 'John Doe', email: 'john@example.com' },
	{ id: uuidv4(), name: 'Jane Smith', email: 'jane@example.com' },
	// Add more user records as needed
];

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(users));
};

export const getUserById = (
	req: IncomingMessage,
	res: ServerResponse,
	userId: string | undefined
) => {
	if (!userId || !validateUuid(userId)) {
		res.writeHead(400, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Invalid userId' }));
		return;
	}

	const user = users.find((u) => u.id === userId);
	if (!user) {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'User not found' }));
		return;
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(user));
};
