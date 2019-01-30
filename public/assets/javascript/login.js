let docReadyPromise = new Promise((resolve, reject)=>{
  $(document).ready(()=>{
    resolve((token)=>{
      $.post("/auth/google", { token: token }, response => {
        if(response === "OK"){
          window.location.href = "/home";
        }
      });
    })
  })
});

function onSignIn(googleUser) {
  let token = googleUser.getAuthResponse().id_token;

  // signIn(token);
  docReadyPromise.then(signIn=>{
    signIn(token);
  })
}