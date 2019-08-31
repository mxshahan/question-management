import { userCrud } from './model';
// import { generateJwt } from '@util'
let user,
  users;


export const GetUsers = async (req, res) => {
  try {
    users = await userCrud.get();
  } catch (error) {
    res.status(422).json(error);
  } finally {
    res.status(200).json(users);
  }
};

export const CreateUser = async (req, res) => {
  try {
    user = await userCrud.create(req.body);
  } catch (e) {
    res.status(422).json(e);
  } finally {
    res.status(201).json(user);
  }
};

export const CreateAdmin = async (req, res, next) => {
  try {
    users = await userCrud.get();
    if (users.length === 0) {
      user = await userCrud.create(req.body);
    } else {
      return res.status(422).json({
        success: false,
        message: 'Admin cannot be created. Already admin available. If you are authority please clear your database or change password'
      });
    }
  } catch (e) {
    next(e);
  } finally {
    res.status(201).json(user.toAuthJSON());
  }
};

export const CreateAdminBySuper = async (req, res, next) => {
  let superAdmin = req.user.uid;
  try {
    if (superAdmin) {
      user = await userCrud.create(req.body);
    } else {
      return res.status(422).json({
        success: false,
        message: 'Only super admin can create admin account'
      });
    }
  } catch (e) {
    next(e);
  } finally {
    res.status(201).json(user.toAuthJSON());
  }
};

export const UpdateUser = async (req, res) => {
  try {
    user = await userCrud.put({
      params: {
        qr: { _id: req.params.id }
      },
      body: req.body
    });
    return res.status(201).json(user);
  } catch (e) {
    return res.status(422).json({
      message: 'User doesn\'t exists',
      success: false,
      error: e
    });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    user = await userCrud.delete({
      params: {
        qr: { _id: req.params.id }
      }
    });
    return res.status(201).json({
      success: true,
      message: 'User Deleted'
    });
  } catch (e) {
    return res.status(422).json({
      message: 'User doesn\'t exists',
      success: false,
      error: e
    });
  }
};