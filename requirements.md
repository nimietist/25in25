TODOS:
react router initial data loading
passport login and authentication

--- front end routing

/app
  /account
    /login(modal)
      -oauth
    /signup(modal)
      -oauth
    /forgot(modal)
      -done
    /reset
      -done
      -validation
  /dashboard(logged in)
  /art
    /show(modal)
      /edit
    /edit(modal)
    /create(upload-form)
      -block move
      -validation
    /delete(modal)
  /account
    /deactivate
      -validation
  /user(permissions!!!)
  /browse
  /about
common
  /share(modal)
  hotkeys (esc modal, )
  /piece
    -ellipses(hover(edit/share/delete))

---schema
  user
    username
    password
    email
      -verification
    notifications
    image
      -create sizes
    deleted
  art
    user_id
    image
      -create sizes
    title
    description
    collection number (dynamic on created_at)
    enum type
    *image*
      -fullscreen
    *music*
      authorize user account(s)
      -soundcloud_url
    *words*
      -text(md, style?)
    *video*
      authorize user account(s)
      -vimeo_url
  comments
    art_id
    user_id
    deleted
  followers
    user_id
    following_id

  email
  session
