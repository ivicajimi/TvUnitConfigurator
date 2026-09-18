/**
 * Misc Functions
 *
 * @uses bcDebug
 *
 * @author BradaCreatives
 */
const bcMisc = (function(){

    /**
     * Format and build Price HTML
     * @param {decimal} price
     * @returns {string}
     */
    const price_format = function(price){
        price = price*1 || 0;
        let priceHtml = '';

        let currency = 'RSD';
        let priceFormatted = number_format(price,2,'.',',');
        let priceFormattedArr = priceFormatted.split('.');

        priceHtml += '<span class="price">';
        priceHtml += '<span class="currency">'+currency+'</span>';
        priceHtml += '<span class="int">'+ priceFormattedArr[0] +'</span>';
        priceHtml += '<span class="dec">'+ priceFormattedArr[1] +'</span>';
        priceHtml += '</span>';

        return priceHtml;
    }

    /**
     * Number format
     * @param {decimal} number Input number
     * @param {int} decimals Number of decimals
     * @param {string} dec_point Symbol used for decimal point
     * @param {string} thousands_sep Symbol used for thousands separator
     * @returns {string}
     */
    function number_format (number, decimals, dec_point, thousands_sep) {
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        let n = !isFinite(+number) ? 0 : +number;
        let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        let sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
        let dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
        let s = '';
        const toFixedFix = function (n, prec) {
            let k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    /**
     * Validate Email Address (format)
     * @param email
     * @returns {boolean}
     */
    function emailValidator(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Unique Key Generator (UUID v4)
     * @type {{generate: (function(): string)}}
     */
    const uuidv4 = (function(){
        const generateNumber = function(limit) {
            let value = limit * Math.random();
            return value | 0;
        }
        const generateX = function() {
            let value = generateNumber(16);
            return value.toString();
        }
        const generateXes = function(count) {
            let result = '';
            for(let i = 0; i < count; ++i) {
                result += generateX();
            }
            return result;
        }
        const generateVariant = function() {
            let value = generateNumber(16);
            let variant =  (value & 0x3) | 0x8;
            return variant.toString(16);
        }
        // UUID v4
        //
        //   varsion: M=4
        //   variant: N
        //   pattern: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
        //
        const generate = function() {
            let result = generateXes(8)
                + '-' + generateXes(4)
                + '-' + '4' + generateXes(3)
                + '-' + generateVariant() + generateXes(3)
                + '-' + generateXes(12);
            return result;
        };

        return {
            generate: generate
        }
    }());


    /**
     * Cookies
     */
    const cookies = (function(){

        /**
         * Get Cookie Value by Name
         * @param {string} cookieName
         * @return {string|null}
         */
        const get = function(cookieName){
            let nameEQ = cookieName + "=";
            let ca = document.cookie.split(';');

            for(let i=0; i<ca.length; i++){
                let c = ca[i];
                while( c.charAt(0)==' ') c = c.substring(1,c.length);
                if( c.indexOf(nameEQ) == 0 ) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }

        /**
         * Set/Create Cookie
         * @param {string} cookieName
         * @param {string} cookieValue
         * @param {number} cookieExpiration Expiration time in milliseconds
         */
        const set = function(cookieName, cookieValue, cookieExpiration) {
            let expires = "";
            if( cookieExpiration ) {
                let date = new Date();
                date.setTime(date.getTime()+cookieExpiration);
                expires = "; expires="+date.toGMTString();
            }

            document.cookie = cookieName+"="+cookieValue+expires+"; path=/";
        }

        /**
         * Remove/Unset Cookie
         * @param {string} cookieName
         */
        const remove = function(cookieName) {
            set(cookieName,"",-1000*60*60);
        }

        return {
            get: get,
            set: set
        }
    }());


    /**
     * Public Methods and Vars
     */
    return {
        number_format: number_format,
        price_format: price_format,
        emailValidator: emailValidator,
        uuidv4: uuidv4,
        cookies: cookies
    }
}());