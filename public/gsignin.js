/*Google Sign in API*/
function onSignIn(googleUser) {
  	
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  

  $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){    
                     $(location).attr('href', '/member' ); // Redirect to member  page
                },
                error: function(errMsg) {					   
	                    swal({
	                        title: 'Oops...',
	                        text: 'You must Register your Google Account with GameHUB first',
	                        type: "warning",
	      					        showCancelButton: true
                          //REDIRECT BROKEN
	      					}, function() {
						 		          console.log("Test");
                          window.location.href = 'users/register/'; 
						    });
                    }
            });
}