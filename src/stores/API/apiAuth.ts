import axios from 'axios'

export const connectApiAuth = async ( IS_AUTH: any, BODY: any, EXTRA: any, CLEAN: any, RESPONSE: any ) => {
  const URI = `${import.meta.env.VITE_API_URL}${BODY.param}`
  const HEADER = !IS_AUTH ? {} : { usuario_autorizacion: `${localStorage.getItem('TOKEN_AUTH')}` }

  await axios({
    method: BODY.method,
    url: URI,
    data: BODY.data_form,
    headers: HEADER
  })
    .then((res: any) => {
      console.log(BODY)

      if (BODY.method === 'GET') {
        RESPONSE.DAPI_RESPONSE.value.isLoading = false
        RESPONSE.DAPI_RESPONSE.value.response = {
          status: res.status,
          msg: res.data.msg,
          data: res.data.data
        }
      }

      if (BODY.method === 'POST') {
        if (BODY.param === 'auth/login') {
          EXTRA.$toast.success(res.data.msg + ' Redireccionando', {
            position: 'top-right'
          })
          localStorage.setItem('TOKEN_AUTH', res.data.data.token_auth)
          setTimeout(() => {
            window.location.replace('/dashboard')
          }, 2000)
        }
        if (BODY.param === 'auth/register') {
          EXTRA.$toast.success(res.data.msg + ' verifica tu correo. Redireccionando', {
            position: 'top-right'
          })
          setTimeout(() => {
            window.location.replace('/')
          }, 5000)
        }
        if (BODY.param === 'auth/recovery') {
          EXTRA.$toast.success(res.data.msg + ' verifica tu correo. Redireccionando', {
            position: 'top-right'
          })
        }
        if (BODY.param.includes('auth/reset-password')) {
          EXTRA.$toast.success(res.data.msg + '. Redireccionando...', {
            position: 'top-right',
            duration: 5000
          })
          setTimeout(() => {
            window.location.replace('/')
          }, 5000)
        }
        CLEAN.form_data.value = {
          email: '',
          password: '',
          confirm_password: '',
          name: '',
          lastname: '',
          birth: ''
        }
      }
    })
    .catch((error) => {
      RESPONSE.DAPI_RESPONSE.value.isLoading = false

      if (error.response.data.errors?.length > 0) {
        EXTRA.$toast.error('* ' + error.response.data.errors.join(' * '), {
          position: 'top-right'
        })
      } else {
        if (BODY.param.includes('auth/confirm-account/')) {
          RESPONSE.DAPI_RESPONSE.value.response = {
            msg: error.response.data.msg,
            status: error.response.status
          }
        } else {
          EXTRA.$toast.error(error.response.data.msg, {
            position: 'top-right'
          })
        }
      }
    })
}
