const allItems = document.getElementsByTagName('li')
Object.values(allItems).map(item => item.children[0].addEventListener('click', handleDelete))
Object.values(allItems).map(item => item.addEventListener('dragstart', handleDragStart))
Object.values(allItems).map(item => item.addEventListener('dragover', handleDragOver))
// handle enter styling (add class)
Object.values(allItems).map(item => item.addEventListener('dragenter', handleDragEnter))
// handle leave (remove class)
Object.values(allItems).map(item => item.addEventListener('dragleave', handleDragLeave))
Object.values(allItems).map(item => item.addEventListener('drop', handleDrop))

function handleDragEnter(e) {
  e.target.setAttribute('state', 'draggedOver')
}

function handleDragLeave(e) {
  e.target.removeAttribute('state')
}

function handleDelete(e) {
  console.dir(e.target.parentElement.remove())
}

function handleDrop(e) {
  e.preventDefault();
  console.log(e);
  console.log(e.dataTransfer);
  console.log('dest\t', e.target)
  // console.log('orgin\t', e)
}

function handleDragOver(e) {
  // console.log(e.target.style.backgroundColor = '#c1c1cc');
  e.preventDefault();
}

function handleDragStart(e) {
  e
    .dataTransfer
    .setData('text/plain', e.target.id);

    console.log(e);
  e
    .currentTarget
    .style
    .backgroundColor = '#000'
      .color = '#FFF';
}