Style Guide
- description on modal
- Banner event state / words
- standard padding/margin (20px)
- color palette
- font active/hover link states
- logo
- standard transition styles
- upload page blurb
- footer info ()

bugs
- modal transition shows last image
- infinite scroller loads multiple times
- min height / default images
- hover state

TODOS:

- static bio in account
- show user's works only on upload page

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
