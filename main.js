(async function main() {
    const form = document.getElementById('form')
    const output = document.getElementById('output')

    let words = []

    try {
        const response = await fetch('./five-letter-words.json')
        words = await response.json()
        document.body.dataset.state = "ready"
    } catch (error) {
        document.body.dataset.state = "error"
        output.innerHTML = `<h2>Uh oh! Something went wrong</h2><p>Try refreshing the page or <a href="mailto:sean@seanmcp.com">contacting the developer</a>.</p>`
        console.error(error)
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(e.target)
        const known = fd.get('known').toLowerCase()
        const type = fd.get('type')

        if (known.length > 0 && known.length <= 5) {
            let matches = []
            for (const word of words) {

                if (false
                    || (type === 'unordered' && [...known].every(char => word.includes(char)))
                    || (type === 'ordered' && word.includes(known))
                ) {
                    matches.push(word)
                }

            }

            let heading = 'No matches found'
            let body = '<p>Sorry!</p>'

            if (matches.length) {
                heading = `Found ${matches.length} match${matches.length === 1 ? '' : 'es'}`
                body = '<ul>'
                matches.forEach(word => {
                    body += `<li>${word}</li>`
                })
                body += '</ul>'
            }

            output.innerHTML = `<h2>${heading}</h2>${body}`
        }
    })
})()