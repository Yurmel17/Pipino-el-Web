document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mainform').addEventListener('submit', () => {
    alert('Hola!')
    console.log(this)
    })
})