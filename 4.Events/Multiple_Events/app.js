// const removeButtons = document.querySelectorAll('li button');
// const form = document.querySelector("#add-friend");
// const input = document.querySelector('#first-name');
// const friendList = document.querySelector('#friend-list');

// for(let btn of removeButtons){
//     btn.addEventListener('click', function(evt){
//         evt.target.parentElement.remove();
//     })
// }


// form.addEventListener('submit', function(evt){
//     evt.preventDefault();
//     const newFriend = document.createElement('li');
//     const removeButton = document.createElement('button');
//     removeButton.innerText = 'UnFriend';
//     removeButton.addEventListener('click', function(evt){
//         evt.target.parentElement.remove();
//     });
//     newFriend.innerText = input.value;
//     newFriend.appendChild(removeButton);
//     input.value = '';
//     friendList.appendChild(newFriend);
// })

const form = document.querySelector("#add-friend");
const input = document.querySelector('#first-name');
const friendList = document.querySelector('#friend-list');

friendList.addEventListener('click', function(evt){
    if(evt.target.tagName === 'BUTTON'){
        evt.target.parentElement.remove();
    }else if (evt.target.tagName === 'LI'){
        evt.target.classList.add('best-friend');
        const heart = document.createElement('span');
        heart.innerHTML = '&hearts;';
        evt.target.prepend(heart);
    }
})

form.addEventListener('submit', function(evt){
    evt.preventDefault();
    const newFriend = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.innerText = 'UnFriend';
   
    newFriend.innerText = input.value;
    newFriend.appendChild(removeButton);
    input.value = '';
    friendList.appendChild(newFriend);
})