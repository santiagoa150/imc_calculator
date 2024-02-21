const allowedDisplays = {"none": "none", "flex": "flex"}

function setModalDisplay(id, display){
    const modal = document.getElementById(id);
    if (!display in allowedDisplays) throw new Error('Invalid Display.');
    if (modal){
        modal.style.display = display;
    }
}
