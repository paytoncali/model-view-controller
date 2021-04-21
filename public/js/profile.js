const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title-input').value.trim();
    const description = document.querySelector('#post-input').value.trim();
  
    if (title && description) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
};

const delButtonHandler = async (event) => {
    event.preventDefault();
      const id = event.target.getAttribute('post-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to delete project');
    }
};

document
.querySelector('.newpost-form')
.addEventListener('submit', newFormHandler);

document
.querySelector('.btn-delete')
.addEventListener('submit', delButtonHandler);