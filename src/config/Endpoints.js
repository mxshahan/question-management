const url = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:3005/'
const baseURL = url;

export const config = {
  baseURL,
  endpoint: {
    login: 'api/user/login',
    create_question: 'api/question/create-question',
    get_question: 'api/question/get-question',
    question: 'api/question',
    update_status: 'api/question/update-status',
    upload_file: 'api/question/upload-file'
  },
}
