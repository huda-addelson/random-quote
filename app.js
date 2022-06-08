window.onload = () => {
    const quoteText = document.querySelector('.quote');
    const pengarangText = document.querySelector('.pengarang .nama');
    const copy = document.querySelector('.features .copy');
    const sound = document.querySelector('.features .sound');
    const whatsapp = document.querySelector('.features .whatsapp');

    function quoteGenerator() {
        const xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText).all;
                const value = Math.floor(Math.random() * data.length);
                const quote = data[value].quote;
                const pengarang = data[value].pengarang;

                quoteText.textContent = quote;
                pengarangText.textContent = `${(pengarang == "") ? 'tidak ada keterangan' : pengarang}`;
            }
        }
        xml.open('GET', 'data/data.json');
        xml.send();
    }
    quoteGenerator();

    const buttonGenerator = document.querySelector('.buttons .btn-generator');
    buttonGenerator.addEventListener('click', () => quoteGenerator());

    // button sound di klik
    sound.addEventListener('click', () => {
        let soundQuote = new SpeechSynthesisUtterance(`${quoteText.textContent} by ${pengarangText.textContent}`);
        speechSynthesis.speak(soundQuote);
    })

    copy.addEventListener('click', () => {
        navigator.clipboard.writeText(quoteText.textContent)
    })

    whatsapp.addEventListener('click', () => {
        let url = `https://api.whatsapp.com/send?text=${quoteText.textContent}`;
        window.open(url, "_blank");
    })

}