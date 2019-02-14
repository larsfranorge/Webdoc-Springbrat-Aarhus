// Et array der skal indeholde alle elementer der skal starte en animation når der scrolles over dem
var things = new Array();

// Grænse for hvor på skærmen animationen skal starte; højere værdi starter længere nede
var threshold = 0;

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

// Indstil disse elementer til at animere når de scrolles hen til
var anims = document.getElementsByClassName("scroll_anim");
for (i=0; i<anims.length; i++)
{
    animSetup(anims[i]);
}

function animSetup(thing)
{
    // Indsæt element i array
    things.push(thing);

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