import React from 'react';

export default function Header({ children, title }){
  return(
    <header>

      <h1>{title}</h1>
      <h2>{children}</h2>

    </header>
    
  );
}

// export default Header;