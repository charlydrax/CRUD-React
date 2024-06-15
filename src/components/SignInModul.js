import React, { useContext, useRef, useState } from 'react'
import { UserContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom'

export default function SignUpModal() {

  const [validation, setValidation] = useState('')
  const inputs = useRef([])

  const addInput = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }
  const {modalState, toggleModals, signIn} = useContext(UserContext)
  const navigate = useNavigate();

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault(inputs)

    try{

      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      )
    //   formRef.current.reset();
      setValidation("");
      navigate("private/private-home")
      //dans le cas où il n'y a pas d'erreur -> redirection
      toggleModals("close")

    }catch {
    }
    setValidation("Oupsi, email or password invalid")
  }
  const closeModals = () => {
    setValidation("")
    toggleModals("close")
  }
   return (
    <>
    {modalState.SignInModal && (
    
      <div className='position-fixed top-0 vw-100 vh-100'>
        <div
        // onClick={closeModals}
        className='w-100 h-100 bg-dark opacity-75'>
            <div className='position-absolute top-50 start-50 translate-middle' style={{minWidth: "400px"}}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Sign up</h5>
                            <button
                            onClick={closeModals}
                            className='btn-close'></button>
                        </div>

                        <div className='modal-body'>
                          <form 
                          onSubmit={handleForm}
                          className='sign-up-form'
                          ref={formRef}
                          >
                            <div className='mb-3'>
                              <label htmlFor='signInpEmail' className='form-label'>Email Adress</label>
                              <input
                              ref={addInput}
                              name="email"
                              required
                              type='email' 
                              className='form-control'
                              id='signInEmail'
                              />
                            </div>

                            <div className='mb-3'>
                              <label htmlFor='signInPwd' className='form-label'>Password</label>
                              <input
                              ref={addInput}
                              name='pwd'
                              required
                              className='form-control'
                              type="password"
                              id='signInPwd'
                              />
                              <p className='text-danger mt-1'>{validation}</p>
                            </div>

                            <button className='btn btn-primary'>Submit</button>
                          </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )}
    </>
    
  )
}
