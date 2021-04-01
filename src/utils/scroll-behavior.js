import goTo from 'vuetify/es5/components/Vuetify/goTo'

async function waitForReadystate () {
    if (typeof document !== 'undefined' &&
        document.readyState !== 'complete') {

        await new Promise(resolve => {
            const cb = () => {
                window.requestAnimationFrame(resolve)
                window.removeEventListener('load', cb)
            }
            window.addEventListener('load', cb)
        })
    }
}

export default async function (to, from, savedPosition) {
    await waitForReadystate()
  
    let scrollTo = 0
    const options = {}
  
    if (to.hash) {
        scrollTo = to.hash
    } else if (savedPosition) {
        scrollTo = savedPosition.y
    }
  
    return new Promise(resolve => {
        setTimeout(() => {
            try {
                goTo(scrollTo, options)
            } catch (err) {
                console.log(err)
            }
  
            resolve()
        }, 100)
    })
}