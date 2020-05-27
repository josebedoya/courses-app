import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface IFormFields {
  email: string;
  password: string;
}

const LoginPage: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState<IFormFields>({
    email: '',
    password: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const { email, password } = formData;

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    console.log(email, password);
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isSubmitDisabled || handleSubmit(e);
    }
  }

  return (
    <div className='login-page'>
      <div className='card card--bg-dark'>
        <div className='card__body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                onKeyPress={e => handleKeyPress(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                onKeyPress={e => handleKeyPress(e)}
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
