fetch("http://localhost:8080/api/menu")
    .then(function (data) {
        return data.json();
    }).then(function (menus) {
    const addedIds = new Set();
    const menuContainer = document.getElementById("menu");
    const menuTree = createMenu(menus,addedIds);
    if (menuTree) {
        menuContainer.appendChild(menuTree);
    }
    console.log(menuTree);
    console.log(addedIds);
} )

function createMenu(menuItems,addedIds) {
    const ul = document.createElement('ul');
    menuItems.forEach(menu => {
        if (!addedIds.has(menu.id_menu)) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = menu.url;
            a.textContent = menu.name;
            li.appendChild(a);
            addedIds.add(menu.id_menu);
            if (menu.children && menu.children.length > 0) {
                const childrenUl = createMenu(menu.children, addedIds);
                li.appendChild(childrenUl);
            }
            ul.appendChild(li);
        }
    });
    return ul;
}


