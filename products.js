document.addEventListener('DOMContentLoaded', function() {

    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const productsContainer = document.getElementById('products-container');
    const productCards = document.querySelectorAll('.product-card');
    

    categoryFilter.addEventListener('change', filterProducts);
    

    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });
    

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        

        productCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.description').textContent.toLowerCase();
            

            const matchesCategory = selectedCategory === 'all' || categories.includes(selectedCategory);
            const matchesSearch = searchTerm === '' || 
                                 productName.includes(searchTerm) || 
                                 productDesc.includes(searchTerm);
            
 
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        

        checkNoResults();
    }
    

    function checkNoResults() {
        let visibleProducts = 0;
        productCards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleProducts++;
            }
        });
        

        let noResultsMsg = document.getElementById('no-results-message');
        if (visibleProducts === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No products match your search criteria.';
                productsContainer.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    

    function initFromUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            categoryFilter.value = category;
            filterProducts();
        }
    }
    

    initFromUrlParams();
});