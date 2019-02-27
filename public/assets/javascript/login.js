let docReadyPromise = new Promise((resolve, reject)=>{
  $(document).ready(()=>{
    resolve((token)=>{
      $.post("/auth/google", { token: token }, response => {
        if(response === "OK"){
          window.location.href = "/home";
          return false;
        }else{
          console.log(response);
        }
      });
    })

    if(false){
      reject();
    }
  })
});

function onSignIn(googleUser) {
  let token = googleUser.getAuthResponse().id_token;

  // signIn(token);
  docReadyPromise.then(signIn=>{
    signIn(token);
  })
}
