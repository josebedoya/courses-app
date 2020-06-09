import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showNotification } from './../../utils/notifications';
import { loginRequest } from './loginSlice';
import { RootState } from './../../app/rootReducer';
import InputField from '../../components/Common/InputField';

interface IFormFields {
  email: string;
  password: string;
}

const LoginPage: React.FC = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IFormFields>({
    email: '',
    password: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const { email, password } = formData;

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    const response: any = await dispatch(loginRequest({ email, password }));
    if (loginRequest.fulfilled.match(response)) {
      showNotification('success', `Welcome ${response.payload.firstName}`);
    } else {
      showNotification('error', 'Login error', response.payload.message);
    }
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className='login-page'>
      <div className='card card--bg-dark'>
        <div className='card__body'>
          <form onSubmit={handleSubmit}>
            <div className="form-fields-wrapper">
              <InputField
                name='email'
                value={email}
                placeholder='Enter an email'
                onChange={onChange}
              />
            </div>
            <div className="form-fields-wrapper">
              <InputField
                type='password'
                name='password'
                value={password}
                placeholder='Enter a Password'
                onChange={onChange}
              />
            </div>
            <input type='submit' value='Sign In' disabled={isSubmitDisabled} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
