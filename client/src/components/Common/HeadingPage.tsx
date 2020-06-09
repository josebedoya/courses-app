import React from 'react'

interface Props {
  title: string;
}

const HeadingPage = ({ title }: Props) => {
  return (
    <div className="heading-page">
      <h2>{title}</h2>
    </div>
  )
}

export default HeadingPage;
