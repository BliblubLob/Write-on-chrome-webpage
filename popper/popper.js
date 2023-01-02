//________________set up color picker___________________
const colorPicker = document.getElementById('color-picker')
//access saved color
chrome.storage.local.get(["color"]).then((result) => {
    colorPicker.value = result.color
  })
colorPicker.addEventListener("input", 
    async function (e) {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        //save current color for the above access
        chrome.storage.local.set({ color: e.target.value }).then(() => {
            console.log("Value is set to " + e.target.value);
          });

        chrome.tabs.sendMessage(
          tab.id,
          { color: e.target.value },
          function (response) {
            console.log(response.status);
          }
        );
      }
);

//______________________set up width picker___________________________
const widthPicker = document.getElementById('width-picker')
//access saved width value
chrome.storage.local.get(["width"]).then((result) => {
    widthPicker.value = result.width
  })

widthPicker.addEventListener("input", 
    async function (e) {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        widthPicker.value = e.target.value
        //save current width value for above access
        chrome.storage.local.set({ width: e.target.value }).then(() => {
            console.log("Value is set to " + e.target.value);
          });
        chrome.tabs.sendMessage(
          tab.id,
          { width: e.target.value },
          function (response) {
            console.log(response.status);
          }
        );
      }
);


//_____________________Toggling between different displays___________________
const brushColorBtn = document.getElementById('brush-color-btn')
const brushColorDisplay = document.getElementById('brush-color-display')

const brushWidthBtn = document.getElementById('brush-width-btn')
const brushWidthDisplay = document.getElementById('brush-width-display')

const helpBtn = document.getElementById('help-btn')
const helpDisplay = document.getElementById('help-display')

const displayList = [brushColorDisplay, brushWidthDisplay, helpDisplay]
const toggleDisplay = function(display){
    console.log(display)
    displayList.map((elem)=>{
        if (elem.id == display){
            elem.style.display = 'block'
        }else{
            elem.style.display = 'none'
        }
    })
}

brushColorBtn.addEventListener('click',()=>{toggleDisplay('brush-color-display')})
brushWidthBtn.addEventListener('click',()=>{toggleDisplay('brush-width-display')})
helpBtn.addEventListener('click',()=>{toggleDisplay('help-display')})