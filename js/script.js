// Array til at indeholde alle elementer der skal animeres; dem med "scroll_anim" klassen
var things = new Array();

// En nydelig variabel til at indeholde audio-objekter
var sounds = document.getElementsByTagName("audio");

// Grænse for hvor på skærmen animationen skal starte; højere værdi starter længere nede
var threshold = 0;

// Indstil alle elementer med "scroll_anim" klassen til at animere når de scrolles hen til
var anims = document.getElementsByClassName("scroll_anim");
for (i=0; i<anims.length; i++)
{
    animSetup(anims[i]);
}

function scrollCheck()
{
    // Loop gennem alle elementer i arrayet
    for (i=0; i<things.length; i++)
    {
        // Hvis vinduets position kommer tæt på elementet...
        if (window.pageYOffset + window.innerHeight > getY(things[i]) + threshold)
        {
            // Start elementets animation
            things[i].style.animationPlayState = "running";
            things[i].style.WebkitAnimationPlayState = "running";
        }
    }
}

function animSetup(thing)
{
    // Indsæt element i array (skal åbenbart være der for at lortet fungerer)
    things[things.length] = thing;

    // Sæt elementets animation på pause ind til videre
    things[things.length-1].style.animationPlayState = "paused";
    things[things.length-1].style.WebkitAnimationPlayState = "paused";
}

// Returnerer et givent elements absolutte Y-position
function getY(ele)
{
    // Definér elementets Y-koordinat; vi starter med dets relative y-offset i forhold til dens nærmeste parent
    // (... kendte ikke til getBoundingClientRect() på tidspunktet)
    y = ele.offsetTop;

    // Find elementets "offset parent"
    next = ele.offsetParent;

    // Loop gennem alle parents for at finde den absolutte Y-position
    while (ele != next && next != null)
    {
        // Læg parentens offset til elementets Y-værdi
        y += next.offsetTop;
        // Find næste parent, hvis der er en
        next = next.offsetParent;
    }

    return y;
}

// Kør scrollCheck hvis der scrolles med siden
window.addEventListener("scroll", scrollCheck);

// Loop gennem alle audio elementer
for (i=0; i<sounds.length; i++)
{
    // Slå autoplay fra, just in case
    sounds[i].autoplay = false;

    // Hvis musen går ind i objektet, start lyden
    sounds[i].addEventListener("mouseenter", function() {playSound(sounds[i])});

    // Hvis musen går ud af objektet, sæt lyden på pause
    sounds[i].addEventListener("mouseleave", function() {stopSound(sounds[i])});

    // Hvis der klikkes på lydobjektet, skift mellem pause og play
    sounds[i].addEventListener("click", function()
    {
        if (sounds[i].paused == false)
            stopSound(sounds[i]);
        else
            playSound(sounds[i]);
    });
}

// Start en lyd
function playSound(snd)
{
    snd.play();
}

// Sæt en lyd på pause
function stopSound(snd)
{
    snd.pause();
}

window.addEventListener("scroll", function() {
    var elevVideo = document.getElementById("main_elev__video");

    var skoleVideo = document.getElementById("main_skole__video");

    if  (elevVideo.getBoundingClientRect().bottom < 250 || elevVideo.getBoundingClientRect().top > 250)
        elevVideo.pause();
    else
        elevVideo.play(); 

    if  (skoleVideo.getBoundingClientRect().bottom < 400 || skoleVideo.getBoundingClientRect().top > 400)
        skoleVideo.pause();
    else
        skoleVideo.play(); 
});

var speech = window.speechSynthesis;
var word = new SpeechSynthesisUtterance('your mother');
speech.speak(word);