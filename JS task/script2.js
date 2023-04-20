let users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', age: '25' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: '30' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: '40' }
  ];
  
  const renderUsers = () => {
    const tableBody = document.getElementById('user-table');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="edit-user-btn" data-id="${user.id}">Edit</button>
          <button class="delete-user-btn" data-id="${user.id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };
  
  const sortUsers = (sortBy, sortOrder) => {
    if (sortOrder === 'asc') {
      users.sort((a, b) => {
        return a[sortBy].localeCompare(b[sortBy])
      });
    } else {
      users.sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
    }
    renderUsers();
  };
  
  const addUser = () => {
    const id = users.length + 1;
    const name = prompt('Enter name:') || '';
    const email = prompt('Enter email:') || '';
    const age = prompt('Enter age:')  || '';
    users.push({ id:`${id}`, name, email, age });
    renderUsers();
  };
  
/*   const editUser = (id) => {
    const user = users.find(user => user.id === id);
    const name = prompt('Enter name:', user.name);
    const email = prompt('Enter email:', user.email);
    const age = prompt('Enter age:', user.age);
    user.name = name;
    user.email = email;
    user.age = age;
    renderUsers();
  };
  
  const deleteUser = (id) => {
    users = users.filter(user => user.id !== id);
    renderUsers();
  }; */

  const editUser = (id) => {
    const user = users.find(user => user.id === String(id));
    if (user) {
      const name = prompt('Enter name:', user.name);
      const email = prompt('Enter email:', user.email);
      const age = prompt('Enter age:', user.age);
      user.name = name;
      user.email = email;
      user.age = age;
      renderUsers();
    } else {
      console.log('User not found');
    }
  };
  
  const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === String(id));
    if (index !== -1) {
      users.splice(index, 1);
      renderUsers();
    } else {
      console.log('User not found');
    }
  };
  
  const init = () => {
    renderUsers();
    
    const addUserBtn = document.getElementById('add-user-btn');
    addUserBtn.addEventListener('click', addUser);
    
    const tableHead = document.querySelector('thead');
    tableHead.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'TH') {
          const sortBy = target.dataset.sortBy;
          const sortOrder = target.dataset.sortOrder === 'asc' ? 'desc' : 'asc';
          target.dataset.sortOrder = sortOrder;
          sortUsers(sortBy, sortOrder);
        }
      });
      
      const tableBody = document.getElementById('user-table');
      tableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('edit-user-btn')) {
          const id = parseInt(target.dataset.id);
          editUser(id);
        } else if (target.classList.contains('delete-user-btn')) {
          const id = parseInt(target.dataset.id);
          deleteUser(id);
        }
      });
    };
    
    init();
  