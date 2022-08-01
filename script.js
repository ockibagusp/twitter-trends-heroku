/**
 * form id=copydanpaste
 * @param {*} event 
 */
function copydanpaste(event) {
    event.preventDefault();
    
    trends = '';

    // regex101.com
    const regex = new RegExp(/(Sedang tren dalam topik Indonesia|Trending in Indonesia|Populer|Trending)\n?\n(.*)\n?\n([\d.,]+.*)?/gm);
    
    const str = document.getElementById('copydanpaste');
    
    let m;

    while ((m = regex.exec(str.value)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 2) {
                trends += `${match}, `;
            }
        });
    }

    const textareaHasil = document.getElementById('hasil');
    const btnCopy = document.getElementById('copy');
    // 'Oknum, Motor, ' ke 'Oknum, Motor'
    if (trends != '') {
        trends = 'Tags: ' + trends.substr(0, trends.length-2);
        textareaHasil.disabled = false;
        btnCopy.disabled = false;
    } if (str.value != '' && trends == '') {
        trends = 'Tidak ada hasil'
        textareaHasil.disabled = true;
        btnCopy.disabled = true;
    }

    textareaHasil.innerHTML = trends;
}

/**
 * button id=reset
 * @param {*} event 
 */
function btnReset(event) {
    event.preventDefault();

    const textareaCopy = document.getElementById('copydanpaste');
    textareaCopy.select();
    textareaCopy.value = null;

    const textareaHasil = document.getElementById('hasil');
    textareaHasil.disabled = true;
    textareaHasil.innerHTML = null;
    
    const btnCopy = document.getElementById('copy');
    btnCopy.disabled = true;
}

/**
 * button id=copy
 * @param - 
 */
function btnCopy() {
    const textareaHasil = document.getElementById('hasil');
    
    if (textareaHasil.value == '' || textareaHasil.value == 'Tidak ada hasil') {
        return;
    }
    
    textareaHasil.select();
    // Untuk perangkat seluler
    textareaHasil.setSelectionRange(0, 99999);
  
    navigator.clipboard.writeText(textareaHasil.value);
}

function getdaytrends(event) {
    event.preventDefault();
    
    trends = '';

    // regex101.com
    const regex = new RegExp(`<a href="[^"]+">(.*)<\/a>`);

    const str = `<tr>
    <th scope="row" class="pos">17</th>
    <td class="main">
      <a class="string" href="/indonesia/trend/All%20England/">All England</a>
      <div class="desc">
        <span class="small text-muted">Under 10K tweets</span>
      </div>
    </td>
    <td class="graph">
      <svg viewBox="0 -2 140 54" class="preview">
        <title>All England: trending position over last 8 hours</title>
        <rect class="bkgnd" width="140" height="50" />
        <g class="grid-h">
          <polyline class="grid-h" points="0,0 140,0" />
          <polyline class="grid-h" points="0,10 140,10" />
          <polyline class="grid-h" points="0,20 140,20" />
          <polyline class="grid-h" points="0,30 140,30" />
          <polyline class="grid-h" points="0,40 140,40" />
          <polyline class="grid-h" points="0,50 140,50" />
        </g>
        <polyline points=""/><polyline points="80,50 100,11 120,13 140,17 "/>
      </svg>
    </td>`;
    let m;

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            // console.log(`Found match, group ${groupIndex}: ${match}`);
            if (groupIndex === 2) {
                trends += `${match} . `;
            }
        });
    }

    const textareaHasil = document.getElementById('hasil');
    textareaHasil.innerHTML = trends;
}

(function main() {
    // ?
})();
