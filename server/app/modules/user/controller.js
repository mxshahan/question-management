import { userCrud, userModel } from './model';
// import { generateJwt } from '@util'
let user,
  users;


export const GetUsers = async (req, res) => {
  const { query } = req;
  try {
    users = await userModel.find(query);
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

export const DeleteMultipe = async (req, res) => {
  // console.log(req.body)
  try {
    if (Array.isArray(req.body)) {
      for (let entry of req.body) {
        await userModel.deleteOne({ _id: entry });
      }
    }
    // await userModel.remove({ _id: { $in: [req.body] } });
    res.status(201).json({
      message: 'Selected items deleted',
      success: true,
    });
  } catch (e) {
    res.status(422).json(e);
  }
};

export const UploadProfileImage = async (req, res) => {
  // let userBody = JSON.parse(req.body.user);
  try {
    user = await userModel.findOne({ _id: req.params.id });
    if (user) {
      if (Array.isArray(user.images)) {
        user.images.push(req.filename);
      } else {
        user.images = [req.filename];
      }
      await user.save();
      return res.status(201).json({
        success: true,
        message: 'Image uploaded successfully',
        user
      });
    } else {
      return res.status(201).json({
        success: false,
        message: 'User doesn\'t exists'
      });
    }

  } catch (e) {
    return res.status(422).json({
      success: false,
      error: e
    });
  }
};