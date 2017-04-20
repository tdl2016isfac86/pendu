window.onload = function() {
var potenceZero = `
    
    
    
    
    
    
    
    
`;
var potence = [
`







/ `,
`







/ \\ `,
`
 |
 |
 |
 |
 |
 |
 |                   
/ \\ `,
` ____________________
 |
 | 
 |  
 | 
 |               
 |
 |                   
/ \\ `,
` ____________________
 |    /            
 |   /             
 |  /              
 | /               
 |/                
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               
 | /               
 |/                
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               o
 | /               
 |/                
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               o
 | /                0
 |/                
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               o
 | /               /0
 |/                
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               o
 | /               /0\\
 |/                
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               o
 | /               /0\\
 |/                / 
 |
 |                   
/ \\ `,
` ____________________
 |    /             |
 |   /              |
 |  /               o
 | /               /0\\
 |/                / \\
 |
 |                   
/ \\ `];


var mots=[
 "TITANISQUE","MAMELLE","PROUT",
 "COCOLASTICOT","OBELIX",
 "PETARD","GRADIATEUR",
 "DEODORANT","VOUMI","HORLUGE",
 "HAAAVOMI","ELEPHANT","IGLOO","DEJA",
 "PROUD","QUEQUETTE","PROUT","PROUTER",
 "TORTURE","DJYP","PLUC",
 "KEBAB","ACTIVEMENT",
 "PROPRIETEE","AMENAGEMENT"];
//tableau contenant tous les mots.//tableau contenant tous les mots.
                
                                
var motEnJeu=mots[Math.floor(Math.random()*21)]; // Le mot que l'on cherche a trouver
var motInitial = motEnJeu;  // Une sauvegarde du mot à l'état initial de la partie;
var motEnCours = ''; // L'état du mot en cours de recherche
for(var i = 0; i < motEnJeu.length; i+=1) {
   motEnCours+='_';
}

var nbEssai = 0;            // On initialise les tours a 0

var lettres = document.getElementsByTagName('span'); //on met toutes les balises "span" et leur contenue sont dans la variable 

//------------------------------------------------------------------------------
// Fonction pour prendre en compte les clics sur les lettres
//------------------------------------------------------------------------------
var initJeu = function () {
   for(var i = 0; i<26;i+=1) {
      lettres[i].onclick = function() {
        if(motInitial !== motEnCours) {
           var laLettre = this.innerHTML;
           var e = essaiLettre(laLettre);
           if(!e) {
              essaiRate();
           }
   
           // On réactualise la div#motATrouver
           majMot();
   
           this.onclick=null;
           this.style.cursor = 'initial';
           this.classList.add('active');
        }
        
        if(motInitial == motEnCours) {
            message('gagné');
        }
    };
    lettres[i].style.cursor = 'pointer';
    lettres[i].classList.remove('active');
    nbEssai = 0;
    document.getElementById('msg').innerText='';
    document.getElementById('solution').value='';
    document.getElementById('motPropose').value='';
   }
};
initJeu();
document.getElementById('solution').onkeypress = function (event) {
    if (event.which == 13 || event.keyCode == 13) {
        
        this.value = this.value.toUpperCase();
        if(this.value !== motInitial) {
           essaiRate();
        }
        else {
           message('gagné !');
           motEnCours = motInitial;
           majMot();
        }
        
    }
};

var essaiRate = function() {
  if( nbEssai < 12) {
   document.getElementsByTagName('pre')[0].innerText = potence[nbEssai];
   nbEssai += 1;
  }
   if( nbEssai >= 12) {
      message('perdu');
   }
};

//------------------------------------------------------------------------------
//Fonction pour verifier si la lettre cliquée est dans le mot cherché
//------------------------------------------------------------------------------
var essaiLettre = function(l) {
    var test = motEnJeu.indexOf(l);
    if(test === -1) {
        // c'est faux !!
        return false;
    }
    else {
        // c'est bon !!
        // modifier motEnCours et motEnJeu
        var strArray = motEnCours.split('');
        strArray[test] = l;
        motEnCours = strArray.join('');

        strArray = motEnJeu.split('');
        strArray[test] = '_';
        motEnJeu = strArray.join('');

        // On appelle à nouveau essaiLettre
        essaiLettre(l);
        return true;
    }
};

document.getElementsByTagName('button')[1].onclick = function () {
   motEnJeu=mots[Math.floor(Math.random()*13)];
   motInitial = motEnJeu;
   motEnCours = '';
   for(var i = 0; i < motEnJeu.length; i+=1) {
      motEnCours+='_';
   }
   majMot();
   document.getElementsByTagName('pre')[0].innerText = potenceZero;
   initJeu();
};

//------------------------------------------------------------------------------
// Fonction mise a jour des la div "mot a trouver" et pour avoir des espaces entre les " _ "
//------------------------------------------------------------------------------
var majMot = function () {
    document.getElementById('motATrouver').innerText = motEnCours.split('').join(' ');
};

majMot();

var message = function(n) {
    document.getElementById('msg').innerHTML = n;
};

document.getElementById('motPropose').onkeypress = function (event) {
    if (event.which == 13 || event.keyCode == 13) {
       motEnJeu=this.value.toUpperCase();
       motInitial = motEnJeu;
       motEnCours = '';
       for(var i = 0; i < motEnJeu.length; i+=1) {
          motEnCours+='_';
       }
       majMot();
       document.getElementsByTagName('pre')[0].innerText = potenceZero;
       initJeu();
    }
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
};

/*
document.getElementsByTagName('button')[0].onclick = function() {
   window.location.reload();
};
*/