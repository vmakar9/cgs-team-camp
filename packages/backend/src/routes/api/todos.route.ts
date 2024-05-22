import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { todoMiddleware } from '../../middleware/todo.middleware';
import { isExist } from '../../middleware/isExist.middleware';
import { EModels } from '../../enum/models.enum';
import { tryCatch } from '../../middleware/trycatch.middleware';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	tryCatch(todoController.getAllTodo.bind(todoController)),
);

todosRouter.post(
	'/create',
	todoMiddleware.isValidCreate,
	tryCatch(todoController.createTodo.bind(todoController)),
);

todosRouter.get(
	'/todo/:id',
	isExist(EModels.TODOS),
	tryCatch(todoController.getById.bind(todoController)),
);

todosRouter.put(
	'/update/:id',
	isExist(EModels.TODOS),
	todoMiddleware.isValidUpdate,
	tryCatch(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/delete/:id',
	isExist(EModels.TODOS),
	tryCatch(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
