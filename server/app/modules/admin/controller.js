import { adminCrud, adminModel } from './model';
// import { generateJwt } from '@util'
let user,
  users;


export const GetUser = async (req, res) => {
  try {
    users = await adminCrud.get();
  } catch (error) {
    res.status(422).json(error);
  } finally {
    res.status(200).json(users);
  }
};

export const hasUsers = async (req, res) => {
  try {
    users = await adminCrud.get();
  } catch (error) {
    res.status(422).json(error);
  } finally {
    res.status(200).json({
      count: users.length
    });
  }
};

export const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    user = await adminCrud.single({
      qr: {
        $or: [{
          'email': username
        }, {
          'username': username
        }]
      }
    });
  } catch (error) {
    res.status(422).json(error);
  } finally {
    if (user && user.isMatchedPassword(password)) {
      res.status(200).json(user.toAuthJSON());
    } else {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
  }
};

export const CreateUser = async (req, res) => {
  try {
    user = await adminCrud.create(req.body);
  } catch (e) {
    res.status(422).json(e);
  } finally {
    res.status(201).json(user.toAuthJSON());
  }
};

export const CreateAdmin = async (req, res, next) => {
  try {
    users = await adminCrud.get();
    if (users.length === 0) {
      user = await adminCrud.create(req.body);
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
      user = await adminCrud.create(req.body);
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
  const userData = JSON.parse(req.body.user);
  if (req.filename) {
    await Object.assign(userData, { profileimage: req.filename });
  }
  try {
    user = await adminModel.findOne({ _id: req.user.uid });
    Object.assign(user, userData);
    await user.save();

    res.json(user.toAuthJSON());
  } catch (e) {
    res.status(422).json(e);
  }
};


export const ChangePassword = async (req, res) => {
  const userData = req.body;
  console.log(req.body);
  try {
    user = await adminModel.findOne({ _id: req.user.uid });
    if (user.isMatchedPassword(userData.current)) {
      user.password = req.body.new;
      await user.save();
      return res.status(200).json({
        success: true,
        message: 'Password successfully changed'
      });
    } else {
      return res.status(203).json({
        success: true,
        message: 'Old password and new password mismatch'
      });
    }
  } catch (e) {
    res.status(422).json(e);
  }
};


export const DeleteUser = async (req, res) => {
  try {
    user = await adminCrud.delete({
      params: {
        qr: { _id: req.user.uid }
      }
    });
  } catch (e) {
    res.status(422).json(e);
  } finally {
    res.status(201).json({
      success: true,
      message: 'User Deleted'
    });
  }
};