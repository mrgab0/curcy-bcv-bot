const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const cheerio = require('cheerio');
const request = require('request');





let selectorTiempo;

function eventualizar() {
    selectorTiempo = setTimeout(detonador, 200);
}


function detonador() {
  

        

let tasa =  function() {


    request({method: 'GET', url: 'http://www.bcv.org.ve/', encoding: 'utf-8'}, (err, res, body) => {



        if (err) return console.error(err);
        
        var $ = cheerio.load(body);
    
    
        let valor = $('div[id="dolar"]').find('div > strong').text().replace(/,/g, '.') * 1;
    
        function redondeado(valor) {
            return +(Math.round(valor + "e+2")  + "e-2");
        }
           //console.log('redondeado ' + roundToTwo(valor));
        
            const tasaBcv = (redondeado(valor));

            const wpadmin = 'https://your web site.com'
        
            //var valor = new Object();

            nightmare
            .goto(wpadmin)
            .wait(5000)
            .wait('input[id="user_login"]')
            .wait(5000)
            .type( 'input[id="user_login"]', ['user'])
            .wait(5000)            
            .type( 'input[id="user_pass"]', ['password'])
            .wait(5000)            
            .click('input[id="wp-submit"]')
            .wait(5000)            
            .wait('span[class="display-name"]')
            .wait(5000)
            .goto('https://your web site.com/wp-admin/admin.php?page=woocommerce-multi-currency')
            .wait(5000)            
            .wait('tr[class="wmc-currency-data VEF-currency ui-sortable-handle"] td input[class="wmc-currency-rate"]')
            .wait(1000)
            .click('tr[class="wmc-currency-data VEF-currency ui-sortable-handle"] td input[class="wmc-currency-rate"]')
            .wait(1000)
            .type('tr[class="wmc-currency-data VEF-currency ui-sortable-handle"] td input[class="wmc-currency-rate"]', '')
            .wait(1000)
            .insert('tr[class="wmc-currency-data VEF-currency ui-sortable-handle"] td input[class="wmc-currency-rate"]', [tasaBcv])
            .wait(1000)
            .wait('button[class="vi-ui button labeled icon primary wmc-submit"]')
            .wait(5000)
            .click('button[class="vi-ui button labeled icon primary wmc-submit"]')
            .wait(15000)
            .end()
            .then(console.log)
            .catch(error => {
                console.error('Search failed:', error)
            })
        
            var productosToJson = JSON.stringify(body);
    
             
           console.log(tasaBcv); 
    
            
            
    
    
    });


}


tasa();


}




detonador()
