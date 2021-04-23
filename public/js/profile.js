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
  console.log("i was clicked", event);
    event.preventDefault();
      const id = event.target.getAttribute('post-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
    if (response.ok) {
        // console.log("button works")
        document.location.replace('/profile');
    } else {
        alert('Failed to delete project');
    }
};

const editButtonHandler = async (event) => {
  event.preventDefault();
}
document.querySelector('.newpost-form').addEventListener('submit', newFormHandler);

// var delButton = document.querySelector('#btn-delete') 
// addEventListener('click', delButtonHandler);