import { Router } from 'express'
import { userController } from './user.contoller'
// import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { USER_MODULE } from './user.contants'

const userRouter = Router()

// userRouter.post('/create-user', validateRequest(UserValidation.userValidationSchema), userController.createUser)
userRouter.post('/create-user',userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', auth(), userController.getUser) 

export default userRouter