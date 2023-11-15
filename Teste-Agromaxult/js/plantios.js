const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})




const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})







const content = document.querySelector(".content");
const btnNew = document.querySelector(".addNote-content");



let items_db = localStorage.getItem("items_db")
  ? JSON.parse(localStorage.getItem("items_db"))
  : [];

const colors = [
  "#58A118",
  "#91D62B",
  "#008E9B",
  "#ABA9FF",
  "#FF8066",
  "#BA3CAF",
];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

function loadItems() {
  content.innerHTML = "";
  verifyNulls();

  items_db.forEach((item, i) => {
    addHTML(item, i);
  });

  addEvents();
}

btnNew.onclick = () => {
  addHTML();

  addEvents();
};

function addHTML(item) {
  const div = document.createElement("div");

  div.innerHTML = `<div class="item" style="background-color: ${
    item?.color || randomColor()
  }">
    <span class="remove">X</span>
    <textarea>${item?.text || ""}</textarea>
  </div>`;

  content.appendChild(div);
}

function addEvents() {
  const notes = document.querySelectorAll(".item textarea");
  const remove = document.querySelectorAll(".item .remove");

  notes.forEach((item, i) => {
    item.oninput = () => {
      items_db[i] = {
        text: item.value,
        color: items_db[i]?.color || item.parentElement.style.backgroundColor,
      };

      localStorage.setItem("items_db", JSON.stringify(items_db));
    };
  });

  remove.forEach((item, i) => {
    item.onclick = () => {
      content.children[i].remove();
      if (items_db[i]) {
        items_db.splice(i, 1);
        localStorage.setItem("items_db", JSON.stringify(items_db));
      }
      addEvents();
    };
  });
}

function verifyNulls() {
  items_db = items_db.filter((item) => item);
  localStorage.setItem("items_db", JSON.stringify(items_db));
}

loadItems();

  
  $(document).ready(function() {
    
    $('#openAddTaskModal').click(function() {
        $('#addTaskModal').modal('show');
        $('.overlay').fadeIn();
    });
    
    $('#addTaskModal').on('hidden.bs.modal', function () {
        $('.overlay').fadeOut();
    });

    $('#addTaskButton').click(function() {
        const description = $('#taskDescription').val();
        const plantName = $('#plantName').val();
        const harvestDate = $('#harvestDate').val();
        const task = `
            <div class="task" data-toggle="modal" data-target="#taskDetailsModal">
                <p><strong>${description}</strong></p>
                <p>Planta: ${plantName}</p>
                <p>Data de Colheita: ${harvestDate}</p>
            </div>
        `;
        $('#column-plantar').append(task);
        $('#addTaskModal').modal('hide');
        $('#taskForm')[0].reset();
    });




    $('#addTaskModal').on('show.bs.modal', function () {
        $('.overlay').fadeIn();
    });
    
    $('#addTaskModal').on('hidden.bs.modal', function () {
        $('.overlay').fadeOut();
    });
    $('#addTaskButton').click(function() {
        const description = $('#taskDescription').val();
        const plantName = $('#plantName').val();
        const harvestDate = $('#harvestDate').val();
        const task = `
            <div class="task" data-toggle="modal" data-target="#taskDetailsModal">
                <p><strong>${description}</strong></p>
                <p>Planta: ${plantName}</p>
                <p>Data de Colheita: ${harvestDate}</p>
            </div>
        `;
        $('#column-plantar').append(task);
        $('#addTaskModal').modal('hide');
        $('#taskDescription').val('');
        $('#plantName').val('');
        $('#harvestDate').val('');
    });
});














