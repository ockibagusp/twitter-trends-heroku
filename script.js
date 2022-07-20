function copydanpaste(event) {
    event.preventDefault();
    
    trends = '';

    // regex101.com
    const regex = new RegExp(/(Sedang tren dalam topik Indonesia|Trending in Indonesia|Populer|Trending)\n?\n(.*)\n?\n([\d.,]+.*)?/gm);
    
    const str = document.getElementById('copy').value;
    
    let m;

    while ((m = regex.exec(str)) !== null) {
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

    // 'Oknum, Motor, ' ke 'Oknum, Motor'
    if (trends != '') {
        trends = trends.substr(0, trends.length-2);
    } else {
        trends = 'Tidak ada hasil'
    }

    const textareaHasil = document.getElementById('hasil');
    textareaHasil.innerHTML = trends;
}

function btnReset(event) {
    const textareaCopy = document.getElementById('copy');
    textareaCopy.value = null;

    const textareaHasil = document.getElementById('hasil');
    textareaHasil.value = null;
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
    const form = document.getElementById('copy');
    form.addEventListener('change', copydanpaste);

    // const reset = document.getElementById('reset');
    // reset.addEventListener('click', btnReset);
})();
