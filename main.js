let harcok = [
    {
        harc_nev: 'Rákóczi szabadságharc',
        harcolo1: 'Kuruc',
        hadero1: '70.000',
        harcolo2: 'Labanc',
        hadero2: '60.000'
    },
    {
        harc_nev: '48-as szabadságharc',
        harcolo1: 'Osztrák császárság (+ Orosz birodalom)',
        hadero1: '170.000 (+ 200.000)',
        harcolo2: 'Magyar királyság',
        hadero2: '170.000'
    },
    {
        harc_nev: 'I. világháború',
        harcolo1: 'Antant',
        hadero1: '43 millió',
        harcolo2: 'Központi hatalmak',
        hadero2: '25 millió'
    },
    {
        harc_nev: 'Bosworthi csata',
        harcolo1: 'Angolok (York + Lancester)',
        hadero1: '15.000',
    }
]

const table = createHTMLElement('table', 'htable', document.body);
createHTMLElementWithParentId('colgroup', 'hcolg', 'htable');
createHTMLElementWithParentId('col', 'hcol1', 'hcolg');
createHTMLElementWithParentId('col', 'hcol2', 'hcolg');
createHTMLElementWithParentId('col', 'hcol3', 'hcolg');
document.getElementById('hcol1').classList.add('colored-column');
document.getElementById('hcol3').classList.add('colored-column');

createHTMLElementWithParentId('thead', 'hthead', 'htable');
createHTMLElementWithParentId('tr', 'htr', 'hthead');
renderTableHeaders();

createHTMLElementWithParentId('tbody', 'htbody', 'htable')

renderTable(harcok);

generateForm();

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    const tbody = document.getElementById('htbody');
    e.preventDefault();
    const harc_nev = document.getElementById('harc_nev');
    const harcolo1 = document.getElementById('harcolo1');
    const hadero1 = document.getElementById('hadero1');
    const harcolo2 = document.getElementById('harcolo2');
    const hadero2 = document.getElementById('hadero2');

    const harc_nevvalue = harc_nev.value;
    const harcolo1value = harcolo1.value;
    const hadero1value = hadero1.value;
    let harcolo2value = harcolo2.value;
    let hadero2value = hadero2.value;

    if(harcolo2value === '' && hadero2value === ''){
        harcolo2value = undefined;
        hadero2value = undefined;
    }

    if (validateFields(harc_nev, harcolo1, hadero1, harcolo2, hadero2)){
        const newHarcok = {
            harc_nev: harc_nevvalue,
            harcolo1: harcolo1value,
            hadero1: hadero1value,
            harcolo2: harcolo2value,
            hadero2: hadero2value,
        };

        harcok.push(newHarcok);
        clearErrors();
        form.reset();
        renderTable(harcok);
    }
})