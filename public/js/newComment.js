const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const description = document.querySelector('#commentForm').value.trim();
  
    if (description) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/singlepost');
      } else {
        alert('Failed to create post');
      }
    }
};

document
    .querySelector('.commentButton')
    .addEventListener('submit', newCommentHandler);