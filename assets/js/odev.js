
fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    const commentsContainer = document.querySelector('#comments');
    commentsContainer.innerHTML = data.comments
      .map(comment => `
        <div>
          <div class="comment">
           <div class= "comment-user-header">
            <div class="comment-user">
              <img src="${comment.user.image.png}"  />
              <span>${comment.user.username}</span>
              <p>${comment.createdAt}</p>
            </div >
            <button class="replyBtn"><i class="fa-solid fa-reply"></i>Reply</button>
           </div>
            <p class="comment-text">${comment.content}</p>
          </div>
          <div class="replies">
           ${listReplies(comment.replies)}
          </div>
        </div>
      `)
      .join('');

    const replyBtns = document.querySelectorAll('.replyBtn');
    for (const btn of replyBtns) {
      btn.addEventListener('click', handleReply);
    }

    // Delete butonlarına event listener ekleme
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    for (const btn of deleteBtns) {
      btn.addEventListener('click', handleDelete);
    }
  });

function handleReply() {
  const replie = document.querySelector('.replie');
  
  replie.innerHTML = `
    <div class="add-comment">
      <img src="images/avatars/image-juliusomo.png" alt="">
      <textarea id="new-comment" placeholder="Add a comment..."></textarea>
      <button id="send">SEND</button>
    </div>
  `;
}

function listReplies(cevaplar) {
  return `
    <div>
      ${cevaplar.map(c => `
        <div class="replie">
          <div class="replies-user">
            <img src="${c.user.image.png}" />
            <span>${c.user.username}</span>
            <p>${c.createdAt}</p>
          </div>
          <p><span class="replyingTo">@${c.replyingTo}</span> ${c.content}</p>
        </div>
      `).join('')}
    </div>
  `;
}

document.querySelector('#send').addEventListener('click', () => {
  const newCommentText = document.querySelector('#new-comment').value;
  if (newCommentText.trim()) {
    const commentsContainer = document.querySelector('#comments');
    commentsContainer.innerHTML += `
      <div>
        <div class="comment">
          <div class="comment-user-header">
            <div class="comment-user">
              <img src="./images/avatars/image-juliusomo.png" />
              <h5 class="you">you</h5>         
              <span>juliusomo</span>
            </div>
            <div class="delete-edit"> 
              <button class="deleteBtn"><i class="fa-solid fa-trash"></i>Delete</button>
              <span class="editBtn"><i class="fa-solid fa-pen"></i>Edit</span>
            </div>
          </div>
          <p>${newCommentText}</p>
          <p>Just now</p>
        </div>
      </div>
    `;
    document.querySelector('#new-comment').value = ''; 


    const deleteBtns = document.querySelectorAll('.deleteBtn');
    for (const btn of deleteBtns) {
      btn.addEventListener('click',handleDelete)
    }
  }
});

function handleDelete(event) {
  const btn = event.target
  const commentElement = btn.parentElement.parentElement.parentElement
  const deleteDialogContainer = document.querySelector('.deleteDialogContainer');

  if (deleteDialogContainer) {
    const deleteDialog = document.querySelector('.deleteDialog');
    
    deleteDialog.innerHTML = `
      <div class="deleteContainer">
        <h3>Delete comment</h3>
        <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
        <div class="dialogButtons">
          <button id="cancelBtn">NO, CANCEL</button>
          <button id="confirmDeleteBtn">YES, DELETE</button>
        </div>
      </div>
    `;
    

    deleteDialogContainer.showModal();

    document.querySelector('#cancelBtn').addEventListener('click', () => {
      deleteDialogContainer.close(); 
    });
  
    document.querySelector('#confirmDeleteBtn').addEventListener('click', () => {
      commentElement.remove(); 
      deleteDialogContainer.close(); 
    });
  }
}
