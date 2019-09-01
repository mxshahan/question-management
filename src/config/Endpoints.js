const url = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_API_ENDPOINT : 'http://localhost:3005/'
const baseURL = url;

export const config = {
  baseURL,
  endpoint: {
    login: 'api/admin/login',
    create_admin: 'api/admin/create-admin',
    create_question: 'api/question/create-question',
    get_question: 'api/question/get-question',
    question: 'api/question',
    update_status: 'api/question/update-status',
    upload_file: 'api/question/upload-file',
    has_user: 'api/admin/has-users',
    get_users: 'api/user',
    delete_multiple: 'api/user/delete-multiple'
  },
}
