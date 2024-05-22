// TODO: Put a real types here
import { Todo as PrismaTodo } from '@prisma/client';
export type TodoType = {
	data: string;
};

export type Todo = PrismaTodo;
