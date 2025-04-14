import { Router } from 'express'
import { userController } from './user.contoller'
import auth from '../../middlewares/auth'

const userRouter = Router()
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser) 

export default userRouter