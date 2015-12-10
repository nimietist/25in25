import React from 'react'

export default (props) => (
  <div className='about col-sm-offset-2 col-sm-8'>
    <h2>Our Story</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur hitecto beatae vitae dicta.
    </p>
    <h2>Your Life</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <h2>Submission Guidelines</h2>
    <p>
      1. Lorem ipsum dolor sit amet
      2. Consectetur adipiscing elit, sed do eiusmod tempor 3. Incididunt ut labore et dolore magna aliqua
      4. Ut enim ad minim veniam
      5. Quis nostrud exercitation ullamco laboris
      6. nisi ut aliquip ex ea commodo consequat
      7. Duis aute irure dolor in reprehenderit in voluptate
    </p>
    <h4>
      Now go create something! If you ever have any questions or concerns, please feel free to email us at help@25in25.org.
    </h4>
    {props.children}
  </div>
)
