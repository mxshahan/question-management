import { userCrud } from './model';
// import { generateJwt } from '@util'
let user,
  users;


export const GetUser = async (req, res) => {
  try {
    users = await userCrud.get();
  } catch (error) {
    res.status(422).json(error);
  } finally {
    res.status(200).json(users);
  }
};

export const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    user = await userCrud.single({
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
    user = await userCrud.create(req.body);
  } catch (e) {
    res.status(422).json(e);
  } finally {
    res.status(201).json(user.toAuthJSON());
  }
};

export const CreateAdmin = async (req, res, next) => {
  try {
    user = await userCrud.create(req.body);
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
        qr: { _id: req.user.uid }
      },
      body: req.body
    });
  } catch (e) {
    res.status(422).json(e);
  } finally {
    res.status(201).json(user.toAuthJSON());
  }
};

export const DeleteUser = async (req, res) => {
  try {
    user = await userCrud.delete({
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