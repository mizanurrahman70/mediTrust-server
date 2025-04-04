import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import catchAsync from '../../utilits/catchAsync'
import sendResponse from '../../utilits/sendResponse'
import { userService } from './user.service'


const createUser = catchAsync(

  async (req, res) => {
    const payload = req.body

    const result = await userService.createUser(payload)

    // res.json({
    //   status: true,
    //   message: 'User created successfully',
    //   data: result,
    // })

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'User created successfully',
      data: result,
    }

    )
  })

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId

  const result = await userService.getSingleUser(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User getting successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;

  // If a new password is provided, hash it before updating
  if (body.password) {
    const hashedPassword = await bcrypt.hash(body.password, 12); // 12 salt rounds
    body.password = hashedPassword; // Replace the plain password with the hashed one
  }

  const result = await userService.updateUser(userId, body );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  await userService.deleteUser(userId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'user deleted successfully',
    data: {},
  })
})

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}