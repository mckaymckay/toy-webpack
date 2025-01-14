import './style.css'
import './style.scss'
// import pic from './img.png'

console.log("Hello OUDUIDUI");
console.log(12345)
// const img = new Image()
// img.src = pic
// document.body.appendChild(img)


const func = () => {
  console.log('func123')
}
func()

new Promise(resolve => {
  resolve('HelloWorld')
}).then(res => {
  console.log(res);
})