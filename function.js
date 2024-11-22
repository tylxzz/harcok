function createTableCell(tagName, innerHTML, parent) {
    const cell = document.createElement(tagName);
    cell.innerHTML = innerHTML;
    parent.appendChild(cell);

    return cell;
}

function createHTMLElement(tag, id, parent) {
    const elem = document.createElement(tag);
    elem.id = id;
    parent.appendChild(elem);
}

function createHTMLElementWithParentId(tag, id, parentid) {
    const parent = document.getElementById(parentid);
    if(parent != undefined){
        createHTMLElement(tag, id, parent);
    }
}

function renderTableHeaders() {
    const tr = document.getElementById('htr');
    const thvalues = [
        {innerHTML: 'Harc megnevezése'},
        {innerHTML: 'Szembenálló felek'},
        {innerHTML: 'Haderő'},
    ];

    for(const value of thvalues) {
        createTableCell('th', value.innerHTML, tr);
    }
}

function renderTable(harcok) {
    const tbody = document.getElementById('htbody')
    tbody.innerHTML = '';
    for(const harc of harcok){
        const row = document.createElement('tr');
        tbody.appendChild(row);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        
        td1.innerHTML = harc.harc_nev;
        td2.innerHTML = harc.harcolo1;
        td3.innerHTML = harc.hadero1;
        
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);

        if(harc.harcolo2 && harc.hadero2){
            td1.rowSpan = 2;
            const row1 = document.createElement('tr');
            tbody.appendChild(row1);

            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            td4.innerHTML = harc.harcolo2;
            td5.innerHTML = harc.hadero2;

            row1.appendChild(td4)
            row1.appendChild(td5)
        }
    }
}

function generateForm() {
    const form = document.createElement('form');
    form.id = 'form';
    document.body.appendChild(form);

    const formValues = [
        { id: 'harc_nev', label: 'Harc megnevezése:' },
        { id: 'harcolo1', label: '1. Harcoló fél:' },
        { id: 'hadero1', label: '1. Haderő:' },
        { id: 'harcolo2', label: '2. Harcoló fél:' },
        { id: 'hadero2', label: '2. Haderő:' }
    ];

    for (const field of formValues) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.htmlFor = field.id;
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.name = field.id;

        const error = document.createElement('div');
        error.className = 'error';

        const br = document.createElement('br');
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        const br3 = document.createElement('br');

        div.appendChild(br);
        div.appendChild(label);
        div.appendChild(br1);
        div.appendChild(input);
        div.appendChild(br2);
        div.appendChild(error);
        div.appendChild(br3);
        form.appendChild(div);
    }

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Hozzáadás';
    form.appendChild(button);
}


function validateFields(harc_nev, harcolo1, hadero1, harcolo2, hadero2) {
    let valid = true;
    const errorMessages = form.querySelectorAll('.error');
    for(const error in errorMessages){
        error.innerHTML = "";
    }

    valid = validateElement(harc_nev, 'Kötelező megadni a harc nevét!') && valid;
    valid = validateElement(harcolo1, 'Kötelező megadni a harcoló fél nevét!') && valid;
    valid = validateElement(hadero1, 'Kötelező megadni a haderő létszámát!') && valid;

    if(harcolo2.value === "" && hadero2.value != ""){
        valid = false;
        const asd = harcolo2.parentElement;
        const error = asd.querySelector('.error');
        error.innerHTML = 'Adj meg a második haderőhoz egy második évszámot is!'
    }

    if(hadero2.value === "" && harcolo2.value != ""){
        valid = false;
        const asd = hadero2.parentElement;
        const error = asd.querySelector('.error');
        error.innerHTML = 'Adj meg a második évszámot egy második haderőt is!'
    }

    return valid;
}

function validateElement(element, errorMessages) {
    const error = element.parentElement.querySelector('.error');
    if(element.value === ''){
        error.innerHTML = errorMessages;
        return false;
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

function clearErrors(){
    const hibak = form.querySelectorAll(`.error`);
    for(const hiba of hibak)
        hiba.innerHTML = ``;
}