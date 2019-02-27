let docReadyPromise = new Promise((resolve, reject)=>{
  $(document).ready(()=>{
    resolve((token)=>{
      $.post("/auth/google", { token: token }, response => {
        console.log(response);
        if(response === "OK"){
          window.location.href = "/home";
          return false;
        }else{
          console.log(response);
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