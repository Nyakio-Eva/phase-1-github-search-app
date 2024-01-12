document.addEventListener('DOMContentLoaded',function(){


  //const apiURL = 'https://api.github.com/search/users?q=octocat';//user search endpoint
  const userList = document.getElementById('user-list')
  const form = document.getElementById('github-form');
  form.addEventListener('submit',async (e) => {
     e.preventDefault(); //prevents form from causing refresh
      const nameInput = document.getElementById('search').value.trim();
      console.log('userinput:', nameInput);
      
      //performFetch(userURL); //takes the specific user url as an argument 
      //displayInfo(nameInput)
     if(nameInput){
         const userURL = `https://api.github.com/users/${nameInput}`;
         try{
             const response = await fetch(userURL, {
                headers: {
                    'Accept':'application/vnd.github.v3+json'
                }
             });

             if(!response.ok){
                  throw new Error('network response not ok'); 
                }
             const data = await response.json(); //handle data to json
             console.log('data fetched successfully:', data);
             displayInfo(data.items);
              //handles display of user information based on data fetched
            } catch (error) {
                  console.error('Error fetching data:', error);
                }
        }
    });
    
    function displayInfo(data){
        console.log('displaying user details')
        // Display user details
        const users = data.items || []; //initialize users.items array as per api
        userList.innerHTML = '';   //Clear existing user list before adding new items
    
        users.forEach(user => {
            console.log('processing user:',user.login);
            const li = document.createElement('li'); //list item for details of a single user
            const username = document.createElement('h4'); //displays username
            const avatar = document.createElement('img'); //displays profile picture
            const profile = document.createElement('a'); //link to user's profile
          
            //set content and attributes of created elements based on user data from api
            username.textContent = user.login;
            avatar.src = user.avatar_url;
            profile.href = user.html_url;
            profile.target = '_blank'; //open's link in a new tab or window
            profile.textContent = `Visit ${user.login}'s profile`;
    
            //append to list item element
            li.appendChild(username);
            li.appendChild(avatar);
            li.appendChild(profile);
            userList.appendChild(li); //append list element to the ul
           
        });
        console.log("user details displayed successfully!")
        
    }
    


});




  
