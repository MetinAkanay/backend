let value = 0
{
var age = 28
const name = 'Metin'
}
value = 'Akanay'

//console.log(value)
//console.log(age)

// Fonksiyonlar
function first(){

}

const second = () =>{

}

// Value Tipleri
//string, number, boolean, array, object
let sampleString = ""
let sampleString2 = ''
let sampleNumber = 0
let sampleBoolean = true

let sampleArray = ['merhaba', true, [], ['23', 22]]
let sampleObject = {}

let sampleObject2 = {
    key : value,
    personel : "Metin",
    age : 21,
    hobbies : ["codding", 22],
    address :{
        city :"İstanbul",
        cityCode : 34,
        street : ["Üsküdar", "Bulgurlu"]
    },
    sayHello : () => {
        console.log("Merhaba Javascript. Biz artık Javascript yazacağız")
        return "Merhaba javascript"
    }
}
console.log(sampleObject2.personel)
console.log(sampleObject2.address.city)
let selam = sampleObject2.sayHello()

console.log(selam)

app.get("/",(req,res)=>{
    res.send("Merhaba ben senin ilk get api adresinim")
})

app.get("/products",(req,res)=>{
    res.send("Burası product")
})

// 2 tane == tip kontrolü yapmaz 
// 3 tane === tip kontrolü yaparak sorgulama yapar

// seçili alanı yorum satırına alma ctrl+k-c
// seçili alanı yorum satırından çıkartma ctrl+k+u


