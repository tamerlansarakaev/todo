import React from 'react';

// Styles
import './Form.less';

/**
 * @param title - Form header
 * @type {{ title: string }}
 */

function Form({ title, children }) {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <h1 className="form-title">{title}</h1>
      {children}
    </form>
  );
}

export default Form;
