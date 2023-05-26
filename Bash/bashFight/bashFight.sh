##############FONCTIONS

function choisirAttaque {
	atk=0
	while [[ $atk -lt 1 || $atk -gt 3 ]]
	do
		echo "Choix attaque :"
        	read atk
        	if [[ $atk -lt 1 || $atk -gt 3 ]]
        	then
                	echo "Mauvais choix, réessayez : "
        	else
			echo "Attaque choisie : $atk"
	fi
	done
	return $atk
}

############INITIALISATION
HPJ1=100
HPJ2=100
AtkPW=("10" "20" "30")
currentPlayer=1

############CODE
clear
while [[ $HPJ1 -gt 0 && $HPJ2 -gt 0 ]] 
do
        echo "------Points restants :  J1($HPJ1) J2($HPJ2)------"
	echo "Joueur $currentPlayer, c'est à toi de jouer. Quelle attaque choisi tu?"
	echo "1) Attaque Morsure"
	echo "2) Attaque Acide"
	echo "3) Attaque Coup de tette balayette"
	echo""
	choisirAttaque
	index=$(($?-1))
	if [[ "$currentPlayer" -eq 1 ]] 
	then
		HPJ2=$(($HPJ2-${AtkPW[index]}))
		currentPlayer=2
        else
                HPJ1=$(($HPJ1-${AtkPW[index]}))
		currentPlayer=1
        fi
clear
done

clear
if [[ $HPJ2 -le 0 ]]
then

	echo "Bravo au joueur 1 pour cette victoire"

else

	echo "Bravo au joueur 2 pour cette victoire"

fi
