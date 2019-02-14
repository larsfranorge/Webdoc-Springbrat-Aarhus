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
        if (window.pageYOffset + window.innerHeight > things[i].y + threshold)
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

    // Definér elementets Y-koordinat; vi starter med dets relative y-offset i forhold til dens nærmeste parent
    // (HTML er åbenbart ikke smart nok til at have en property for den absolutte koordinat)
    things[things.length-1].y = things[things.length-1].offsetTop;

    // Find elementets "offset parent"
    next = things[things.length-1].offsetParent;

    // Loop gennem alle parents for at finde den absolutte Y-position
    while (things[things.length-1] != next && next != null)
    {
        // Læg parentens offset til elementets Y-værdi
        things[things.length-1].y += next.offsetTop;
        // Find næste parent, hvis der er en
        next = next.offsetParent;
    }

    // Sæt elementets animation på pause ind til videre
    things[things.length-1].style.animationPlayState = "paused";
    things[things.length-1].style.WebkitAnimationPlayState = "paused";
}

// Kør scrollCheck hvis der scrolles med siden
window.addEventListener("scroll", scrollCheck);

for (i=0; i<sounds.length; i++)
{
    sounds[i].autoplay = false;
    sounds[i].addEventListener("mouseenter", function() {playSound(sounds[i])});
    sounds[i].addEventListener("mouseleave", function() {stopSound(sounds[i])});
}

function playSound(snd)
{
    snd.play();
}

function stopSound(snd)
{
    snd.pause();
}

window.onscroll = function() {
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

}