let apiQuote = []
const quoteContainer = document.getElementById('quote_container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new_quote')
const loader = document.getElementById('loader')

// Get Quotes
// Loader
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}
// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}

// Show New Quote
function newQuote() {
  loading()

  // Pick random quote
  randomQuote = apiQuote.results[Math.floor(Math.random() * apiQuote.count)]
  console.log(randomQuote)
  if (!randomQuote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = randomQuote.author
  }
  if (randomQuote.author.length > 10) {
    console.log(randomQuote.author.length)
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = randomQuote.content
  complete()

  return apiQuote[randomQuote]
}

// Async featch request in try block
async function getQuotes() {
  loading()

  const apiURL = 'https://api.quotable.io/quotes'
  try {
    const response = await fetch(apiURL)
    apiQuote = await response.json()
    newQuote()
  } catch (err) {
    console.log(err)
  }
  complete()
}
function tweetQuote() {
  const twitterURl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterURl, '_blank')
}
// onLoad
getQuotes()
newQuoteBtn.addEventListener('click', newQuote)

twitterBtn.addEventListener('click', tweetQuote)
