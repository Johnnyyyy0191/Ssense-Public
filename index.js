const axios = require('axios-https-proxy-fix');
const { Webhook,MessageBuilder  } = require('discord-webhook-node');
const webhook = ''
const globalWebhook = ''

const req = axios.create({
    withCredentials: true
});

class ssense {
    constructor(task) {
        this.cookie; 
        this.img; 
        this.price; 
        this.size; 
        this.declineMsg; 
        this.totalPrice; 
        this.cookieArray = []
        this.csrfToken;
        this.paypal = true 
        this.paypalLink; 
        this.ccNum = '1111222233334444'
        this.cc1 = this.ccNum.substring(0,4)
        this.cc2 = this.ccNum.substring(4,8)
        this.cc3 = this.ccNum.substring(8,12)
        this.cc4 = this.ccNum.substring(12,16)
        this.splitccNum = `${this.cc1}+${this.cc2}+${this.cc3}+${this.cc4}`
        this.cvv = '123'
        this.tokenizedccNum;
        this.tokenizedcvv;
        this.ccMonth = '02'
        this.ccYear = '2026'
        this.sku = task
        this.OOS = false
        this.err = false
        this.monitorDelay = 15551
        this.retryDelay = 15551
        this.email = 'sofake231%40gmail.com'
        this.acctEmail = ''
        this.acctPassword = ''
        this.fname = 'John'
        this.lname = 'Doe'
        this.address1 = '123 fake st' 
        this.address = this.address1.split(' ')
        this.address = this.address.join('%20')
        this.state = 'IL'
        this.city = 'Chicago'
        this.zipCode = '123456'
        this.phoneNum = '1234567890'
        this.proxyArr = []
        if (this.proxyArr.length == 0) { 
            this.proxyReq = false;
        } else {
        this.proxy = this.proxyArr[Math.floor(Math.random() * this.proxyArr.length)]; 
        this.proxy1 = this.proxy.split(':')
        this.proxyIp = this.proxy1[0]
        this.proxyPort = this.proxy1[1]
        this.proxyUser = this.proxy1[2]
        this.proxyPass = this.proxy1[3]
            this.proxyReq = {
                host: this.proxyIp,
                port: this.proxyPort,
                auth: {
                  username: this.proxyUser,
                  password: this.proxyPass
                }
        }
    }
        this.cartToken; 
    }

delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

    async encryptCC() {

        if (this.err === true) {
            await this.delay(this.retryDelay)
        }

        const options = {
            method: "POST", 
            url: "https://ccifrm03.hostedpci.com/iSynSApp/appUserMapCC!createMapedCC.action?sid=529081&captchaId=1783388&captchaResp=1626794319-M3jtfNVRrt4MgHIDLsO4JU6zTMRpbNr1x3BRG2alnIE%3D", 
            headers: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'content-length': '193',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Host: 'ccifrm03.hostedpci.com',
                Cookie: '__cf_bm=6b479fbb53566117b27b58e21f8edc7486e5b9f2-1626794476-1800-AcSlYt9897lAxhEAAikH83J3VIpw5Y5h31w1KIlwgOcD7v4VaQrcAOOJsTDUYhvfKCi8YynQ56bULfvaAMU+KBWyajWbFAB+Vv9Fzg69KJltMHpODlsFRWdkOnnee8NGlA==',
                origin: 'https://ccifrm03.hostedpci.com',
                referer: 'https://ccifrm03.hostedpci.com/iSynSApp/showPxyPage!ccFrame.action?pgmode1=prod&locationName=checkoutGrid&sid=529081&pluginMode=jq1&fullParentHost=https://www.ssense.com&formatCCDigits=Y&formatCCDigitsDelimiter=%20&reportCCDigits=Y&reportCVVDigits=Y&enableEarlyToken=Y&reportFormFields=holderName;expiryMonth;expiryYear&reportCCFieldName=ccNum&reportCVVFieldName=ccCVV&ccFrameName=ccframe',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
            }, 
            data: `ccNum=${this.splitccNum}&ccCVV=${this.cvv}&cvvValidate=&enableTokenDisplay=&ccNumTokenIdx=1&ccNumToken=&ccCVVToken=&firstName=&lastName=&expYear=&expMonth=&requestRef=&encryptEnabled=N&encryptKeyName=`,
            proxy: this.proxyReq
        }
        return req(options)
        .then((res) => {
            //console.log(res)
            let str = res.data
            let i1 = str.search('CC')
            let i2 = str.search('CCBIN')
            str = str.substring(i1, i2)
            this.tokenizedccNum = str.substring(3, 19)
            //console.log(this.tokenizedccNum)
            this.tokenizedcvv = str.substring(28, 31)
            //console.log(this.tokenizedcvv)
            console.log('Successfully Encrypted Information')
            this.err = false 
            this.atc()
        })
        .catch((err) => {
            console.log(err)
            console.log('Error Encrypting Information')
            this.err = true 
            this.encryptCC()
        })
    }

    async atc() {

        if (this.err === true) {
            if (this.OOS === true) {
                await this.delay(this.monitorDelay)
                console.log('OOS, Retrying...')
            } else {
                await this.delay(this.retryDelay)
            }
        }
        const options = {
            method: 'post', 
            url: `https://www.ssense.com/en-us/api/shopping-bag/${this.sku}`, 
            headers: {
                Cookie: `${this.cookie}`,
                accept: 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'content-length': '71',
                'content-type': 'application/json',
                origin: 'https://www.ssense.com',
                'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36`,
            },
            data: `{"sku":"${this.sku}","serviceType":"product-details","userId":null}`, 
            proxy: this.proxyReq
        }

        return req(options)
        .then((res) => {
            //console.log(res)
            for (let i = 0; i < res.headers["set-cookie"].length; i++) {
                this.cookieArray.push(res.headers["set-cookie"][i])
                if (res.headers["set-cookie"][i].includes("shopping_bag")) {
                    let end = res.headers["set-cookie"][i].indexOf(";")
                    this.cartToken = res.headers["set-cookie"][i].substring(13, end)
                    //onsole.log(this.cartToken)
                }
            }
            this.cookie = this.cookieArray.join(';')
            this.err = false
            this.OOS = false
            console.log('Successfully Added To Cart')
            this.auth()
        })
        .catch((err) => {
            //console.log(err)
            if (err.response.status == 403) {
                console.log('Proxy Flagged By Antibot')
                this.switchProxy()
            } else {
                console.log('Error Adding To Cart')
            }
            if (err.response.data.code == 'ProductOutOfStock') {
                this.OOS = true
            }
            this.err = true 
            //console.log(err)
            this.atc()
        })
    }

    async switchProxy() {
        if (this.proxyReq === false) {
            console.log('Cannot Switch Proxies [LOCALHOST]')
            return; 
        } else { 
            if (this.proxyArr.length === 1) {
                console.log('Cannot Switch Proxies [LISTOF1]')
                return;
            } else {
            this.proxy = this.proxyArr[Math.floor(Math.random() * this.proxyArr.length)]; 
            this.proxy1 = this.proxy.split(':')
            this.proxyIp = this.proxy1[0]
            this.proxyPort = this.proxy1[1]
            this.proxyUser = this.proxy1[2]
            this.proxyPass = this.proxy1[3]
                this.proxyReq = {
                    host: this.proxyIp,
                    port: this.proxyPort,
                    auth: {
                      username: this.proxyUser,
                      password: this.proxyPass
                    }
            }
            console.log('Switched Proxies')
            this.atc()
        }
        }
    }

    async auth() {

        if (this.err === true) {
            await this.delay(this.retryDelay)
        }

        const options = {
            method: 'post', 
            url: 'https://www.ssense.com/en-us/account/authenticate',
            headers: {
                accept: 'application/json',
                'accept-encoding': 'gzip, deflate, br',
               'accept-language': 'en-US,en;q=0.9',
                'content-length': 31,
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                cookie: `${this.cookie}`,
                origin: 'https://www.ssense.com',
                referer: 'https://www.ssense.com/en-us/shopping-bag',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile':'?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            }, 
            data: `email=${this.email}`,
            proxy: this.proxyReq
        }
        return req(options)
        .then((res) => {
            //console.log(res)
            for (let i = 0; i < res.headers["set-cookie"].length; i++) {
                this.cookieArray.push(res.headers["set-cookie"][i])
            }
            this.cookie = this.cookieArray.join(';')
            console.log('Entered Guest checkout')
            this.err = false 
            this.getAddressId()
        })
        .catch((err) => {
            //console.log(err)
            if (err.response.status == 403) {
                console.log('Email used has an account')
            } else {
                console.log('Error Entering Guest Checkout')
            }
            this.err = true 
            this.auth()
        })
    }



    async getTokens() {

        if (this.err === true) {
            await this.delay(this.retryDelay)
        }

        const options = {
            method: 'get', 
            url: 'https://www.ssense.com/en-us/checkout.json', 
            headers: {
                accept: '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                Cookie: `${this.cookie}`,
                referer: 'https://www.ssense.com/en-us/shopping-bag',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            }, 
            proxy: this.proxyReq
        }

        return req(options)
        .then((res) => {
            this.csrfToken = res.data.csrf_token 
            this.price = res.data.checkout_cart.total
            this.img = res.data.checkout_cart.products[0].image
            let arr = this.img.split('/')
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].includes('PARAMS')) {
                    arr.splice(i, 1)
                }
            }
            this.img = arr.join('/')
            this.size = res.data.checkout_cart.products[0].size
            for (let i = 0; i < res.headers["set-cookie"].length; i++) {
                this.cookieArray.push(res.headers["set-cookie"][i])
            }
            this.cookie = this.cookieArray.join(';')
            //console.log(this.csrfToken) 
            console.log('Fetched CSRF Token')
            this.err = false 
            this.getOrderTotal()
        })
        .catch((err) => {
            //console.log(err)
            console.log('Error Fetching CSRF Token')
            this.err = true 
            this.getTokens()
        })
    }

    async getAddressId() {

        if (this.err === true) {
            await this.delay(this.retryDelay)
        }

        const options = {
            method: 'post', 
            url: 'https://www.ssense.com/en-us/account/addresses', 
            headers: {
                accept: 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'content-length': 203,
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Cookie: `${this.cookie}`,
                origin: 'https://www.ssense.com',
                referer: 'https://www.ssense.com/en-us/checkout',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            }, 
            data: `id=null&firstName=${this.fname}&lastName=${this.lname}&company=&address1=${this.address}&countryCode=US&stateCode=${this.state}&postCode=${this.zipCode}&city=${this.city}&phone=${this.phoneNum}&isLatestShipping=true&isInvalid=false&isDirty=false`,
            proxy: this.proxyReq
        }
        return req(options)
        .then((res) => {
            this.addressId = res.data
            console.log('Fetched Address ID')
            this.err = false
            this.getTokens()
        })
        .catch((err) => {
            //console.log(err)
            console.log(`Error Fetching Address ID [${err.response.status}]`)
            this.err = true 
            this.getAddressId()
        })
    }

    async getOrderTotal() {

        if (this.err === true) {
            await this.delay(this.retryDelay)
        }

        const options = {
            method: 'get', 
            url: `https://www.ssense.com/en-us/api/checkout/taxes.json?country_code=US&state_code=IL&sub_total=${this.price}&shipping=12&should_check_restriction=false&city=Peoria&postal_code=61615&address=7002%20N%20Draycott%20Pl&items=${this.sku}`, 
            headers: {
                accept: '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                Cookie: `${this.cookie}`,
                referer: 'https://www.ssense.com/en-us/checkout',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            }, 
            proxy: this.proxyReq
        }

        return req(options)
        .then((res) => {
            this.totalPrice = res.data.total
            console.log('Fetched Total Price')
            this.err = false 
            if (this.paypal === true) {
                this.paypalCheckout()
            } else {
                this.placeOrder()
            }
        })
        .catch((err) => {
            console.log('Error Fetching Total Price')
            this.err = true 
            this.getOrderTotal()
        })

    }


    async placeOrder() {
        console.log('Placing Order')

        if (this.err === true) {
            if (this.OOS === true) {
                await this.delay(this.monitorDelay)
            } else {
                await this.delay(this.retryDelay)
            }
        }
        
        const options = {
            method: 'post', 
            url: 'https://www.ssense.com/en-us/api/checkout/authorize', 
            headers: {
                accept: 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'content-length': 901,
                'content-type': 'application/json',
                Cookie: `${this.cookie}`,
                origin: 'https://www.ssense.com',
                referer: 'https://www.ssense.com/en-us/checkout',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',

            }, 
            data: `{"_csrf":"${this.csrfToken}","shippingAddress":{"id":${this.addressId},"firstName":"${this.fname}","lastName":"${this.lname}","company":"","address1":"${this.address1}","countryCode":"US","stateCode":"${this.state}","postCode":"${this.zipCode}","city":"${this.city}","phone":"${this.phoneNum}"},"shippingMethodId":7,"shippingMethodKeyName":"express","paymentMethod":"credit","skus":["${this.sku}"],"orderTotal":${this.totalPrice},"billingAddress":{"id":${this.addressId},"firstName":"${this.fname}","lastName":"${this.lname}","company":"","address1":"${this.address1}","countryCode":"US","stateCode":"${this.state}","postCode":"${this.zipCode}","city":"${this.city}","phone":"${this.phoneNum}","isSameAsShipping":true},"paymentProcessor":"firstdatapayeezy","tokenizer":"hostedpci","creditCardDetails":{"tokenizedCardNumber":"${this.tokenizedccNum}","tokenizedSecurityCode":"${this.tokenizedcvv}","expiryMonth":"${this.ccMonth}","expiryYear":"${this.ccYear}","cardholderName":"${this.fname + ' ' + this.lname} ","consent":false}}`,
            proxy: this.proxyReq
        }
        return req(options)
        .then((res) => {
            //console.log(res.data)
            if (res.data.status == 'error') {
                this.err = true
                if (res.data.code == '50001') {
                    console.log('Banned User, Stopping Task...')
                } else if (res.data.code == '40268') {
                    this.OOS = false
                    console.log('Payment Declined')
                    this.declineMsg = res.data.message
                    this.sendHookFail()
                } else if (res.data.code == '60004') {
                    console.log('OOS At Checkout, Retrying...')
                    this.OOS = true 
                    this.placeOrder()
                }
                else {
                    this.OOS = false 
                    console.log('Unkown Error Processing Order')
                    console.log(res.data)
                    this.placeOrder()
                }
            } else {
                this.err = false
                console.log('Successfully Checked Out')
            }
        })
        .catch((err) => {
            //console.log(err.response.data)
            console.log('Error Checking Out')
            this.err = true 
            this.placeOrder()
        })
    }

    async paypalCheckout() {
        console.log('Placing Order [Paypal]')

        if (this.err === true) {
            if (this.OOS === true) {
                await this.delay(this.monitorDelay)
            } else {
                await this.delay(this.retryDelay)
            }
        }
        
        const options = {
            method: 'post', 
            url: 'https://www.ssense.com/en-us/api/checkout/authorize', 
            headers: {
                accept: 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'content-length': 901,
                'content-type': 'application/json',
                Cookie: `${this.cookie}`,
                origin: 'https://www.ssense.com',
                referer: 'https://www.ssense.com/en-us/checkout',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',

            }, 
            data: `{"_csrf":"${this.csrfToken}","shippingAddress":{"id":${this.addressId},"firstName":"${this.fname}","lastName":"${this.lname}","company":"","address1":"${this.address1}","countryCode":"US","stateCode":"${this.state}","postCode":"${this.zipCode}","city":"${this.city}","phone":"${this.phoneNum}"},"shippingMethodId":7,"shippingMethodKeyName":"express","paymentMethod":"paypal","skus":["${this.sku}"],"orderTotal":${this.totalPrice},"cartToken":"${this.cartToken}","context":"checkout_page"}`,
            proxy: this.proxyReq
        }
        return req(options)
        .then((res) => {
            if (res.data.status == 'error') {
                this.err = true
                if (res.data.code == '50001') {
                    console.log('Banned User, Stopping Task...')
                } else if (res.data.code == '40268') {
                    this.OOS = false
                    console.log('Payment Declined')
                    this.declineMsg = res.data.message
                    this.sendHookFail()
                } else if (res.data.code == '60004') {
                    console.log('OOS At Checkout, Retrying...')
                    this.OOS = true 
                    this.placeOrder()
                }
                else {
                    this.OOS = false 
                    console.log('Unkown Error Processing Order')
                    console.log(res.data)
                    this.placeOrder()
                }
            } else {
                this.err = false                
                console.log('Got Paypal Link, Check Webhook!')
                this.paypalLink = res.data.url
                this.sendPaypalHook()
                //this.sendGlobalHook()
                console.log(this.paypalLink)
            }
        })
        .catch((err) => {
            console.log(err)
            console.log('Error Checking Out')
            this.err = true 
            this.paypalCheckout()
        })
    }

    /*async login() {
        const options = {
            method: 'POST', 
            url: 'https://www.ssense.com/en-us/account/login', 
            headers: {
                accept: 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'content-length': 54,
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                origin: 'https://www.ssense.com',
                referer: 'https://www.ssense.com/en-us/account/login',
                'sec-ch-ua': `" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"`,
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            }, 
            data: `email=${this.acctEmail}&password=${this.acctPassword}`,  
        }
        return req(options)
        .then((res) => {
            console.log(res)
            this.cookieArray = res.headers["set-cookie"]
            this.cookie = this.cookieArray.join(';')
        })
        .catch((err) => {
            console.log(err)
        })
    }*/

    async sendHookSuccess() {
        const hook = new Webhook(webhook);
        const embed = new MessageBuilder()
    .setTitle('Payment Success')
    .setAuthor('JHNY', 'https://cdn.discordapp.com/attachments/614147989279080496/674370823129268233/Recurso_12.png')
    .addField('Site', 'Ssense')
    .addField('Product', this.sku)
    .addField('Price', `${this.totalPrice}`, true)
    .addField('Size', this.size, true)
    .addField('Mode', 'Requests')
    .addField('Email', `||${this.email}||`)
    .addField('Proxy', `||${this.proxy}||`)
    .addField('Order Number', `||${this.orderNum}||`)
    .setColor('#00FF00')
    .setThumbnail(this.img)
    .setFooter('Johnnyyyy#0191', 'https://cdn.discordapp.com/avatars/338066438868959234/67374063392b394ecf2856c5548fc113.png?size=128')
    .setTimestamp();
     
        hook.send(embed);
    }
    
    async sendHookFail() {
        const hook = new Webhook(webhook);
        const embed = new MessageBuilder()
    .setTitle('Payment Failed')
    .setAuthor('JHNY', 'https://cdn.discordapp.com/attachments/614147989279080496/674370823129268233/Recurso_12.png')
    .addField('Site', 'Ssense')
    .addField('Product', this.sku)
    .addField('Price', `${this.totalPrice}`, true)
    .addField('Size', this.size, true)
    .addField('Mode', 'Requests')
    .addField('Email', `||${this.email}||`)
    .addField('Proxy', `||${this.proxy}||`)
    .addField('Decline Reason', `${this.declineMsg}`)
    .setColor('#FF0000')
    .setThumbnail(this.img)
    .setFooter('Johnnyyyy#0191', 'https://cdn.discordapp.com/avatars/338066438868959234/67374063392b394ecf2856c5548fc113.png?size=128')
    .setTimestamp();
     
        hook.send(embed);
    
    }

    async sendPaypalHook() {
        const hook = new Webhook(webhook);
        const embed = new MessageBuilder()
    .setTitle('Paypal Checkout Link')
    .setAuthor('JHNY', 'https://cdn.discordapp.com/attachments/614147989279080496/674370823129268233/Recurso_12.png')
    .addField('Site', 'Ssense')
    .addField('Product', this.sku)
    .addField('Price', `${this.totalPrice}`, true)
    .addField('Size', this.size, true)
    .addField('Mode', 'Paypal')
    .addField('Email', `||${this.email}||`)
    .addField('Proxy', `||${this.proxy}||`)
    .addField('Paypal Link', `||${this.paypalLink}||`)
    .setColor('#00FF00')
    .setThumbnail(this.img)
    .setFooter('Johnnyyyy#0191', 'https://cdn.discordapp.com/avatars/338066438868959234/67374063392b394ecf2856c5548fc113.png?size=128')
    .setTimestamp();
     
        hook.send(embed);
    }

    async sendGlobalHook() {
        const hook = new Webhook(globalWebhook);
        const embed = new MessageBuilder()
    .setTitle('Payment Success')
    .setAuthor('Alien AIO', 'https://cdn.discordapp.com/attachments/614147989279080496/674370823129268233/Recurso_12.png')
    .addField('Site', 'Ssense')
    .addField('Product', this.sku)
    .addField('Price', `${this.totalPrice}`, true)
    .addField('Size', this.size, true)
    .addField('Mode', 'Paypal')
    .setColor('#00FF00')
    .setThumbnail(this.img)
    .setFooter('Johnnyyyy#0191', 'https://cdn.discordapp.com/avatars/338066438868959234/67374063392b394ecf2856c5548fc113.png?size=128')
    .setTimestamp();
     
        hook.send(embed);
    }

    async start() {
        if (this.paypal === true) {
            await this.atc()
        } else {
            await this.encryptCC()
        }
    }

}
let skus = ['221402M20200401']
for (i = 0; i < skus.length; i++) {
    new ssense(skus[i]).start()
}
