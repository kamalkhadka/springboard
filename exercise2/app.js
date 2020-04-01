// 1. select the section with an id of container without using querySelector
document.getElementById('container');

// 2. select the section with an id of container using querySelector
document.querySelector('container');

// 3. select all list items with a class of "second"
document.querySelectorAll('.second');

// 4. select a list item with a class of third, but only the list item inside of the ol tag
document.querySelector('ol .third');

// 5. Give the section with an id of container the text “Hello!”
const section = document.querySelector('#container');
section.innerText = 'Hello!';

// 6. Add the class main to the div with a class of footer
document.querySelector('.footer').classList.add('main');

// 7. Remove the calss main on the div with a class of footer
document.querySelector('.footer').classList.remove('main');

// 8. Create a new li element
const li = document.createElement('li');

// 9. give the li the text 'four'
li.textContent = 'four';

// 10. append the li to the ul element
document.querySelector('ul').append(li);

// 11. Loop over all of the lis inside the ol tag and give them background color of green;
const lists = document.querySelector('ol').children;
for (let iterator of lists) {
    iterator.style.backgroundColor = 'green';
}

// 12. Remove the div with a class of footer
document.querySelector('.footer').remove();