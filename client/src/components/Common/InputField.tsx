import React, { ChangeEvent } from 'react';

interface Props {
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onKeyPress?(e: any): void;
}

const InputField = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onKeyPress,
}: Props) => {
  return (
    <div className='form-field-wrapper'>
      <input
        type={type || 'text'}
        placeholder={placeholder && placeholder}
        name={name}
        value={value}
        onChange={e => onChange(e)}
        onKeyPress={onKeyPress && onKeyPress}
      />
    </div>
  );
};

export default InputField;
