
const post = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const resData = await response.json();
        console.log('Data received:', resData)
        return resData;
    } catch (e) {
        console.log( e);
    }
};


function handleSubmit(e) {
    e.preventDefault()

    let articleUrl = document.getElementById('article-url').value

    if(Client.checkURL(articleUrl)) {

    post('http://localhost:8081/Api', {url: articleUrl})

    .then(function(res) {
        document.getElementById('text').innerHTML = `text: ${res.sentence_list[1].text}`
        document.getElementById('score_tag').innerHTML = `Score tag: ${res.score_tag}`
        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
    })
    } else {
        alert(' invalid URL');
    }
}


export { handleSubmit }
