$(document).ready(function() {
    const itemsList = $('#itemsList');
    const addForm = $('#addForm');
    const updateFormContainer = $('#updateFormContainer');
    const updateForm = $('#updateForm');
    let updateIndex = -1;

    // Load items from local storage
    function loadItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        itemsList.empty();
        items.forEach((item, index) => {
            itemsList.append(`<li data-index="${index}">${item} <button class="edit">Edit</button><button class="delete">Delete</button></li>`);
        });
    }

    // Save items to local storage
    function saveItems(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    // Add new item
    addForm.submit(function(event) {
        event.preventDefault();
        const newItem = $('#newItem').val();
        if (newItem) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.push(newItem);
            saveItems(items);
            loadItems();
            addForm[0].reset();
        }
    });

    // Edit item
    itemsList.on('click', '.edit', function() {
        updateIndex = $(this).parent().data('index');
        const items = JSON.parse(localStorage.getItem('items'));
        $('#updateItem').val(items[updateIndex]);
        updateFormContainer.show();
    });

    // Update item
    updateForm.submit(function(event) {
        event.preventDefault();
        const updatedItem = $('#updateItem').val();
        if (updatedItem && updateIndex > -1) {
            const items = JSON.parse(localStorage.getItem('items'));
            items[updateIndex] = updatedItem;
            saveItems(items);
            loadItems();
            updateFormContainer.hide();
            updateForm[0].reset();
        }
    });

    // Delete item
    itemsList.on('click', '.delete', function() {
        const index = $(this).parent().data('index');
        const items = JSON.parse(localStorage.getItem('items'));
        items.splice(index, 1);
        saveItems(items);
        loadItems();
    });

    // Load initial items
    loadItems();
});
