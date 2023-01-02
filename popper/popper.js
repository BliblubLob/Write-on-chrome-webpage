const colorPicker = document.getElementById('color-picker')
colorPicker.addEventListener("input", 
    async function (e) {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
      
        chrome.tabs.sendMessage(
          tab.id,
          { color: e.target.value },
          function (response) {
            console.log(response.status);
          }
        );
      }
);

const widthPicker = document.getElementById('width-picker')
chrome.storage.local.get(["width"]).then((result) => {
    widthPicker.value = result.width
  })

widthPicker.addEventListener("input", 
    async function (e) {
        let queryOptions = { active: true, currentWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        widthPicker.value = e.target.value
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