let Commands = [{'commands': []},{'handleEvent': []}];
function showResult(title, message, icon) {
  const iconn = icon ? icon.toLowerCase() : "";
  if (iconn === "error"){
   //playShortAudio("error.mp3");
  }
  Swal.fire({
    title: title,
    html: message,
    icon: iconn,
  //  showCancelButton: true,
    confirmButtonColor: "#0061ff",
  // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

let sound = null;
function playMusic(url, isalang, isLoop){
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
   sound = new Howl({
      src: [url],
      loop: isLoop,
      format: ['mp3'],
      volume: 1,
      onend: () => {}
    });
  if (isalang){
    sound.play();
  }
}

function playShortAudio(url){
  const s = new Howl({
    src: [url],
    loop: false,
    volume: 1,
    autoplay: true
  });
  s.play();
}
function rainbow(div,text){
  let math = Math.floor(Math.random() * 99999999);
  let k = 0;
  let pogi = new Array();
  let neth = new Array("#FF0000", "#FF4000", "#FF8000", "#FFC000", "#FFFF00", "#C0FF00", "#80FF00", "#40FF00", "#00FF00", "#00FF40", "#00FF80", "#00FFC0", "#00FFFF", "#00C0FF", "#0080FF", "#0040FF", "#0000FF", "#4000FF", "#8000FF", "#C000FF", "#FF00FF", "#FF00C0", "#FF0080", "#FF0040");
  const startColor = () => {
    for (var b = 0; b < pogi.length; b++) {
      document.getElementById(text+math+b).style.color = neth[b]
    }
    for (var c = 0; c < neth.length; c++) {
      neth[c - 1] = neth[c]
    }
    neth[neth.length - 1] = neth[-1];
    setTimeout(() => startColor(), 50);
  }
  while (neth.length<text.length){neth=neth.concat(neth);}
  while (k<=text.length){pogi[k]=text.charAt(k);k++;}
  for(var d=0;d<pogi.length;d++){div.innerHTML += `<span id='${text+math+d}' class='${text+math+d}'>${pogi[d]}</span>`}
  startColor();
}
const result = document.getElementById('result');
const footertxt = document.getElementById('pogiako');
footertxt.innerHTML = "© 2024 Project Botify — by Kenneth Aceberos";
document.getElementById("test1").innerHTML = `Create your own bot!<br>(100% FREE and <font color="red">NOT FOR SALE</font>)`;
let file = "NethBgmusic";
let getm = localStorage.getItem(file);
let s = false;
function switchie1(b) {
  let pogika = document.getElementById("pogika");
  playMusic(`music.mp3`, b, true);
  pogika.innerHTML = (b ? "🎧 " : "") + "Project Botify";
}
const pogika = document.getElementById("pogika");
pogika.addEventListener('click', () => {
    s=!s;
    let succ=s?"1":"0";
    switchie1(s);
    localStorage.setItem(file, succ);
    return;
});
s=getm==="1"?true:false;
switchie1(s);


const jsonInput = document.getElementById('json-data');
const prefix = document.getElementById('json-data1');
const adminUid = document.getElementById('json-data2');
const botName = document.getElementById('json-data3');
const button = document.getElementById('submitButton');
    
async function State0(){
  [jsonInput, prefix, adminUid, botName]
  .forEach(name => {
    name.value = localStorage.getItem(name.id);
    name.addEventListener("input", () => {
      localStorage.setItem(name.id, name.value);
    });
  });
  button.onclick = State;
}
async function State() {
  if (!Commands[0].commands.length) {
    return showResult('', 'Please provide at least one valid command for execution.', 'error');
  }
  if (prefix.value.length < 4) {
    return showResult('', 'Bot name must be 4 characters minimum.', 'error');
  }
  if (adminUid.value.length == 0) {
    return showResult('', 'Admin User ID is needed.', 'error');
  }
  if (adminUid.value.length < 1) {
    return showResult('', 'Valid Admin User ID is needed.', 'error');
  }
  try {
    button.innerHTML = 'Please wait...';
    button.className = 'bgn-isa';
    button.disabled = true;
    const State = JSON.parse(jsonInput.value);
    if (State && typeof State === 'object') {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: State,
          commands: Commands,
          prefix: prefix.value == "" ? "/" : prefix.value,
          admin: adminUid.value,
          botname: botName.value
        }),
      });
      const data = await response.json();
      if (data.success) {
        jsonInput.value = '';
        showResult('Success', data.message, 'success');
      } else {
        jsonInput.value = '';
        showResult('Something went wrong', data.message, 'question');
      }
    } else {
      jsonInput.value = '';
      showResult('Invalid JSON.', 'Please check your input.', 'error');
    }
  } catch (parseError) {
    jsonInput.value = '';
    showResult('Error parsing JSON.', 'Please check your input.', 'error');
  } finally {
    setTimeout(() => {
    button.innerHTML = 'Submit';
    button.className = 'button1';
    button.disabled = false;
    },1*1000);
  }
}


const [
  listOfCommands,
  listOfCommandsEvent,
  remind,
  remind1,
  remind2,
  select1,
  select2,
  select3,
  cmd,
  events,
  ] = [
    document.getElementById('listOfCommands'),
    document.getElementById('listOfCommandsEvent'),
    [`Tap a command to enable✅/disable❌`, `✅ Selected all`],
    document.getElementById('listacmd1'),
    document.getElementById('listaevent1'),
    document.getElementById('select1'),
    document.getElementById('select2'),
    document.getElementById('select3'),
    document.querySelector('.form-check-input.commands'),
    document.querySelector('.form-check-input.handleEvent')
  ];
async function commandList() {
  /*setTimeout(() => {
  showResult("", "<b>Hello! 👋</b><br>PROJECT BOTIFY is <font color=red><b>strictly not for sale.</b></font><br>Please report via PM to the developer or the page Project Botify, You can use my site freely but don't abuse it.<br><b>Please support me. It will be really appreciated 🤍</b><br><br><a href=\"https://www.facebook.com/profile.php?id=61559180483340\">❤️ Like &amp; follow Project Botify</a><br><a href=\"https://www.facebook.com/kennethaceberos\">🗨️ Contact the developer</a>", "");
  }, 500);*/
  try {

    const response = await fetch('/commands');
    const {
      commands,
      handleEvent,
      aliases
    } = await response.json();
    document.getElementById('listacmd').innerHTML = `Commands: ${commands.length}`;
    document.getElementById('listaevent').innerHTML = `Events: ${handleEvent.length}`;
    const allCmd = [commands, handleEvent];
    allCmd.forEach((command, i) => {
      command.forEach((command, index) => {
        const container = createCommand(i === 0 ? listOfCommands : listOfCommandsEvent, index + 1, command, i === 0 ? 'commands' : 'handleEvent', aliases[index] || []);
        i === 0 ? listOfCommands.appendChild(container) : listOfCommandsEvent.appendChild(container);
      });
    });
    const isNoCommand = allCmd.length !== 0;
    const neth1 = isNoCommand ? "No commands were added." : remind[0];
    const neth2 = isNoCommand ? "none" : "block";
    remind1.innerHTML = neth1;
    remind2.innerHTML = neth1;
    select1.style.display = neth2,
    select2.style.display = neth2;
    select3.style.display = neth2;
  } catch (error) {
    console.log(error);
    remind1.innerHTML = error.toString();
    remind2.innerHTML = error.toString();
  }
  
}

function createCommand(element, order, command, type, aliases) {
  const container = document.createElement('div');
  const checkbox = document.createElement('input');
  container.classList.add('form-check', `form-check-${type}`);
  container.onclick = toggleCheckbox;
  checkbox.classList.add('form-check-input', type === 'handleEvent' ? 'handleEvent' : 'commands');
  checkbox.type = 'checkbox';
  checkbox.role = 'switch';
  checkbox.id = `flexSwitchCheck_${order}`;
  checkbox.style.opacity = 0;
  checkbox.style.width = "0px";
  const label = document.createElement('label');
  label.classList.add('form-check-label', type === 'handleEvent' ? 'handleEvent' : 'commands');
  label.for = `flexSwitchCheck_${order}`;
  label.innerHTML = `❌ ${order}. <b>${command}</b>`;
  container.appendChild(checkbox);
  container.appendChild(label);
  /*
  if (aliases.length > 0 && type !== 'handleEvent') {
    const aliasText = document.createElement('span');
    aliasText.classList.add('aliases');
    aliasText.textContent = ` (${aliases.join(', ')})`;
    label.appendChild(aliasText);
  }
  */
  return container;
}

function toggleCheckbox() {
  const box = [{
    input: '.form-check-input.commands',
    label: '.form-check-label.commands',
    array: Commands[0].commands
  }, {
    input: '.form-check-input.handleEvent',
    label: '.form-check-label.handleEvent',
    array: Commands[1].handleEvent
  }];
  box.forEach(({
    input,
    label,
    array
  }) => {
    const checkbox = this.querySelector(input);
    const labelText = this.querySelector(label);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];

        array.push(command.toLowerCase());
      } else {
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        const removeCommand = array.indexOf(command.toLowerCase());
        if (removeCommand !== -1) {
          array.splice(removeCommand, 1);
        }
      }
    }
  });
}

function selectAllCommands() {
  const box = [{
    main: ".form-check-commands",
    input: '.form-check-input.commands',
    array: Commands[0].commands
  }];
  box.forEach(({
    main,
    input,
    array
  }) => {
    const checkboxes = document.querySelectorAll(input);
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      if (allChecked) {
        checkbox.checked = false;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        const removeCommand = array.indexOf(command);
        if (removeCommand !== -1) {
          array.splice(removeCommand, 1);
        }
        document.querySelector(main).style.display = "block";
        remind1.innerHTML = remind[0];
      } else {
        checkbox.checked = true;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        if (!array.includes(command)) {
          array.push(command);
        }
        document.querySelector(main).style.display = "none";
        remind1.innerHTML = remind[1];
      }
    });
  });
}

function selectAllEvents() {
  const box = [{
    main: ".form-check-handleEvent",
    input: '.form-check-input.handleEvent',
    array: Commands[1].handleEvent
  }];
  box.forEach(({
    main,
    input,
    array
  }) => {
    const checkboxes = document.querySelectorAll(input);
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      if (allChecked) {
        checkbox.checked = false;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const event = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        
        const removeEvent = array.indexOf(event);
        if (removeEvent !== -1) {
          array.splice(removeEvent, 1);
        }
        document.querySelector(main).style.display = "block";
        remind2.innerHTML = remind[0];
      } else {
        checkbox.checked = true;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅", "").replace("❌", "");
        const event = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        if (!array.includes(event)) {
          array.push(event);
        }
        document.querySelector(main).style.display = "none";
        remind2.innerHTML = remind[1];
      }
    });
  });
}

function selectAll(){
  selectAllCommands();
  selectAllEvents();
}

async function copy(text) {
 await navigator.clipboard.writeText(text);
}
commandList();
State0();
/* testing 
listOfCommands.appendChild(createCommand(listOfCommands, (1).toString(), "Test", "commands", []));
listOfCommandsEvent.appendChild(createCommand(listOfCommandsEvent, (1).toString(), "Test", "handleEvent", []));
*/