const select = document.getElementById('selector');
const content = document.querySelector('.content');
const button = document.getElementById('button');

async function getPostNumber(idPost) {
    
        let resPost = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        let post = await resPost.json();
    
        post.forEach(val => {
            let option = document.createElement('option');
            option.value = val.id;
            option.innerText = val.id;
            select.appendChild(option);  
        });
}


function getPostsandUsers(idPost) {
    try {
        button.addEventListener('click', async () => {
            idPost = select.options[select.selectedIndex].value;

            let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`);
            let data = await response.json();

            let resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            let user = await resUser.json();
            
            let usersCard = document.createElement('div');
            usersCard.classList.add('user-info');
            content.appendChild(usersCard);
                   
            usersCard.innerHTML = `
            <div class="posts">
                    <p class="title">${data.title}</p>
                    <p class="post-body">${data.body}</p>
                    </div>
                    <div class='user-card'>
                        <div class='user-card-body'>
                            <p>Author: ${user.name}</p>
                            <p>Email: ${user.email}</p>
                            <p>Company: ${user.company.name}</p>
                        </div>
                    </div>
                `
            });

    } catch (error) {
        console.log(error);
    }
};

getPostNumber();
getPostsandUsers();