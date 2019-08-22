import { questionModel } from './model';
import { generate } from 'shortid';
// import csv from 'fast-csv';
import fs from 'fs';
const csv = require('csv-parser');
let question,
  questions = [];


export const CreateQuestion = async (req, res, next) => {
  var data = {
    question: req.body.question,
    category: req.body.category.toLowerCase(),
    type: req.body.type.toLowerCase(),
    owner: req.body.owner,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4
  };

  try {
    question = await questionModel.create(data);
  } catch (error) {
    next(error);
  } finally {
    res.status(201).json(question);
  }
};
export const getQuestion = async (req, res, next) => {
  let query = {
    ...req.query
  };
  if (req.query.type === '') delete query.type;
  try {
    question = await questionModel.find(query);
  } catch (e) {
    next(e);
  } finally {
    res.status(201).json(question);
  }
};

export const getOneQuestion = async (req, res, next) => {
  const id = req.params.id;
  try {
    question = await questionModel.findOne({ _id: id });
    res.status(202).json(question);
  } catch (e) {
    next(e);
  }
};

export const updateQuestion = async (req, res, next) => {
  const id = req.params.id;
  try {
    question = await questionModel.findOne({ _id: id });
    if (question) {
      var data = {
        question: req.body.question,
        category: req.body.category.toLowerCase(),
        type: req.body.type.toLowerCase(),
        owner: req.body.owner,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option
      };
      Object.assign(question, data);
      let newQuestion = await question.save();

      res.status(201).json(newQuestion);

    }
  } catch (error) {
    next(error);
  }
};


export const updateStatus = async (req, res, next) => {
  const id = req.params.id;
  try {
    question = await questionModel.findOne({ _id: id });
    if (question) {
      var data = {
        status: req.body.status
      };
      Object.assign(question, data);
      let newQuestion = await question.save();

      res.status(201).json(newQuestion);

    }
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req, res, next) => {
  const id = req.params.id;
  try {
    question = await questionModel.findOne({ _id: id });
    if (question) {
      let newQuestion = await question.delete({ _id: id });
      res.status(201).json(newQuestion);
    } else {
      res.status(421).json({
        message: 'Question not found.'
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};


export const deleteMultiple = async (req, res, next) => {
  try {
    if (Array.isArray(req.body)) {
      for (let entry of req.body)
        question = await questionModel.deleteOne({ _id: entry._id });
    }
    res.status(202).json({
      message: 'deleted'
    });
  } catch (error) {
    next(error);
  }
};



export const readCSV = async (req, res, next) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let csvFile = req.files.csv; //file send from frontend

  const ext = (csvFile.name).split('.');
  const newFilename = `${Date.now()}-${generate()}.${ext[1]}`;
  let uploadPath = `./${newFilename}`;

  if (ext[1] !== 'csv') {
    return res.status(422).json({
      message: 'File format is not ok. Only CSV file supported',
      status: false
    });
  }

  // Use the mv() method to place the file somewhere on your server
  await csvFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
  });



  try {
    await new Promise((resolve) => {
      fs.createReadStream(uploadPath)
        .pipe(csv())
        .on('data', (row) => {

          questions.push({
            question: unescape(escape(row.Question).toString('utf8').replace(/%uFFFD/g, '%22')),
            category: unescape(row.Category).toString('utf8').toLowerCase().normalize(),
            type: unescape(row.Type).toString('utf8').toLowerCase().normalize(),
            option1: unescape(row.Option1).toString('utf8').normalize(),
            option2: unescape(row.Option2).toString('utf8').normalize(),
            option3: unescape(row.Option3).toString('utf8').normalize(),
            option4: unescape(row.Option4).toString('utf8').normalize(),
            owner: unescape(row.Owner).toString('utf8').normalize(),
          });
          resolve(questions);
        })
        .on('end', async () => {
          await fs.unlinkSync(uploadPath);
          console.log('CSV File successfully processed');
        });
    });
    console.log('please wait...');
    let count = 0;
    // await questionModel.insertMany(questions);
    for (let entry of questions) {
      let isExist = await questionModel.findOne({ question: entry.question });
      if (isExist) {
        count += 1;
      } else {
        await questionModel.create(Object.assign(entry));
      }
    }

    console.log('CSV Record Added');
    return res.json({
      message: 'CSV File Successfully Added',
      record: {
        totalRecord: questions.length,
        duplicate: count,
        newlyAdded: questions.length - count
      }
    });
  } catch (e) {
    next(e);
  }
};
