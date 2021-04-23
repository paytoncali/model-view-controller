const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('.commentInput').value;
    const id = event.target.getAttribute('post-id');

    if (comment) {
      const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({ comment, id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert('Failed to create post');
      }
    }
};