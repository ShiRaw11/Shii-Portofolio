document.addEventListener('DOMContentLoaded', () => {
    let posts = [];
    let currentIndex = 0;
    const postContainer = document.getElementById('post-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const filterButton = document.getElementById('filter-button');
    const filterContainer = document.getElementById('filter-container');
    const navigation = document.getElementById('navigation');

    const fetchPosts = async () => {
        try {
            const response = await fetch('posts.json');
            posts = await response.json();
            displayPost(currentIndex);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const displayPost = (index) => {
        const post = posts[index];
        let contentHtml = '';

        if (Array.isArray(post.content)) {
            contentHtml = post.content.map(section => `
                <div class="content-section">
                    <h4 class="section-title">${section.heading}</h4>
                    <p class="section-body">${section.body}</p>
                </div>
            `).join('');
        } else {
            contentHtml = `<p>${post.content}</p>`;
        }

        postContainer.innerHTML = `
            <div class="post">
                <h3 class="post-title">${post.title}</h3>
                
                <div class="post-content">${contentHtml}</div>
            </div>
        `;
        prevButton.style.display = index > 0 ? 'inline-block' : 'none';
        nextButton.style.display = index < posts.length - 1 ? 'inline-block' : 'none';
        postContainer.style.display = 'block';
        navigation.style.display = 'flex';
    };

    const displayFilterOptions = () => {
        filterContainer.innerHTML = posts.map((post, index) => `
            <div class="filter-item" data-index="${index}">
                <span class="filter-title">${post.title}</span>
                <span class="filter-date">${post.date}</span>
            </div>
        `).join('');
        filterContainer.style.display = 'block';
        postContainer.style.display = 'none';
        navigation.style.display = 'none';
    };

    filterContainer.addEventListener('click', (event) => {
        const item = event.target.closest('.filter-item');
        if (item) {
            currentIndex = parseInt(item.getAttribute('data-index'));
            displayPost(currentIndex);
            filterContainer.style.display = 'none';
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayPost(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < posts.length - 1) {
            currentIndex++;
            displayPost(currentIndex);
        }
    });

    filterButton.addEventListener('click', displayFilterOptions);


    fetchPosts();
});
