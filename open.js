document.querySelectorAll('.toggle-icon').forEach(function(icon) {
    icon.addEventListener('click', function() {
      var content = this.parentElement.nextElementSibling;
      content.classList.toggle('expanded');
    });
  });
 
  
  document.addEventListener('mousemove', (event) => {
    const cursorFollower = document.querySelector('.cursor-follower');
    const xOffset = (event.clientX - cursorFollower.offsetWidth / 2) + 'px';
    const yOffset = (event.clientY - cursorFollower.offsetHeight / 2) + 'px';
    cursorFollower.style.transform = `translate(${xOffset}, ${yOffset})`;
  });
  