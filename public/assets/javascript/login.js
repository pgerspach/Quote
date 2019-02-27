let docReadyPromise = new Promise((resolve, reject)=>{
  $(document).ready(()=>{
    resolve((token)=>{
      $.post("/auth/google", { token: token }, response => {
        if(response === "OK"){
          console.log("hete");
          window.location.href = "/home";
          return false;
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