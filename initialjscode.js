<script>
    const taskModal = document.getElementById('taskModal');
    const usernameTextbox = document.getElementById('usernameTextbox');
    const editDescriptionTextbox = document.getElementById('editDescriptionTextbox');
    const postDisplayMainDiv = document.getElementById('postDisplayMainDiv');
    const postSubmitButton = document.getElementById('postSubmitButton');
    let users = [];
    let photos = [];
    let activeEditIndex=null;
    getPost();
    async function getPost() {
        if (users.length === 0 && photos.length === 0) {
            const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
            const photosRes = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10');

            users = await usersRes.json();
            photos = await photosRes.json();
        }
        postDisplayMainDiv.innerHTML = '';
        console.log(users);
        console.log(photos);

        for (let index = 0; index < users.length; index++) {
            postDisplayFunction(users[index], index, photos[index]);
        }
    }

    function editPostFunction(description, username, index) {
        activeEditIndex=index;
        usernameTextbox.value = username;
        editDescriptionTextbox.value = description;
        postSubmitButton.onclick = () => {
            photos[activeEditIndex].title = editDescriptionTextbox.value;
            closeModalFunction();
            getPost();
        }
    }

    function deletePostFunction(index) {
        users.splice(index, 1);
        photos.splice(index, 1);
        getPost();
    }

    function closeModalFunction() {
        taskModal.classList.add('hidden');
        taskModal.classList.remove('flex');
    }

    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) closeModalFunction();
    });

    editDescriptionTextbox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            photos[activeEditIndex].title = editDescriptionTextbox.value;
            closeModalFunction();
            getPost();
        }
    });

    function postDisplayFunction(user, index, post) {
        const postMainDiv = document.createElement('div');
        let picIndex = users.length - index;
        console.log(picIndex);
        postMainDiv.className = "flex flex-col w-full h-full lg:w-full md:w-3/4 justify-center items-center rounded-3xl bg-purple-300";
        postMainDiv.className += " transition hover:-translate-y-1 hover:shadow-xl bg-purple-300 shadow-xl";

        const userDetailDiv = document.createElement('div');
        userDetailDiv.className = "flex flex-col w-full p-6 sm:p-8 md:p-6 2xl:w-4/6 lg:w-5/6 md:w-4/5";
        // userDetailDiv.className = "flex flex-col w-full p-10 sm:p-20 md:p-5 2xl:w-4/6 lg:w-5/6 md:w-3/4 ";

        const userDetailSubDiv = document.createElement('div');
        userDetailSubDiv.className = "flex flex-row items-center";

        const profilePic = document.createElement('img');
        profilePic.className = "h-8 w-8 m-2 rounded-full"
        profilePic.setAttribute('src', `https://picsum.photos/150?random=${picIndex}`);

        const userNameText = document.createElement('p');
        userNameText.innerHTML = user.username;
        userNameText.className = "font-serif text-lg font-bold max-w-[240px] truncate";
        // userNameText.className = "font-serif text-2xl mr-2 font-bold break-all";

        userDetailSubDiv.appendChild(profilePic);
        userDetailSubDiv.appendChild(userNameText);

        const postImage = document.createElement('img');
        postImage.setAttribute('src', `https://i.pravatar.cc/600?img=${picIndex}`);
        postImage.className = "w-full aspect-square max-w-sm rounded-xl object-cover";
        // postImage.className = "max-h w-96 rounded-xl";

        const postDescriptionDiv = document.createElement('div');
        const postEditingDiv = document.createElement('div');
        postEditingDiv.className = "flex justify-end gap-4 text-purple-500 opacity-70 hover:opacity-100"
        const editPostButton = document.createElement('button');
        editPostButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        editPostButton.onclick = () => {
            editPostFunction(post.title, user.username, index);
            taskModal.classList.replace('hidden', 'flex');
        };
        editPostButton.className = "hover:text-purple-700 transition";

        const deletePostButton = document.createElement('button');
        deletePostButton.innerHTML = `<i class="fa-solid fa-trash-alt"></i>`;
        deletePostButton.onclick = () => {
            deletePostFunction(index);
        };
        deletePostButton.className = "hover:text-red-500 transition";
        postEditingDiv.appendChild(editPostButton);
        postEditingDiv.appendChild(deletePostButton);

        const postDescriptionSubDiv = document.createElement('span');
        postDescriptionDiv.className = "w-full max-w-full";
        postDescriptionSubDiv.innerHTML = `<p class="text-xl break-words whitespace-normal max-w-full leading-relaxed"><span class="font-serif text-2xl mr-2 font-bold break-all">${user.username}</span>${post.title}</p>`;

        postDescriptionDiv.appendChild(postDescriptionSubDiv);
        postDescriptionDiv.appendChild(postEditingDiv);

        userDetailDiv.appendChild(userDetailSubDiv);
        userDetailDiv.appendChild(postImage);
        userDetailDiv.appendChild(postDescriptionDiv);

        postMainDiv.appendChild(userDetailDiv);

        postDisplayMainDiv.appendChild(postMainDiv);

    }
</script>