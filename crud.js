document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const itemList = document.getElementById('item-list');
    const items = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemInput = document.getElementById('item');
        const itemValue = itemInput.value.trim();
        if (itemValue !== '') {
            const newItem = {
                id: Date.now(),
                value: itemValue
            };
            items.push(newItem);
            updateList();
            itemInput.value = '';
        }
    });

    itemList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const id = parseInt(event.target.dataset.id);
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items.splice(index, 1);
                updateList();
            }
        }
    });

    function updateList() {
        itemList.innerHTML = '';
        items.forEach(item => {
            itemList.innerHTML += `
                <tr>
                    <td class="border border-slate-600 rounded-md">${item.id}</td>
                    <td class="border border-slate-600 rounded-md">${item.value}</td>
                    <td class="border border-slate-600 rounded-md"><button class="delete bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" data-id="${item.id}">Delete</button></td>
                </tr>
            `;
        });
    }
});