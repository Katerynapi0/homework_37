'use strict';
/* - Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
   - Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
   - Зробити завдання використовуючи проміси, перехопити помилки. */

function searchPost(){
    //отримення значення введеного користувачем по айді поста
    let postID = document.getElementById('postID').value;
    //перевірка чи введений айді в допустимому діапазоні
    if(postID < 1 || postID > 100){
        alert(`Введіть коректний номер поста від 1 до 100, будь ласка.`)
        return
    }

    //запит для отримання деталей поста
    fetch('https://jsonplaceholder.typicode.com/posts/' + postID)
    .then(response => response.json())//парсимо відповідь в форматі JSON
    .then(data => {
        //отримуємо деталі для відображення поста
        let postDetails = document.getElementById('postDetails');
        //відображення заголовка, тіла поста та кнопки коментарів
        postDetails.innerHTML = `
        <h2>Пост № ${data.id}</h2>
        <h3>${data.title}</h3>
        <p>${data.body}</p>
        <button onclick="fetchComments(${data.id})">Отримати коментарі</button>`;
    })
    .catch(error => {
        console.error('Помилка:', error)//повідомлення при помилці в консоль
    });
}

function fetchComments(postId){
    //запит для отримання коментарів до вказаного поста
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())//парсимо відповідь в форматі JSON
    .then(comments =>{
        //відображення поста та коментарів
        let postDetails = document.getElementById('postDetails');
        let commentsHTML = '<h3>Коментарі:</h3><ul>';
        comments.forEach(comment => {
            //додавання коментарів до HTML рядка
            commentsHTML += `<li><strong>${comment.name}</strong>: ${comment.body}</li>`;
        });
        commentsHTML += '</ul>'
        //додавання HTML рядка з коментарів до блоку postDetails
        postDetails.innerHTML += commentsHTML;
    })
    .catch(error => {
        console.error('Помилка при отриманні коментарів:', error);//повідомлення при помилці в консоль
    });
}